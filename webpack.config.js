require('@babel/register');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const partials = require("./helpers/webpackPartials");
const path = require('path');
const merge = require("webpack-merge");
const glob = require('glob-all');
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;
process.traceDeprecation = true;

const devMode = process.env.NODE_ENV !== 'production';

const PATHS = {
    src: path.resolve(__dirname, "src"),
    app: path.resolve(__dirname, "src", "index.tsx"),
    bundle: path.resolve(__dirname, "src", "bundle.tsx"),
    staticAssets: path.resolve(__dirname, "src", "assets", "static"),
    build: path.resolve(__dirname, "static"),
    purge: glob.sync([
      `${path.resolve(__dirname, "src")}/**/@(*.jsx|*.js|*.ts|*.tsx)`,
      // `${path.resolve(__dirname, "node_modules", 'lib', 'components')}/**/@(*.jsx|*.js|*.ts|*.tsx)`
    ],  { nodir: true }),
    whitelist: glob.sync(`${path.resolve(__dirname, "src", "assets", "vendorCSS")}/**/@(*.scss|*.sass|*.css)`,  { nodir: true }),
    style: {
      main: path.resolve(__dirname, "src", "assets", "styles", "main.scss"),
      // theme:  path.resolve(__dirname, 'src', 'config', 'theme.scss'),
      includePaths: [
        path.resolve(__dirname, 'src', 'components'),
        path.resolve(__dirname, 'src', 'assets', "styles"),
        path.resolve(__dirname, 'src', 'templates'),
        path.resolve(__dirname, 'src', 'modules'),
      ]
    },
    image: path.resolve(__dirname, "src", "assets", "img"),
    font: path.resolve(__dirname, "src", "assets", "fonts"),
    hmr: 'react-hot-loader/patch',
    wds: 'webpack-dev-server/client?http://localhost:8080',
};

function addHTMLPlugin(){
    return new HtmlWebpackPlugin({
        title: "Briefcart",
        template: './helpers/template.html',
        appMountId: 'app',
        inject: false,
        mobile: true,
        files: {
            favicon: 'favicons/favicon.ico'
        }
    })
}

const commonConfig = {
    resolve: {
        extensions:['.css', '.js', '.ts', '.es6', '.json', '.scss', '.jsx', '.tsx', '.html'],
        modules: [
            PATHS.src,
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ]
    },
    module: {
      noParse:[path.resolve(__dirname, 'node_modules/localforage/')],
    }
};


var config;

switch (process.env.npm_lifecycle_event){
    case "bundle":
        config = merge({
          resolve: commonConfig.resolve,
          module: commonConfig.module
        },{
            entry: {
                bundle: PATHS.bundle,
            },
            mode: 'production',
            output: {
                path: PATHS.build,
                filename: '[name].js',
                libraryTarget: 'umd',
                library: 'appbundle'
            },
            target: 'node',
            // externals: Object.keys({...packageJSON.dependencies}),
            externals: {
              react: {
                commonjs: 'react',
                commonjs2: 'react',
                amd: 'react',
                root: 'React',
              },
              'react-dom': {
                commonjs: 'react-dom',
                commonjs2: 'react-dom',
                amd: 'react-dom',
                root: 'ReactDOM',
              }
            }
          },
          partials.setFreeVariable({'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV || 'production')}),
          partials.loadJS(PATHS.src),
          partials.optimize(PATHS.purge, ['app']),
          {
            module: {
              rules: [
                  {
                      test: /\.(sa|sc|c)ss$/i,
                      use: 'ignore-loader',
                  },{
                      test: /.*\.(svg|jpeg|jpg|png)$/i,
                      use: 'ignore-loader'
                  },{
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'ignore-loader'
                  },{
                    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'ignore-loader'
                  },{
                    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'ignore-loader'
                  },{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'ignore-loader'
                  },{
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'ignore-loader'
                  }
              ]
            }
          }
        );
        break;
    case "stats":
    case "build":
        config = merge(
            commonConfig,
            {
                entry: {
                  app: PATHS.app,
                },
                mode: 'production',
                devtool: "source-map",
                output: {
                    path: PATHS.build,
                    filename: "[name].[chunkhash].js",
                    chunkFilename: "[name]-[id].[chunkhash].js"
                },
                optimization: {
                    splitChunks: {
                        cacheGroups: {
                            commons: {
                                test: /[\\/]node_modules[\\/]/,
                                name: "vendors",
                                filename: "vendors.[chunkhash].js",
                                chunks: "all",
                            }
                        }
                    },
                    runtimeChunk: {
                        name: "manifest",
                    }
                },
                plugins: [
                  new CopyPlugin({
                    patterns: [
                      {from: PATHS.staticAssets}
                    ],
                  }),
                  addHTMLPlugin()
                ]
            },
            partials.setFreeVariable({'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV || 'production')}),
            partials.cleanBuildFolder(PATHS.build),
            partials.loadJS(PATHS.src),
            partials.loadSCSS(PATHS.style, devMode),
            partials.optimize(PATHS.purge, ['app']),
            partials.loadImages(PATHS.image, 25000, devMode),
            partials.loadFonts(PATHS.font, 25000, devMode)
        );
        break;
    case 'start':
      config = merge(
          commonConfig,
          partials.devServer({
              host: process.env.HOST,
              port: process.env.PORT || 8000,
              contentBase: path.join(__dirname, 'src', 'assets'),
          }),
          {
              // alias: { 'react-dom': '@hot-loader/react-dom'  },
              mode: 'development',
              entry: [
                  PATHS.app
              ],
              output: {
                  path: PATHS.build,
                  filename: "[name].js"
              },
              devtool: 'inline-source-map',
              plugins: [
                addHTMLPlugin(),
                new webpack.HotModuleReplacementPlugin(),
              ]
          },
          partials.setFreeVariable({'process.env.BUILD_ENV': JSON.stringify('development')}),
          partials.loadSCSS(PATHS.style, devMode),
          partials.loadJS(PATHS.src),
          partials.loadImages(PATHS.image, 25000, devMode),
          partials.loadFonts(PATHS.font, 50000, devMode)
      );
      break;
    default:
        config = merge(
            commonConfig,
            {
                // alias: { 'react-dom': '@hot-loader/react-dom'  },
                mode: 'development',
                entry: [
                  'webpack-hot-middleware/client',
                    PATHS.app
                ],
                output: {
                    path: PATHS.build,
                    filename: "[name].js",
                    // publicPath: '/'
                },
                devServer: {
                  contentBase: path.resolve(__dirname, "src", "assets", "static")
                },
                devtool: 'inline-source-map',
                plugins: [
                  addHTMLPlugin(),
                  new webpack.HotModuleReplacementPlugin(),
                ]
            },
            partials.setFreeVariable({'process.env.BUILD_ENV': JSON.stringify('development')}),
            partials.loadSCSS(PATHS.style, devMode),
            partials.loadJS(PATHS.src),
            partials.loadImages(PATHS.image, 25000, devMode),
            partials.loadFonts(PATHS.font, 50000, devMode)
        );
        break;
};

module.exports = config

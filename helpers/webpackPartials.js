const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require("webpack");

exports.setFreeVariable = function(env){
    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };
}

exports.devServer = function(options) {
    return {
        devServer: {
            historyApiFallback: true,
            inline: true,
            hot: true,
            stats: "errors-only",
            // host: options.host,
            // port: options.port,
            // static: options.contentBase,
            contentBase: options.contentBase
        }
    };
}
exports.cleanBuildFolder = function (){
    return {
        plugins: [
            new CleanWebpackPlugin()
        ]
    };
}
exports.loadSCSS = function(paths, devMode){
    const extractCSSLoader = {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: devMode,
        },
    }
    const sassLoaders = [
        {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
        },
        'postcss-loader',
        {
            loader: 'sass-loader',
            options:{
                sourceMap: true,
                implementation: require('sass'),
                // prependData: `@import "theme";`,
                sassOptions: {
                    // file: paths.theme,
                    // data: `@use "${paths.theme}";`,
                    includePaths: paths.includePaths
                }
            }
        }
    ]
    if(devMode) {
      sassLoaders.unshift('style-loader');
    } else {
      sassLoaders.unshift(extractCSSLoader);
    }
    return{
        plugins: [
          new MiniCssExtractPlugin({
            filename: "[name]-[id].[hash].css",
            chunkFilename: '[name]-[id].[contenthash:4].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
          }),
        ],
        module: {
          rules: [
            {
              test: /\.(sa|sc|c)ss$/i,
              use: sassLoaders,
            }
          ]
        },
    };
}
exports.optimize = function(paths, only){
    return {
        optimization: {
            minimizer: [
                new TerserJSPlugin({
                  terserOptions: {
                    mangle: {
                      keep_classnames: true,
                      keep_fnames: true
                    }
                  }
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorPluginOptions: {
                      preset: ['default', { discardComments: { removeAll: true } }],
                    },
                    canPrint: true
                })
            ],
        },
        // plugins: [
        //     new PurgecssPlugin({
        //       paths: paths,
        //       only
        //     }),
        // ]
    };
}
exports.loadJS = function(include){
    return{
        module: {
            rules: [
                {
                    test: [/\.(ts|js)x?$/ ],
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true
                            }
                        }
                    ],
                    include: include ? include : [],
                    exclude: /node_modules/
                }
            ]
        }
    };
}
exports.loadImages = function(paths, limit, devMode){
    return{
        module: {
            rules: [
                {
                    test: /.*\.(svg|jpeg|jpg|png)$/i,
                    use: devMode
                    ? [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: limit
                            }
                        }
                    ]
                    : 'file-loader?name=./img/[name].[hash].[ext]',
                    include: paths
                }
            ]
        },
    };
}
exports.loadFonts = function(paths, limit, devMode){
    const prodRules = [
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: 'file-loader?mimetype=image/svg+xml&name=./assets/fonts/[hash].[ext]'
        },{
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          use: "file-loader?mimetype=application/font-woff&name=./assets/fonts/[hash].[ext]"
        },{
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          use: "file-loader?mimetype=application/font-woff&name=./assets/fonts/[hash].[ext]"
        },{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: "file-loader?mimetype=application/octet-stream&name=./assets/fonts/[hash].[ext]"
        },{
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: "file-loader?name=./assets/fonts/[hash].[ext]"
        },
    ];
    const devRules = [
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: [
              {
                  loader: 'url-loader',
                  options: {
                      limit: limit
                  }
              }
          ],
          include: paths
        }
    ];
    return{
        module:{
            rules: devMode ? devRules : prodRules,
        }
    }
}

module.exports = {
  "collectCoverage": true,
  "testRegex": "__tests__/.*\\.spec|snap.(js|ts|tsx)$",
  "modulePaths": [
    "src"
  ],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.ts",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.ts"
  },
  "transform": {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  "setupFiles": [
    "<rootDir>/helpers/polyfill.js"
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/.vscode/",
    "/static",
    "/build/",
    "/webpack.config.js",
    "/helpers/",
    "/package.json",
    "/package-lock.json",
    "/coverage/"
  ]
};

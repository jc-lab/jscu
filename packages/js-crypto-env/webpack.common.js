/**
 * webpack.common.js
 */
//////////////////////////////////////////////////////////////////////////
// Base Config of Your Library
const libName = 'jscenv';
const entry = './src/index.ts';

//////////////////////////////////////////////////////////////////////////
const path = require('path');

// webpack main configration
const webpackConfig = {
  target: 'web',
  entry: {},
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: path.resolve(__dirname, './dist'),
    library: libName,
    libraryTarget: 'umd',
    globalObject: 'this' // for node js import
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx' ],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader'
        }],
        exclude: path.join(__dirname, 'node_modules') // exclude: /node_modules/
      },
    ]
  },
  externals: { },
  node: {
    fs: 'empty'
  }
};

webpackConfig.entry[libName] = [entry];

function getBundleName () {
  const regexp = /\[name\]/g;
  return webpackConfig.output.filename.replace(regexp, libName);
}

function getEntryName () {
  const regexp = /.*src\//;
  return webpackConfig.entry[libName][0].replace(regexp, '');
}

module.exports = {
  // eslint-disable-next-line object-shorthand
  webpackConfig: webpackConfig,
  // eslint-disable-next-line object-shorthand
  libName: libName,
  entryName: getEntryName(),
  bundleName: getBundleName(),
};

// // port babelrc from .babelrc
// function getBabelOptionsForWebpack() {
//   const pluginExclude = []; // add here node-specific plugins
//   const babelrc = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'));
//   babelrc.babelrc = false;
//   babelrc.presets = babelrc.presets.map( (elem) => {
//     if (elem instanceof Array && elem.length > 0){
//       // for browsers. if true, import statements will be transpiled to CommonJS 'require', and webpack tree shaking doesn't work.
//       if(elem[0] === '@babel/preset-env') elem[1].modules = false;
//     }
//     return elem;
//   });
//   babelrc.plugins = babelrc.plugins.filter( (elem) => pluginExclude.indexOf(elem) < 0);
//   return babelrc;
// }

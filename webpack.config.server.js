const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();
const nodeExternals = require('webpack-node-externals');

const config = {
    name: 'server',
    entry: [path.join(CURRENT_WORKING_DIR, 'index.js')],
    target: 'node',
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist/'),
        filename: 'server.generated.js',
        publicPath: '/dist/',
        libraryTarget: 'commonjs2',
        hashFunction: 'sha1'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
          {
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
          },      
        ],
      }
};

module.exports = config;
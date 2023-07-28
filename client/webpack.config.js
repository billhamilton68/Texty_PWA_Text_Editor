const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const plugins = [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Point to the source HTML file
      filename: 'index.html',  // Output filename
    }),
    new WebpackPwaManifest({
      name: 'JATE - Just Another Text Editor',
      short_name: 'JATE',
      description: 'A text editor that runs in the browser, supporting offline usage and various storage mechanisms.',
      background_color: '#ffffff',
      theme_color: '#000000',
      inject: true,
      fingerprints: false,
      ios: true,
      publicPath: '/',
      icons: [
        {
          src: path.resolve('src/Assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          // Specify the correct destination
          destination: path.join('assets', 'icons'),
        },
      ],
    })
  ];

  if (isProduction) {
    plugins.push(new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js'
    }));
  }

  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        // For Babel loader
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-transform-runtime'
              ]
            }
          }
        },
        // For CSS loader
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: plugins
  };
};
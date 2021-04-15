let config = {
  stats: 'errors-only',
  entry: './src/app.tsx',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          publicPath: __MIN_PUBLIC_PATH__ + 'images',
          outputPath: 'images',
        },
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
        }],
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ],
  },
};

if (process.env.NODE_ENV !== 'production') {
  config = {
    ...config,
    devtool: 'eval-cheap-source-map',
    devServer: {
      proxy: [
        '/api/',
        {
          target: 'http://localhost:8080',
          changeOrigin: true,
          pathRewrite: {
            '^/api/': '/',
          },
        },
      ],
    },
  }
}

module.exports = config;

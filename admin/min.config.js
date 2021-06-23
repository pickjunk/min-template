let config = {
  entry: './src/app.tsx',
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
  lessOptions: {
    // modifyVars: {
    //   'primary-color': '#1DA57A',
    //   'link-color': '#1DA57A',
    //   'border-radius-base': '2px',
    // },
    javascriptEnabled: true,
  },
  // base: '/pc',
  // log: 'app.log',
};

module.exports = config;

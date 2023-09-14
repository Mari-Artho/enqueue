module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    // Set to '0.0.0.0' to listen on all available network interfaces
    host: 'tcs58.csc.kth.se', 
    //port: 3000,
    https: true,
    // port:8080,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API,
      },

      '/login': {
        target: process.env.VUE_APP_API,
      },

      '/logout': {
        target: process.env.VUE_APP_API,
      },

      '/socket.io': {
        target: process.env.VUE_APP_API,
      },

      '/callback': {
        target: process.env.VUE_APP_API,
      },
    },
  },
}

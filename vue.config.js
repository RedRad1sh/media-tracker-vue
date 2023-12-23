module.exports = {
  chainWebpack: config => {
    config.module
      .rule('yaml')
        .test(/\.ya?ml?$/)
        .use('yaml-loader')
          .loader('yaml-loader')
          .options({ schema: require('yaml-loader').DEFAULT_FULL_SCHEMA });
  }
}

module.exports = {
    // baseUrl: 'http://192.168.1.18:8080',
    outputDir: 'dist',
    lintOnSave: true,
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');
        svgRule.uses.clear();
        svgRule
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });
    },
    configureWebpack: () => {},
    devServer: {
        open: process.platform === 'darwin',
        host: '',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null,
        before: app => {}
    }
};

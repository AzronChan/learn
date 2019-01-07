// 一些全局的配置，比如 HTML 文件的路径、publicPath 等
module.exports = {
    HTMLDirs: [
        'index',
        'index2',
    ],
    cssPublicPath: '../',
    imgOutputPath: 'img/',
    cssOutputPath: './css/[name].[md5:contenthash:hex:8].css',
    assetOutputPath: 'asset/',
    devServerOutputPath: './dist',
};
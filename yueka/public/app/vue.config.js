/*
 * vue-cli 3.0 配置文件
 * 需要手动建立
 * 
 */
module.exports = {
	devServer: {
		port : '8886',	//端口号
		open : 'true',	//配置自动启动浏览器
//		proxy : {
//			'/api': {
//              target: 'http://127.0.0.1:3000/',
//              ws: true,
//              changeOrigin: true
//          }
//		}
		proxy: 'http://localhost:3000' // 配置跨域处理,只有一个代理
	}
}
/*
 * 路由读取文件
 * 路由写文件
 */
var http = require('http'),
	url = require('url'),
	routerConfig = require('./models/router-readfile-config.js');

function routerRead(){
	http.createServer(function(req, res) {
		
		
		if(req.url !== "/favicon.ico") { //清除第2此访问 
			var pathName = url.parse(req.url).pathname.replace(/\//,'');
			if (routerConfig[pathName]){
				routerConfig[pathName](req,res);
			} else {
				res.writeHead(200,{
					'Content-Type': 'text/html;charset=utf-8'
				})
				res.end('404');
			}
		}
	}).listen(8000);
	console.log('Server    running    at    http://127.0.0.1:8000/');
}

routerRead();

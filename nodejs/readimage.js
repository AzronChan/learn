var http = require('http');
var routerConfig = require('./models/router-readfile-config.js');
http.createServer(function(request, response) {
	//头部寂静改变
	response.writeHead(200, {
		'Content-Type': 'image/jpeg'
	});
	if(request.url !== "/favicon.ico") { //清除第2此访问  
		console.log('访问');
		//response.write('hello,world');//不能向客户端输出任何字节  
		routerConfig.readimg(request,response);
	}
}).listen(8000);
console.log('Server  running  at  http://127.0.0.1:8000/');
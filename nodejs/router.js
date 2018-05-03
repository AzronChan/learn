var http = require('http'),
	url = require('url'),
	routerConfig = require('./routerConfig');

function routerFn(){
	http.createServer(function(request, res) {
		res.writeHead(200,{
			'Content-Type': 'text/html;charset=utf-8'
		})
		if(request.url !== "/favicon.ico") { //清除第2此访问 
			var pathName = url.parse(request.url).pathname.replace(/\//,'');
			console.log(pathName)
			routerConfig[pathName] && routerConfig[pathName](res);
			res.end('done');
		}
	}).listen(8000);
	console.log('Server    running    at    http://127.0.0.1:8000/');
}

routerFn();

/*
 * 读取文件
 * 同步
 * 异步
 */
var http = require('http');
var forreadfile = require('./models/forreadfile.js');

/*
 * 同步
 */
function syncFn(){
	http.createServer(function(request, response) {
		response.writeHead(200, {
			'Content-Type': 'text/html;  charset=utf-8'
		});
		if(request.url !== "/favicon.ico") { //清除第2此访问
			console.log('访问');
			var data = forreadfile.readfileSync('./files/login.html');
			response.write(data);
			console.log('同步')
			response.end('ok'); //不写则没有http协议尾
		}
	}).listen(8000);
}

/*
 * 异步
 */
function cbFn(){
	http.createServer(function(request, response) {
		response.writeHead(200, {
			'Content-Type': 'text/html;  charset=utf-8'
		});
		if(request.url !== "/favicon.ico") { //清除第2此访问
			//异步加载，write 不可以写在 end 后面，所以需要用到闭包，把response.end传给异步加载完成后执行
			function afterCb(data){
				response.write(data)
				response.end('ok');
			}
			forreadfile.readfile('./files/login.html',afterCb);
		}
	}).listen(8000);
}

//syncFn()

cbFn();
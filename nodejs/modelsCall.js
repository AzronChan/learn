var http = require('http');
var User = require('./models/user');
//var  Teacher  =  require('./models/Teacher');
http.createServer(function(request, response) {
	response.writeHead(200, {
		'Content-Type': 'text/html;        charset=utf-8'
	});
	if(request.url !== "/favicon.ico") { //清除第2此访问
//		teacher = new Teacher(1, '李四', 30);
//		teacher.teach(response);
		console.log(222)
		var user = new User(1,'czl',25);	
		user.fn();
		response.end('done');
	}
}).listen(8000);
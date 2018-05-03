var http = require('http');

/*
 * 读取本地函数
 */
function readLocalFn(){
	http.createServer(function(request, res) {
		res.writeHead(200,{
			'Content-Type': 'text/html;charset=utf-8'
		})
		if(request.url !== "/favicon.ico") { //清除第2此访问 
			localFn(res);
			res.end('');
		}
	}).listen(8000);
	console.log('Server    running    at    http://127.0.0.1:8000/');
}

function localFn(res){
	res.write('本地函数调用');
}

/*
 * 读取其他文件函数
 */
function readDirFn(){
	var otherFn = require('./models/otherfun');
	http.createServer(function(req,res){
		res.writeHead(200,{
			'Content-Type': 'text/html;charset=utf-8'
		})
		if(req.url !== "/favicon.ico") { //清除第2此访问 
			otherFn.otherFn(res);
			res.end('');
		}
	}).listen(8001);
	console.log('Server    running    at    http://127.0.0.1:8001/');
}

readDirFn();
readLocalFn();





//var http = require('http');
//var otherfun = require('./models/otherfun.js');
//http.createServer(function(request, response) {
//	response.writeHead(200, {
//		'Content-Type': 'text/html;    charset=utf-8'
//	});
//	
////		fun1(response);
////		otherfun.controller(request, response);
////		otherfun.call(response);
//		response.end('11');
////	}
//})
//
////---普通函数      
//function fun1(res) {
//	res.write("函数调用");
//}
//
////-------------------models/otherfuns.js--------------------------      
//function controller(req, res) {
//	//res.write("发送");      
//	call('函数调用', req, res);
//	res.end("");
//}
//
//function call(res) {
//	console.log('call');
//}
//module.exports = controller; //只支持一个函数      

/*      
//支持多个函数      
module.exports={      
    getVisit:function(){      
    return  visitnum++;      
    },      
    add:function(a,b){      
    return  a+b;      
    }      
}      
*/
//-----------------用函数名的字符串调用------------------
//var http = require('http');
//var otherfun = require("./models/otherfuns.js");
//http.createServer(function(request, response) {
//	response.writeHead(200, {
//		'Content-Type': 'text/html;        charset=utf-8'
//	});
//	if(request.url !== "/favicon.ico") { //清除第2此访问
//		//fun1(response);
//		//-------用字符串调用对应的函数---
//		funname = 'fun3';
//		otherfun[funname](response);
//		//otherfun['fun3'](response);
//		response.end('');
//	}
//}).listen(8000);
//console.log('Server        running        at        http://127.0.0.1:8000/');
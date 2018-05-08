var fs = require('fs'); //操作文件类
let url = require('url'),
	querystring  =  require('querystring');  //post需导入 
/*
 * 读取文件
 */
function readfile(path, afterCb) {
	fs.readFile(path, function(err, data) {
		if(err) {
			console.log(err);
		} else {
			afterCb(data);
		}
		console.log("异步方法执行完毕");
	})
}

/*
 * 写文件
 */
function writeFile(path, data, afterCb) {
	fs.writeFile(path, data, function(err) {
		if(err) {
			throw err;
		}
		afterCb('写文件成功');
		console.log('It\'s  saved!'); //文件被保存
	})
}

/*
 * 公用读取HTML回调
 */
function commonHtmlCb(req,res){
	function afterCb(data){
		res.writeHead(200, {
			'Content-Type': 'text/html;charset=utf-8'
		})
		res.write(data);
		res.end('路由异步读取文件结束')
	}
	return afterCb;
}

/*
 * 读取图片
 */
function readImg(path, afterCb) {
	//binary 二级制流
	fs.readFile(path, 'binary', function(err, file) {
		if(err) {
			console.log(err);
			return;
		} else {
			console.log("输出文件");
			afterCb(file);
		}
	});
}

var config = {
	login: function(req, res) {
		afterCb = commonHtmlCb(req,res);
		readfile('./files/login.html', afterCb);
	},
	signup: function(req, res) {
		afterCb = commonHtmlCb(req,res);
		readfile('./files/signup.html', afterCb);
	},
	/*
	 * 写文件
	 */
	writefile: function(req, res) {
		function afterCb(data) {
			res.writeHead(200, {
				'Content-Type': 'text/html;charset=utf-8'
			})
			res.write(data);
			res.end('路由异步写文件结束')
		}
		writeFile('./files/write.txt', '骑士加油', afterCb);
	},
	/*
	 * 读取图片
	 */
	readimg: function(req, res) {
		function afterCb(data) {
			res.writeHead(200, {
				'Content-Type': 'image/jpeg'
			});
			//binary 必须设置 否则读不出来
			res.write(data, 'binary');
			res.end('')
		}
		readImg('./images/171221_FARO_3.jpg', afterCb)
	},
	/*
	 * ajaxget
	 */
	ajaxget : function(req,res) {
		let rdata = url.parse(req.url,true).query;      
		if(rdata['email']!=undefined && rdata['password']!=undefined){
			console.log(rdata['email']);
			console.log(rdata['password']);
        }
		if(req.url !== "/favicon.ico") {
			var afterCb = commonHtmlCb(req,res);
			readfile('./files/login.html', afterCb);
		}
	},
	/*
	 * ajaxpost
	 */
	ajaxpost : (req,res) => {
		var  post  =  '';          //定义了一个post变量，用于暂存请求体的信息      
      
        req.on('data',  function(chunk){        //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中      
            post  +=  chunk;      
        });      
        //-------注意异步-------------      
        req.on('end',  function(){        //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。      
        	console.log('querystring:' + querystring);
            post  =  querystring.parse(post);      
            console.log('email:'+post['email']+'\n');        
             console.log('pwd:'+post['password']+'\n');
        });
        if(req.url !== "/favicon.ico") {
			var afterCb = commonHtmlCb(req,res);
			readfile('./files/login.html', afterCb);
		}
	},
	/*
	 * 模板替换
	 * 类似smarty
	 */
	ajaxtemplate : (req,res) => {
		var  post  =  '',postArr = ['email','password'],dataStr='';          //定义了一个post变量，用于暂存请求体的信息      
      
        req.on('data',  function(chunk){        //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中      
            post  +=  chunk;      
        });      
        //-------注意异步-------------      
        req.on('end',  function(){        //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。      
        	console.log('querystring:' + querystring);
            post  =  querystring.parse(post);      
            console.log('email:'+post['email']+'\n');        
            console.log('pwd:'+post['password']+'\n');
//          for (var i in post){
//          	postArr = post[i];
//          }
        });
        if(req.url !== "/favicon.ico") {
			function afterCb(data){
				res.writeHead(200, {
					'Content-Type': 'text/html;charset=utf-8'
				})
				dataStr = data.toString();
				for(var i = 0; i < postArr.length; i++){
					var reg = new RegExp('{' + postArr[i] +  '}','gm');
					dataStr = dataStr.replace(reg,post[postArr[i]]);
				}
				res.write(dataStr);
				res.end('路由异步读取文件结束')
			}
			readfile('./files/login.html', afterCb);
		}
	}
}

module.exports = config
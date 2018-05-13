let fs = require('fs')
	url = require('url'),
	async = require('async'),
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
	},
	/*
	 * 异步流程控制
	 * 串行无关联
	 * 多个函数依次执行,之间没有数据交换,其中一个函数出错，后续函数不再执行 
	 */
	aysncSeries : (req,res) => {
		async.series({     
		    one: function(callback){     
		        callback(null, 1);     
		    },     
		    two: function(callback){     
		        callback(null, 2);     
		    }     
		},function(err, results) {     
		    console.log(results);     
		});  
		afterCb = commonHtmlCb(req,res);
		readfile('./files/signup.html', afterCb);
	},
	/*
	 * 异步流程控制
	 * 并行无关联
	 * 多个函数并行执行，最后汇总结果,如果某一个流程出错就退出  
	 */
	aysncParallel : (req,res) => {
		let i = j = 0,timer1 = null,time2 = null;
		async.parallel({     
		    one: function(callback){
		    	timer1 = setInterval(function(){
		    		console.log(i);i++;
		    		if (i == 3){
		    			clearInterval(timer1)
		    		}
		    	},1000)
		        callback(null, 1);     
		    },     
		    two: function(callback){     
		    	timer2 = setInterval(function(){
		    		console.log(j);j++;
		    		if (j == 3){
		    			clearInterval(timer2)
		    		}
		    	},1000)
		        callback(null, 2);     
		    }     
		},function(err, results) {     
		    console.log(results);     
		});  
		afterCb = commonHtmlCb(req,res);
		readfile('./files/signup.html', afterCb);
	},
	/*
	 * 异步流程控制
	 * 并行无关联
	 * 每一步执行时需要由上一步执行的结果当做参数.所以每一步必须串行等待  
	 * 任意一个方法出错，不往下执行
	 */
	aysncWaterfall : (req,res) => {
		let i = j = 0,timer1 = null,time2 = null;
		//数组形式传入
		async.waterfall([
		    function(callback){
		    	timer1 = setInterval(function(){
		    		console.log(i);i++;
		    		if (i == 3){
		    			clearInterval(timer1)
		    		}
		    	},1000)
		        callback(null, 1);     
		    },
		    /*
		     * preValue 为上一个执行方法的结果
		     */
		    function(preValue,callback){ 
		    	timer2 = setInterval(function(){
		    		console.log(j);j++;
		    		if (j == 3){
		    			clearInterval(timer2)
		    		}
		    	},1000)
		        callback(null, preValue + '2');     
		    }     
		],function(err, results) {     
		    console.log(results);     
		});  
		afterCb = commonHtmlCb(req,res);
		readfile('./files/signup.html', afterCb);
	},
	
}

module.exports = config
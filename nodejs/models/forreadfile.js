var fs = require('fs'); //操作文件類
//module.exports = {
//		readfile: function(path) { //异步执行
//				fs.readFile(path, function(err, data) {
//						if(err) {
//							console.log(err);
//						} else {
//							console.log(data.toString());
//						}
//
//						console.log("异步方法执行完毕");
//					},
//					readfileSync: function(path) { //同步读取
//						var data = fs.readFileSync(path, 'utf-8');
//						//console.log(data);
//						console.log("同步方法执行完毕");
//						return data;
//					}
//				}
module.exports = {
	/*
	 * 同步 一般不采用，会降低服务端的反映速度
	 * 从性能方面也不推荐
	 */
	readfileSync: function(path) {
		var data = fs.readFileSync(path, 'utf-8');
		//console.log(data);
		console.log("同步方法执行完毕");
		return data;
	},
	readfile: function(path,afterCb){
		fs.readFile(path, function(err, data) {
			if(err) {
				console.log(err);
			} else {
				afterCb(data);
			}
			console.log("异步方法执行完毕");
		})
	}
}

/*
 * 递归创建目录
 */

var fs = require("fs");
var path = require("path");

// 递归创建目录 异步方法  
function mkdirs(dirname, callback) {
	fs.exists(dirname, function(exists) {
		if(exists) {
			callback();
		} else {
			// console.log(path.dirname(dirname));  
			mkdirs(path.dirname(dirname), function() {
				fs.mkdir(dirname, callback);
				console.log('在' + path.dirname(dirname) + '目录创建好' + dirname + '目录');
			});
		}
	});
}
// 递归创建目录 同步方法
function checkMadeDir(dirname) {
	if (!dirname) return;
	let _dirname = path.dirname(dirname);
	if(fs.existsSync(_dirname)) {
		return true;
	} else {
		if(checkMadeDir(_dirname)) {
			fs.mkdirSync(_dirname);
			return true;
		}
	}
}

//mkdirs('hello/a/b/c',() => {
//  console.log('done');
//})

//mkdirsSync('hello/a/b/c');

checkMadeDir('mkdir/a/d/e/aa.js')
//console.log(fs.existsSync(path.dirname('mkdir/a/d/b/aa.js')))

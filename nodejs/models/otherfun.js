function otherFn(res){
	console.log('otherFn');
	res.write('读取文件夹JS成功')
}

/*
 * 支持多函数
 */
module.exports = {
	otherFn : function(res){
		console.log('otherFn');
		res.write('读取文件夹JS成功')
	}
};	

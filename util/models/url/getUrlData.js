/**
 * @desc 获取URL参数
 * @return {Object}
 * @param {String} 
 */
function getUrlData(s) {
	var a = s.split('?')[1].split("&"),
		o = {};
	for(var i = 0; i < a.length; i++) {
		var k = a[i].split("=");
		o[k[0]] = k[1];
	}
	return o;
}
module.exports = getUrlData;
/**
 * @desc 判断是否空数组
 * @param {Object} 
 * @return {Boolean}
 */
function isEmptyObject(obj){
	for (var i in obj){
		return true;
	}
	return false;
}

module.exports = isEmptyObject;
/*
 * 工具
 */

module.exports = {
	isEmptyObject : function(obj){
		for (var i in obj){
			return true;
		}
		return false;
	}
}

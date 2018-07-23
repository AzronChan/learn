/*
 * 工具
 */

module.exports = {
	isEmptyObject : function(obj){
		for (var i in obj){
			return true;
		}
		return false;
	},
	returnZero (num){
		return num < 10 ? '0' + num : num;
	},
	
}

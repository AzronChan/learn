/*
 * @desc 数组去重 
 */
function unique(arr){
	var _arr = [];
	for (var i = 0; i < arr.length; i++) {
		(_arr.indexOf(arr[i]) == -1) && _arr.push(arr[i]);
	}
	return _arr;
}

module.exports = unique;
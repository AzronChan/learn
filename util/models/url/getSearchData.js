/**
 * @desc 获取url seachdata
 */
function getSearchData(){
	var a = location.search.replace("?","").split("&"),o = {};
	for (var i = 0;i < a.length; i++){
		var k = a[i].split("=");
        o[k[0]] = k[1];
	}
	return o;
}

module.exports = getSearchData;
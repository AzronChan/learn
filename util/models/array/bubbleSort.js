/**
 * 冒泡算法
 * @id bubbleSort
 * @param {Array} 需排列数组
 * @param {String} 按key值排序 -- 可选
 * @param {Boolean} 排序方式，true为降序，false为升序 -- 可选,默认升序
 */
function bubbleSort(arr, key, desc) {
    var arr = [].concat(arr);
    var arr1 = [];
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (key) {
                if (parseInt(arr[i][key]) > parseInt(arr[j][key])) break;
            } else {
                if (arr[i] > arr[j]) break;
            }
            if (j == arr.length - 1) {
                arr1.push(arr[i]);
                arr.splice(i, 1);
                i = -1;
            }
        }
        if (i == arr.length - 1) {
            arr1.push(arr[i]);
            arr.splice(i, 1);
            i = -1;
        }
    }

    if (desc) return arr1.reverse();
    else return arr1;
}

module.exports = bubbleSort;
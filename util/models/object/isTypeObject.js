/**
 * @desc 判断是否空数组
 * @param {Object} 
 * @return {Boolean}
 */
function isTypeObject(obj,type){
    return Object.prototype.toString.call(obj) === '[object '+type+']';
}

module.exports = isTypeObject;
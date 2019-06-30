/**
 * @param  {Number}    delay 延时执行秒数，单位毫秒
 * @param  {Function}  callback 回调函数
**/
function debounce(callback,delay) {
    let timeout = null;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback.call(this, arguments);
      }, delay);
    };
  }

  module.exports = debounce; 
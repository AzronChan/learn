
/**
 * @param  {Number}    delay 延时执行秒数，单位毫秒
 * @param  {Function}  callback 回调函数
**/
function throttle(callback,delay) {
  let canRun = true;
  return function() {
    if(!canRun) {
      return;
    }
    canRun = false;
    setTimeout(() => {
      callback.call(this, arguments);
      canRun = true;
    }, delay);
  };
}

  module.exports = throttle; 
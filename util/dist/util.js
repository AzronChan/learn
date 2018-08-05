/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./models/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./models sync recursive ^\\.\\/.+\\/.+\\.js$":
/*!**************************************!*\
  !*** ./models sync ^\.\/.+\/.+\.js$ ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./Cookie/Cookie.js\": \"./models/Cookie/Cookie.js\",\n\t\"./Regexp/testMail.js\": \"./models/Regexp/testMail.js\",\n\t\"./Regexp/testTel.js\": \"./models/Regexp/testTel.js\",\n\t\"./array/bubbleSort.js\": \"./models/array/bubbleSort.js\",\n\t\"./array/isArray.js\": \"./models/array/isArray.js\",\n\t\"./array/unique.js\": \"./models/array/unique.js\",\n\t\"./device/UA.js\": \"./models/device/UA.js\",\n\t\"./device/getOs.js\": \"./models/device/getOs.js\",\n\t\"./dom/Offset.js\": \"./models/dom/Offset.js\",\n\t\"./dom/deepClone.js\": \"./models/dom/deepClone.js\",\n\t\"./dom/keyboard.js\": \"./models/dom/keyboard.js\",\n\t\"./object/isEmptyObject.js\": \"./models/object/isEmptyObject.js\",\n\t\"./test/index.js\": \"./models/test/index.js\",\n\t\"./url/getSearchData.js\": \"./models/url/getSearchData.js\",\n\t\"./url/getUrlData.js\": \"./models/url/getUrlData.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tvar id = map[req];\n\tif(!(id + 1)) { // check for number or string\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn id;\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./models sync recursive ^\\\\.\\\\/.+\\\\/.+\\\\.js$\";\n\n//# sourceURL=webpack:///./models_sync_^\\.\\/.+\\/.+\\.js$?");

/***/ }),

/***/ "./models/Cookie/Cookie.js":
/*!*********************************!*\
  !*** ./models/Cookie/Cookie.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * Cookie\r\n * @id Cookie\r\n */\nvar Cookie = {\n    write: function write(name, value, exp, path, domain, secure) {\n        if (!/^\\w*$/.test(name)) alert(\"cookie格式不正确\");\n        if (/; /.test(value)) alert(\"cookie格式不正确\");\n        var cookieValue = name + \"=\" + value;\n        if (exp) {\n            var dt = new Date();\n            dt.setTime(dt.getTime() + exp * 1000);\n            cookieValue += \"; expires=\" + dt.toGMTString();\n        }\n        if (path) {\n            cookieValue += \"; path=\" + path;\n        }\n        if (domain) {\n            cookieValue += \"; domain=\" + domain;\n        }\n        if (secure) {\n            cookieValue += \"; secure\";\n        }\n        document.cookie = cookieValue;\n    },\n    rewriteKey: function rewriteKey(name, key, keyVal, exp, path, domain, secure) {\n        var str = key;\n        if (keyVal) {\n            var cookie = this.read(name);\n            var reg = new RegExp(\"\\\\b\" + key + \"=([^&]*)\\\\b\", \"g\");\n            str = cookie.replace(reg, function (m1, m2) {\n                return m1.replace(m2, keyVal);\n            });\n        }\n        if (/^\\d+(s|m|h|d)$/i.test(exp)) {\n            if (/^\\d+s$/i.test(exp)) this.setSec(name, str, exp.replace(/s$/i, \"\"), path, domain, secure);\n            if (/^\\d+m$/i.test(exp)) this.setMin(name, str, exp.replace(/m$/i, \"\"), path, domain, secure);\n            if (/^\\d+h$/i.test(exp)) this.setHour(name, str, exp.replace(/h$/i, \"\"), path, domain, secure);\n            if (/^\\d+d$/i.test(exp)) this.setDay(name, str, exp.replace(/d$/i, \"\"), path, domain, secure);\n        } else {\n            this.write(name, str, exp, path, domain, secure);\n        }\n    },\n    setDay: function setDay(name, value, exp, path, domain, secure) {\n        this.write(name, value, exp * 24 * 60 * 60, path, domain, secure);\n    },\n    setHour: function setHour(name, value, exp, path, domain, secure) {\n        this.write(name, value, exp * 60 * 60, path, domain, secure);\n    },\n    setMin: function setMin(name, value, exp, path, domain, secure) {\n        this.write(name, value, exp * 60, path, domain, secure);\n    },\n    setSec: function setSec(name, value, exp, path, domain, secure) {\n        this.write(name, value, exp, path, domain, secure);\n    },\n    read: function read(name, key, isJSON) {\n        var cookieValue = \"\";\n        var arrStr = document.cookie.split(\"; \");\n        for (var i = 0; i < arrStr.length; i++) {\n            var temp = arrStr[i].match(/^(\\w+)=(.+)$/);\n            if (temp && temp.length > 1 && temp[1] == name) {\n                cookieValue = temp[2];\n                break;\n            }\n        }\n        if (key) {\n            if (!isJSON) {\n                var o = {},\n                    arr = cookieValue.split('&');\n                for (var i in arr) {\n                    o[arr[i].split('=')[0]] = arr[i].split('=')[1];\n                }\n                return o[key];\n            } else return JSON.parse('{' + cookieValue.replace(/\\=/, ':').replace(/([a-z0-9]+)/g, function () {\n                return '\"' + arguments[0] + '\"';\n            }) + '}');\n        }\n        return cookieValue;\n    },\n    remove: function remove(name, path, domain) {\n        var cookie = name + \"=\";\n        if (path) cookie += '; path=' + path;\n        if (domain) cookie += ';domain=' + domain;\n        cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';\n        document.cookie = cookie;\n    }\n};\n\nmodule.exports = Cookie;\n\n//# sourceURL=webpack:///./models/Cookie/Cookie.js?");

/***/ }),

/***/ "./models/Regexp/testMail.js":
/*!***********************************!*\
  !*** ./models/Regexp/testMail.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 验证邮箱正确性\r\n * 允许前部有汉字\r\n * 汉字在正则表示为[\\u4e00-\\u9fa5]\r\n * @param {Object} str\r\n */\nfunction testMail(str) {\n  if (str.match(/^[A-Za-z0-9\\u4e00-\\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$/g)) return true;else return false;\n}\n\nmodule.exports = testMail;\n\n//# sourceURL=webpack:///./models/Regexp/testMail.js?");

/***/ }),

/***/ "./models/Regexp/testTel.js":
/*!**********************************!*\
  !*** ./models/Regexp/testTel.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 验证手机号正确性\r\n * @param {String} str\r\n */\nfunction testTel(str) {\n  if (str.match(/^[1][3,4,5,7,8][0-9]{9}$/)) return true;else return false;\n}\n\nmodule.exports = testTel;\n\n//# sourceURL=webpack:///./models/Regexp/testTel.js?");

/***/ }),

/***/ "./models/array/bubbleSort.js":
/*!************************************!*\
  !*** ./models/array/bubbleSort.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * 冒泡算法\r\n * @id bubbleSort\r\n * @param {Array} 需排列数组\r\n * @param {String} 按key值排序 -- 可选\r\n * @param {Boolean} 排序方式，true为降序，false为升序 -- 可选,默认升序\r\n */\nfunction bubbleSort(arr, key, desc) {\n    var arr = [].concat(arr);\n    var arr1 = [];\n    for (var i = 0; i < arr.length; i++) {\n        for (var j = i + 1; j < arr.length; j++) {\n            if (key) {\n                if (parseInt(arr[i][key]) > parseInt(arr[j][key])) break;\n            } else {\n                if (arr[i] > arr[j]) break;\n            }\n            if (j == arr.length - 1) {\n                arr1.push(arr[i]);\n                arr.splice(i, 1);\n                i = -1;\n            }\n        }\n        if (i == arr.length - 1) {\n            arr1.push(arr[i]);\n            arr.splice(i, 1);\n            i = -1;\n        }\n    }\n\n    if (desc) return arr1.reverse();else return arr1;\n}\n\nmodule.exports = bubbleSort;\n\n//# sourceURL=webpack:///./models/array/bubbleSort.js?");

/***/ }),

/***/ "./models/array/isArray.js":
/*!*********************************!*\
  !*** ./models/array/isArray.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\r\n * 是否为数组\r\n * 非ES6\r\n * ES6使用isArray()\r\n */\nfunction isArray(arr) {\n  return Object.prototype.toString.call(arr) == '[object Array]';\n}\n\nmodule.exports = isArray;\n\n//# sourceURL=webpack:///./models/array/isArray.js?");

/***/ }),

/***/ "./models/array/unique.js":
/*!********************************!*\
  !*** ./models/array/unique.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\r\n * @desc 数组去重 \r\n */\nfunction unique(arr) {\n\tvar _arr = [];\n\tfor (var i = 0; i < arr.length; i++) {\n\t\t_arr.indexOf(arr[i]) == -1 && _arr.push(arr[i]);\n\t}\n\treturn _arr;\n}\n\nmodule.exports = unique;\n\n//# sourceURL=webpack:///./models/array/unique.js?");

/***/ }),

/***/ "./models/device/UA.js":
/*!*****************************!*\
  !*** ./models/device/UA.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar UA = function UA() {\n\tvar ua = window.navigator.userAgent;\n\treturn {\n\t\tIe: !!(\"ActiveXObject\" in window),\n\t\tIe6: !!(\"ActiveXObject\" in window) && /msie 6.0/gi.test(window.navigator.appVersion),\n\t\tIe7: !!(\"ActiveXObject\" in window) && /msie 7.0/gi.test(window.navigator.appVersion),\n\t\tIe8: !!(\"ActiveXObject\" in window) && /msie 8.0/gi.test(window.navigator.appVersion),\n\t\tIe9: !!(\"ActiveXObject\" in window) && /msie 9.0/gi.test(window.navigator.appVersion),\n\t\tIe10: !!(\"ActiveXObject\" in window) && /msie 10.0/gi.test(window.navigator.appVersion),\n\t\tFF: /firefox/gi.test(ua),\n\t\tOpera: /opera/gi.test(ua),\n\t\tChrom: /Chrom/gi.test(ua),\n\t\tMaxthon: /Maxthon/gi.test(ua),\n\t\tiPad: /iPad/gi.test(ua),\n\t\tandroid: /Android|Adr/gi.test(ua), //android终端\n\t\tmobile: !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端\n\t\tios: !!ua.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端\n\t\tweixin: /MicroMessenger/gi.test(ua), //是否微信\n\t\tweibo: /WeiBo/gi.test(ua) //是否微博\n\t};\n};\n\nmodule.exports = UA;\n\n//# sourceURL=webpack:///./models/device/UA.js?");

/***/ }),

/***/ "./models/device/getOs.js":
/*!********************************!*\
  !*** ./models/device/getOs.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * \r\n * @desc 获取操作系统类型\r\n * @return {String} \r\n */\nfunction getOS() {\n    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';\n    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';\n    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';\n\n    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios';\n    if (/android/i.test(userAgent)) return 'android';\n    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone';\n    if (/mac/i.test(appVersion)) return 'MacOSX';\n    if (/win/i.test(appVersion)) return 'windows';\n    if (/linux/i.test(appVersion)) return 'linux';\n}\n\nmodule.exports = getOS;\n\n//# sourceURL=webpack:///./models/device/getOs.js?");

/***/ }),

/***/ "./models/dom/Offset.js":
/*!******************************!*\
  !*** ./models/dom/Offset.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction Offset(node) {\n    if (!node) return;\n    //getBoundingClientRect.top 距离浏览器顶部高度\n    var docElem = document.documentElement;\n    return {\n        top: node.getBoundingClientRect().top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),\n        left: node.getBoundingClientRect().left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)\n    };\n    //减去docElem.clientTop 为兼容IE\n}\n\nmodule.exports = Offset;\n\n//# sourceURL=webpack:///./models/dom/Offset.js?");

/***/ }),

/***/ "./models/dom/deepClone.js":
/*!*********************************!*\
  !*** ./models/dom/deepClone.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n/**\r\n * @desc 深拷贝，支持常见类型\r\n * @param {Any} values\r\n */\nfunction deepClone(values) {\n    var copy;\n\n    // Handle the 3 simple types, and null or undefined\n    if (null == values || \"object\" != (typeof values === \"undefined\" ? \"undefined\" : _typeof(values))) return values;\n\n    // Handle Date\n    if (values instanceof Date) {\n        copy = new Date();\n        copy.setTime(values.getTime());\n        return copy;\n    }\n\n    // Handle Array\n    if (values instanceof Array) {\n        copy = [];\n        for (var i = 0, len = values.length; i < len; i++) {\n            copy[i] = deepClone(values[i]);\n        }\n        return copy;\n    }\n\n    // Handle Object\n    if (values instanceof Object) {\n        copy = {};\n        for (var attr in values) {\n            if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);\n        }\n        return copy;\n    }\n\n    throw new Error(\"Unable to copy values! Its type isn't supported.\");\n}\n\nmodule.exports = deepClone;\n\n//# sourceURL=webpack:///./models/dom/deepClone.js?");

/***/ }),

/***/ "./models/dom/keyboard.js":
/*!********************************!*\
  !*** ./models/dom/keyboard.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * \r\n * @desc H5软键盘缩回、弹起回调\r\n * 当软件键盘弹起会改变当前 window.innerHeight，监听这个值变化\r\n * @param {Function} downCb 当软键盘弹起后，缩回的回调\r\n * @param {Function} upCb 当软键盘弹起的回调\r\n */\n\nfunction windowResize(downCb, upCb) {\n\tvar clientHeight = window.innerHeight;\n\tdownCb = typeof downCb === 'function' ? downCb : function () {};\n\tupCb = typeof upCb === 'function' ? upCb : function () {};\n\twindow.addEventListener('resize', function () {\n\t\tvar height = window.innerHeight;\n\t\tif (height === clientHeight) {\n\t\t\tdownCb();\n\t\t}\n\t\tif (height < clientHeight) {\n\t\t\tupCb();\n\t\t}\n\t});\n}\n\nmodule.exports = windowResize;\n\n//# sourceURL=webpack:///./models/dom/keyboard.js?");

/***/ }),

/***/ "./models/index.js":
/*!*************************!*\
  !*** ./models/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @desc webpack打包入口文件  \r\n */\nvar moduleExports = {};\n\nvar r = __webpack_require__(\"./models sync recursive ^\\\\.\\\\/.+\\\\/.+\\\\.js$\");\n\nconsole.log(r.keys());\nr.keys().forEach(function (key) {\n  var attr = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));\n  moduleExports[attr] = r(key);\n});\nconsole.log(moduleExports);\nwindow.util = moduleExports;\nmodule.exports = moduleExports;\n\n//# sourceURL=webpack:///./models/index.js?");

/***/ }),

/***/ "./models/object/isEmptyObject.js":
/*!****************************************!*\
  !*** ./models/object/isEmptyObject.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @desc 判断是否空数组\r\n * @param {Object} \r\n * @return {Boolean}\r\n */\nfunction isEmptyObject(obj) {\n  for (var i in obj) {\n    return true;\n  }\n  return false;\n}\n\nmodule.exports = isEmptyObject;\n\n//# sourceURL=webpack:///./models/object/isEmptyObject.js?");

/***/ }),

/***/ "./models/test/index.js":
/*!******************************!*\
  !*** ./models/test/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n//# sourceURL=webpack:///./models/test/index.js?");

/***/ }),

/***/ "./models/url/getSearchData.js":
/*!*************************************!*\
  !*** ./models/url/getSearchData.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @desc 获取url seachdata\r\n */\nfunction getSearchData() {\n\tvar a = location.search.replace(\"?\", \"\").split(\"&\"),\n\t    o = {};\n\tfor (var i = 0; i < a.length; i++) {\n\t\tvar k = a[i].split(\"=\");\n\t\to[k[0]] = k[1];\n\t}\n\treturn o;\n}\n\nmodule.exports = getSearchData;\n\n//# sourceURL=webpack:///./models/url/getSearchData.js?");

/***/ }),

/***/ "./models/url/getUrlData.js":
/*!**********************************!*\
  !*** ./models/url/getUrlData.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * @desc 获取URL参数\r\n * @return {Object}\r\n * @param {String} \r\n */\nfunction getUrlData(s) {\n\tvar a = s.split('?')[1].split(\"&\"),\n\t    o = {};\n\tfor (var i = 0; i < a.length; i++) {\n\t\tvar k = a[i].split(\"=\");\n\t\to[k[0]] = k[1];\n\t}\n\treturn o;\n}\nmodule.exports = getUrlData;\n\n//# sourceURL=webpack:///./models/url/getUrlData.js?");

/***/ })

/******/ });
/**
 * @desc webpack打包入口文件  
 */
let moduleExports = {};

const r = require.context('./', true, /^\.\/.+\/.+\.js$/);

console.log(r.keys())
r.keys().forEach(key => {
    let attr = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
    moduleExports[attr] = r(key);
});
console.log(moduleExports)
window.util = moduleExports;
module.exports = moduleExports;
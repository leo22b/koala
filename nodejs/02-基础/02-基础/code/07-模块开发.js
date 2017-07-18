

//  导入模块
const modu = require('./module/01-module.js');

console.log( modu.sum(10, 20) );

// 因为模块并没有导出对应的成员
// modu.test(); // 不能使用

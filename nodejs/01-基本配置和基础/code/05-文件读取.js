

// 模块化
// 导入文件系统模块
var fs = require('fs');


// 同步的方式文件读取
// var content = fs.readFileSync('./01-test.js');   // 返回值buffer
var content = fs.readFileSync('./01-test.js', 'utf8');  // 返回值string

console.log(content);


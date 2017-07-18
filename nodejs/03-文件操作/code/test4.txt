

// 导入路径模块
const path = require('path');


const filename = module.filename;


// 1、带后缀文件名
// console.log( path.basename(filename) );
// console.log( path.basename(filename, '.js') );

// 2、获取文件的路径
// console.log( path.dirname(filename) );

// 3、路径分隔符
// 获取环境变量
// console.log( process.env.PATH );
// 系统路径分隔符
// console.log( path.delimiter );
// 每个数组元素对应一个变量
// console.log( process.env.PATH.split(path.delimiter) );


// 4、获取文件后缀
// console.log( path.extname(filename) );


// 5、字符串路径 转为 路径对象
let fileObj = path.parse(filename);
// console.log( path.parse(filename) );
// console.log( fileObj.base );


// 6、路径对象 转为 字符串路径
// console.log( path.format(fileObj) );

// 7、是否为绝对路径
// console.log( path.isAbsolute(filename) );


// 8、路径拼接
// ./test1.js
// let temp = path.join(__dirname, 'test1.js');
// let temp = path.join(__dirname, './test1.js');
// let temp = path.join(__dirname, './lyrics/相约一九九八.lrc');
// let temp = path.join(__dirname, 'lyrics', '相约一九九八.lrc');
// let temp = path.join(__dirname, '../', 'code', 'lyrics', '相约一九九八.lrc');
// console.log(temp);


// 9、常规化一个路径
// var temp = '/opt//bin///////temp///test/a.html';
// console.log( path.normalize(temp) );

// 10、获取相对路径
let temp1 = path.join(__dirname, './lyrics/相约一九九八.lrc');
var temp2 = '/usr/bin';
console.log( path.relative(temp2, temp1) );

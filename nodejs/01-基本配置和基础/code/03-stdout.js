
// 标准输出 -- 不带换行的
process.stdout.write('哈哈');

// console.log 是 process.stdout.write封装的

// 定义函数
var log = function(message){
    // Linux换行: \n
    // window: \r\n
    process.stdout.write(message + '\n');
}
// 函数调用
log('你好');


// 命名空间
var console = {};
console.log = function(message){
     process.stdout.write('my:' + message + '.\n');
}
console.log('hello world!');
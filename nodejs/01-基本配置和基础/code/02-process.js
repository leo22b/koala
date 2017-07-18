

// args[0]: node命令所在位置
// args[1]: node命令执行的文件位置
// var args = process.argv;
// console.log(args);


// 前面两个参数不需要
var args = process.argv.slice(2);
// console.log(args);

switch (args[0]) {
    case 'init':
        console.log('初始化操作');
        break;
    case '-v':
        console.log('process.js v0.3');
        break;
    default:
        console.log('请输入对应的参数： init/-v');
        break;
}

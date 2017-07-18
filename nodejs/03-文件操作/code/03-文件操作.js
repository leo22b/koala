

const fs = require('fs');
const path = require('path');

// 没有编码类型，默认读取到的数据是buffer
// fs.readFile(path.join(__dirname, './test1.js'), (err, data) => {
//     if(err){
//         // 抛出异常
//         throw err;
//         // console.log(err);
//     } else {
//         // <Buffer 0a 63 6f 6e 73 6f 6c 65 2e 6c 6f 67 28 27 e6 88 91 e8 a2 ab e8 b0 83 e7 94 a8 e4 ba 86 27 29 3b 0a>
//         // console.log(data);
//         console.log(data.toString('utf8'));
//     }
// });


//  带有编码类型
// fs.readFile(path.join(__dirname, './test1.js'), 'utf8' ,(err, data) => {
//     if(err){
//         // 抛出异常
//         throw err;
//     } else {
//         console.log(data);
//     }
// });


// 捕获异常(异步是没办法捕获的)
try {
    var str = fs.readFileSync(path.join(__dirname, './test.js'), 'utf8');  
    console.log(str);  
} catch (error) {   // 异常处理
    console.log('错误处理: ' + error);
}



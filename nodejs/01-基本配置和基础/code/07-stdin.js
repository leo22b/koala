

// 设置输入的编码类型
process.stdin.setEncoding('utf8');

// 回车
// process.stdin.on('readable', () => {
//     // 读取输入的内容
//     var chunk = process.stdin.read();

//     if (chunk !== null) {
//         // 再输出到屏幕中
//         process.stdout.write(`data: ${chunk}`);
//     }
// });

// obt.on('click', () => {

// })

// process.stdin.on('data', function(data){ });
process.stdin.on('data', (data) => {
    process.stdout.write(`输出: ${data}`);
});
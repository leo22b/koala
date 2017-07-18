

const fs = require('fs');


// 如果没有对应文件，即先创建对应文件，再写入对应内容
// 如果文件存在，会将原文件覆盖
// 异步方式 写文件
// fs.writeFile('test2.txt', '下午好', (err) => {
//     // 权限查看 ls -l
//     // r可读  w可写  x可执行
//     if(err){    // 一般出错，可能没有权限
//         throw err;
//     } else {    // 写入文件成功
//         console.log('写入文件成功');
//     }
// });

// 同步方式写文件
// try {
//     fs.writeFileSync('test2.txt', JSON.stringify({id: 10}));
//     console.log('文件写入成功');
// } catch (error) {
//     console.log(err);
// }



// 流方式 写文件
// let file = fs.createWriteStream('test3.txt');
// let isSuccess = file.write('你好');
// if(isSuccess){
//     console.log('写入成功');
// } else {
//     console.log('写入失败');
// }




// 同步方式  追加内容
// try {
//     fs.appendFileSync('test3.txt', '追加内容测试');
//     console.log('追加内容成功');
// } catch (error) {
//     console.log(error);
// }


// 异步方式  追加内容
fs.appendFile('test3.txt', '\n添加内容成功了吗？\n', (err) =>{
    if(err) throw err;

    console.log('追加成功');
})
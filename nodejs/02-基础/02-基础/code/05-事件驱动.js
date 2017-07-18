

// 文件存在才读取文件中内容


const fs = require('fs');
const path1 = './txt/a.txt';
const path2 = './txt/b.txt';

// 任务a -- 判断文件是否存在
fs.stat(path1, (err, stats) =>{ // 获取到文件对应状态即调用
    if(err){    // 文件不存在
        console.log('文件不存在: ' + err);
    } else {    // 文件存在

        // 任务c -- 读取文件
        fs.readFile(path1, (err, data) => {
            if(err){
                console.log('读取文件失败：' + err);
            } else {
                console.log(`'${path1}'文件的内容为: '${data}'`);
            }
        });
    }
});


// 任务b -- 判断文件是否存在
fs.stat(path2, (err, stats) =>{ // 获取到文件对应状态即调用
    if(err){    // 文件不存在
        console.log('文件不存在: ' + err);
    } else {    // 文件存在

        // 任务d -- 读取文件
        fs.readFile(path2, (err, data) => {
            if(err){
                console.log('读取文件失败：' + err);
            } else {
                console.log(`'${path2}'文件的内容为: '${data}'`);
            }
        });
    }
});




const fs = require('fs');
const path = require('path');

const filename1 = path.join(__dirname, '02-path.js');
const filename2 = path.join(__dirname, 'test4.txt');


// 创建读取流
let readstream = fs.createReadStream(filename1);
// 创建写入流
let writestream = fs.createWriteStream(filename2);

// 读取到文件内容触发
readstream.on('data', (chunk)=>{
    // 读到什么就写什么
    writestream.write(chunk);
});

readstream.on('end', ()=>{
    console.log('文件复制成功.');
})



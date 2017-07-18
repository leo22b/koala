

const fs = require('fs');
const path = require('path');



// 创建读取流
let readStream = fs.createReadStream(path.join(__dirname, 'test1.js'));


// 存放数据
let tempFile = '';

// 只要是有读取到文件内容即触发
readStream.on('data', (data) => {
    tempFile += data;
});

// 读取文件完毕
readStream.on('end', () => {
  console.log('文件读取完成：' + tempFile);
});

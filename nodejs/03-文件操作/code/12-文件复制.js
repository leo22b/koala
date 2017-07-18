

const fs = require('fs');
const path = require('path');

// const filename1 = path.join(__dirname, '02-path.js');
// const filename2 = path.join(__dirname, 'test5.txt');


// // 创建读取流
// let readstream = fs.createReadStream(filename1);
// // 创建写入流
// let writestream = fs.createWriteStream(filename2);

// // 读取流    ====>    写入流
// readstream.pipe(writestream);



fs.createReadStream(path.join(__dirname, '02-path.js')).pipe( fs.createWriteStream(path.join(__dirname, 'test6.txt')) );
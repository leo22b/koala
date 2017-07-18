
console.log('1');

// 当前文件所在目录的路径 --- 绝对路径
console.log(__dirname);

// 当前的路径 --- 绝对路径
console.log(__filename);


// 读取txt文件夹下的a.txt
const fs = require('fs');
const filename = __dirname + '/../txt/a.txt';
console.log(filename);

fs.readFile(filename, (err, data) => {
    if(err){
        console.log('err:' + err);
    } else {
        console.log('内容：' + data);
    }
});

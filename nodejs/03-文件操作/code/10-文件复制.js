

const fs = require('fs');
const path = require('path');

const filename1 = path.join(__dirname, '02-path.js');
const filename2 = path.join(__dirname, 'test1.txt');


fs.readFile(filename1, (err, data) => {
    if(err){
        throw err;
    } else {

        // 文件读取成功
        fs.writeFile(filename2, data, (err) => {
            if(err){
                throw err;
            } else {
                console.log('文件复制成功....');
            }
        });

    }
});





const fs = require('fs');
const path = require('path');
// 导入iconv-lite模块
const iconv = require('iconv-lite');

//  文件路径
const filepath = path.join(__dirname, './lyrics/相约一九九八.lrc');

fs.readFile(filepath, (err, data) => {
    if(err) throw err;

    // 文件编码是gbk  --- node没有gbk
    // console.log('文件内容：' + data.toString('gbk'));

    // 使用第三方模块
    // data ==> Buffer
    // str = iconv.decode(new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
    str = iconv.decode(data, 'gbk');
    console.log(str);
});

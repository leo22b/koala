

const fs = require('fs');
const path = require('path');
// 导入iconv-lite模块
const iconv = require('iconv-lite');

//  文件路径
const filepath = path.join(__dirname, './lyrics/相约一九九八.lrc');

fs.readFile(filepath, (err, data) => {
    if (err) throw err;


    // 歌词已经读取到 iconv.decode(data, 'gbk') 是一个字符串
    // 将歌词字符串进行切分， 每一行对应即数组的一个元素
    // linux换行: \n      window换行: \r\n
    let lines = iconv.decode(data, 'gbk').split('\r\n');
    // console.log(lines);


    // 歌词的正则表达式
    // 将需要匹配正则的内容复制进来，再修改成通用的
    const rel = /\[\d{2}\:\d{2}\.\d{2,}\].+/;

    // 遍历所有元素
    lines.forEach((line) => {
        // 需要输出歌词，符合的元素才需要输出，不符合即不输出

        // console.log(line);

        if (rel.test(line)) {   // 符合
            console.log(line);
        }
    });
});

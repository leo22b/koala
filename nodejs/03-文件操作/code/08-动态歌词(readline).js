const fs = require('fs');
const path = require('path');
// 导入iconv-lite模块
const iconv = require('iconv-lite');
const readline = require('readline');


// 读取文件流
// const readstream = fs.createReadStream(path.join(__dirname, './lyrics/相约一九九八.lrc'));
// pipe管道，添加编码类型
const readstream = fs.createReadStream(path.join(__dirname, './lyrics/相约一九九八.lrc')).pipe(iconv.decodeStream('gbk'));

// 逐行读取
const rl = readline.createInterface({
    // 数据来源 --- 流
    input: readstream
});



const rel = /\[(\d{2})\:(\d{2}\.\d{2,})\](.+)/;

// 读取到一行即出发
rl.on('line', (cmd) => {
    if (rel.test(cmd)) {   // 符合
        // 延时 setTimeout
        // console.log(line);

        // 获取对应的时间  --- 返回数组，数组下标0的是字符串本身
        let arr = rel.exec(cmd);
        let min = arr[1];   // 分
        let sec = arr[2];   // 秒
        let lrc = arr[3];   // 歌词

        setTimeout(() => {
            console.log(lrc);
        }, min * 60 * 1000 + sec * 1000);
    }
});
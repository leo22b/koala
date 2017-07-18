

const fs = require('fs');
const path = require('path');
// 导入iconv-lite模块
const iconv = require('iconv-lite');

//  文件路径
const filepath = path.join(__dirname, './lyrics/相约一九九八.lrc');

fs.readFile(filepath, (err, data) => {
    if (err) throw err;

    let lines = iconv.decode(data, 'gbk').split('\r\n');


    // 歌词的正则表达式
    const rel = /\[(\d{2})\:(\d{2}\.\d{2,})\](.+)/;

    // let arr = rel.exec(lines[20]);
    // console.log(arr);

    // 遍历所有元素
    lines.forEach((line) => {
        if (rel.test(line)) {   // 符合
            // 延时 setTimeout
            // console.log(line);

            // 获取对应的时间  --- 返回数组，数组下标0的是字符串本身
            let arr = rel.exec(line);
            let min = arr[1];   // 分
            let sec = arr[2];   // 秒
            let lrc = arr[3];   // 歌词

            setTimeout(()=>{
                console.log(lrc);
            }, min*60*1000+sec*1000);
        }
    });
});

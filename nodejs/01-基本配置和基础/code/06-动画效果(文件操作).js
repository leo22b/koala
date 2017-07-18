

var fs = require('fs');


// 不断的在终端中重复： 输出字符画 、擦除字符画
var frames = [];
// 读取文件内容
for(var i=1; i<=6; i++){
    var filename = './frames/' + i + '.txt';

    // 文件名 ， 编码类型
    frames[frames.length] = fs.readFileSync(filename, 'utf8');
}


var index = 0;
setInterval(function(){

    // 擦除字符画 (清空控制台)
    process.stdout.write('\033[2J');
    process.stdout.write('\033[0f');

    // 输出字符画
    process.stdout.write(frames[index]);

    index++;
    if(index >= frames.length){
        index = 0;
    }

}, 500);



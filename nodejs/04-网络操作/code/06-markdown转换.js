

const fs = require('fs');
const path = require('path');
// 导入marked模块
const marked = require('marked');


// 将对应的markdown字符串，转为html字符串
// console.log( marked('I am using __markdown__.') );
// console.log( marked('> I am using `标题`.') );

// 需要监视的文件
const filepath = path.join(__dirname, 'README.md');
// path.dirname(filepath) 文件路径
// path.basename(filepath) 文件名(带后缀)
const savefile = path.join(path.dirname(filepath), path.basename(filepath, '.md')) + '.html';


// 1、监视README.md文件
fs.watchFile(filepath, (curr, prev) => {
    // 文件发生改变  --- 将 README.md 转换为 html

    // 读取README.md文件内容
    fs.readFile(filepath, 'utf8', (err, content) => {
        if (err) {
            throw err;
        } else {    // 已经读取到文件内容


            // 读取样式文件
            fs.readFile(path.join(__dirname, 'github.css'), (err, css) => {
                // 将 README.md 转换为 html
                let html = marked(content);
                // console.log(html);

                // 将html放入到模版中 --- 替换
                // 并将对应样式添加 --- 替换
                html = template.replace('{{content}}', html).replace('{{style}}', css);

                // 将转换好的内容，写入到新的文件中
                fs.writeFile(savefile, html, (err) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log('文件转换成功');
                    }
                });
            });

        }
    })

});

/*
    1、监视.md文件是否有变化
    2、将.md文件读取
    3、将对应的样式表.css读取
    4、将.md内容转为html结构
    5、将html包裹 + 并将样式包裹进去
    6、将对应内容写入到.html文件中
*/



// html基本结构 -- 模版字符串
var template = `
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="utf-8"/>
    <style>
        {{style}}
    </style>
</head>

<body>
    <div class="vs">
        {{content}}
    </div>
</body>
</html>
`;
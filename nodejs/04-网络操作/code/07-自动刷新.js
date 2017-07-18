

const fs = require('fs');
const path = require('path');
// 导入marked模块
const marked = require('marked');
// 导入brower-sync
const browserSync = require("browser-sync");



// 需要监视的文件
const filepath = path.join(__dirname, 'README.md');
const savefile = path.join(path.dirname(filepath), path.basename(filepath, '.md')) + '.html';
const indexName = path.basename(savefile);


// 文件服务器
browserSync({
    server: __dirname,  // 文件服务器的目录
    index: indexName // 在开启服务器之后会打开页面，该页面作为网站根目录
});


// 1、监视README.md文件
fs.watchFile(filepath, (curr, prev) => {
    // 读取README.md文件内容
    fs.readFile(filepath, 'utf8', (err, content) => {
        if (err) {
            throw err;
        } else {    // 已经读取到文件内容


            // 读取样式文件
            fs.readFile(path.join(__dirname, 'github.css'), (err, css) => {
                // 将 README.md 转换为 html
                let html = marked(content);
                html = template.replace('{{content}}', html).replace('{{style}}', css);

                // 将转换好的内容，写入到新的文件中
                fs.writeFile(savefile, html, (err) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log('文件转换成功');
                        // 刷新
                        browserSync.reload(indexName);
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
    7、让客户端刷新页面
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
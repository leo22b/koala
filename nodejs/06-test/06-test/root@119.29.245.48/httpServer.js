const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');


const PORT = 2017;
const HOME_NAME = '0.0.0.0';


// 创建服务
http.createServer(clientConnect).listen(PORT, HOME_NAME, (err) => {
    if(err){ 
        throw err; 
    } else { 
        console.log(`【服务开启，正在监听${PORT}端口】`);
    }
});


// 客户端链接处理函数
// request： 客户端发给服务器的请求
// response： 服务器给客户的响应
function clientConnect(request, response){
    // 请求地址
    let urlStr = request.url;

    // 文件路径
    let filepath = '';

    // 文件路径处理
    /*
        1、直接通过域名访问  index.html
        2、.html文件中，除了index.html是在 './'目录下， 其他的都是 'html/'文件中 (http://192.168.1.112:2017/about.html)
        3、其他文件，直接路径拼接
    */
    if( path.basename(urlStr) === '' || path.basename(urlStr) === 'index.html'){  // 首页
        filepath = path.join(__dirname, 'index.html');
        // filepath = './index.html';
    } else if(path.extname(urlStr) === '.html'){    // .html文件
        // urlStr ==> about.html
        filepath = path.join(__dirname, 'html', urlStr);
    } else {
        filepath = path.join(__dirname, urlStr);
    }

    console.log(filepath);


    // 如果文件存在，即读取文件并发送给客户端
    fs.stat(filepath, (err, stats) => {
        if(err){ 
            throw err; 
        } else {    // 文件存在 
            // 响应
            response.writeHead(200, { "Content-Type": getContentType(filepath) });
            // response.write('<h1>hello world!</h1>');
            // 文件读取流
            let readStream = fs.createReadStream(filepath);
            readStream.pipe(response);
        }
    })
}


//依据路径获取返回内容类型字符串,用于http返回头
let getContentType = function(filePath){
    var contentType="";
    //使用路径解析模块获取文件扩展名
    var extension=path.extname(filePath);
    switch(extension){
        case ".html":
            contentType= "text/html";
            break;
        case ".js":
            contentType="text/javascript";
            break;
        case ".css":
            contentType="text/css";
            break;
        case ".gif":
            contentType="image/gif";
            break;
        case ".jpg":
            contentType="image/jpeg";
            break;
        case ".png":
            contentType="image/png";
            break;
        case ".ico":
            contentType="image/icon";
            break;
        case ".json":    // 测试
            contentType="application/json";
            break;
        default:
        contentType="application/octet-stream";
    }
    return contentType; //返回内容类型字符串
}
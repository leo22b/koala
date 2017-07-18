

const http = require('http');


let index = 1;
const server = http.createServer( (request, response) => {
    // 客户端与服务器建立链接后，触发
    response.write(`第${++index}个链接.....`);
    response.end();
});

server.listen(2080, (err)=>{
    if(err){
        console.log('监听端口失败');
    } else {
        console.log('监听2080端口成功');
    }
});


const net = require('net');

// // 创建服务
// const server = net.createServer( (socket) => {

// });


// // 监听端口，绑定ip
// server.listen();


// 创建服务，并进行监听(ip、端口)
const server = net.createServer(clientConnected).listen(3333, (err) => {
    // 一般情况端口被占用会报错
    if(err){ 
        throw err; 
    } else { 
        console.log('【正在监听3333端口....】');
    }
});


// 客户端链接处理的函数
function clientConnected( socket ){
    console.log(`[${socket.remoteAddress}]有客户端链接...`);

    socket.write('你好啊');
}

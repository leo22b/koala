

const net = require('net');

// 端口号
const port = 2017;


// 创建服务，绑定端口，绑定ip，并监听
const server = net.createServer(clientConnected).listen(port, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(`【正在监听${port}....】`);
    }
});


// 链接处理函数
let index = 0;
function clientConnected(c) {
    console.log(`【第${++index}个链接: ${c.remoteAddress}】`);

    // 给客户端发送数据
    // c.write('【success....】');


    // 接收到客户端发来的数据
    c.on('data', (chunk) => {
        console.log(`客户端: ${chunk.toString().trim()}`);
        
        // 回复客户端
        c.write('逗逼别说话...');
    });
}



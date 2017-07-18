

const net = require('net');

// 服务器端口号
const port = 2017;
// 服务器IP
const ip = '192.168.1.112';

// 创建链接
const client = net.createConnection({port: port, host: ip}, () => {

    // 往服务器发送数据
    client.write('hello');
});


// 接收到数据触发
client.on('data', (chunk) => {
    console.log('服务端:' + chunk.toString());
});


// 获取输入的内容  --> 发送给服务器
process.stdin.on('data', (chunk) => {
    // console.log('已经获取到:' + chunk);

    // 发送给服务器
    client.write(chunk);
});

const net = require('net');
const PORT = 1234;
const IP = '0.0.0.0'


// 创建服务
const server = net.createServer(clientConneted).listen(PORT, IP, (err) =>{
    if(err){ 
        throw err; 
    } else { 
        console.log(`服务开启，监听端口成功[端口号:${PORT}]。`);
    }
});


// 客户端链接处理
function clientConneted(socket){
    console.log('客户端: ' + socket.remoteAddress);

    /* 制定协议
    
        协议方式1 --- 字符串 【数据结构不明朗，但实际开发中更多选择都是这种方式】
        状态|类型|谁发的|发给谁|消息
        例如: 200|broadcast|broadcastaaa|all|大家好

        协议方式2 --- json 【数据结构明朗】
        {
            status: '',
            type: '',
            from: '',
            to: '',
            message: ''
        }

        {   // 系统消息
            status: 200,    // 成功
            type: 'system', // 系统消息
            from: 'server', // 系统发送
            to: 'all',      // 所有用户
            message: 'xxx'  // 具体消息内容
        }
        {   // 用户消息 --- 群聊
            status: 200,       // 成功
            type: 'broadcast', // 群聊消息
            from: '张三',       // 张三
            to: 'all',         // 所有用户
            message: 'xxx'     // 具体消息内容
        }
        {   // 用户消息 --- 单聊
            status: 200,    // 成功
            type: 'p2p',    // 单聊
            from: '张三',    // 张三
            to: '李四',      // 李四
            message: 'xxx'  // 具体消息内容
        }
        {   // 错误消息
            status: 404,       // 失败
            type: 'system',    // 系统
            from: 'server',    // 张三
            to: 'all',         // 
            message: 'xxx'     // 具体消息内容
        }
    */

    // 提示链接成功
    let sendMessage = {
        status: 200,
        type: 'system',
        from: 'server',
        to: 'all',
        message: '链接服务器成功'
    };
    // 将json对象转为字符串
    socket.write( JSON.stringify(sendMessage) );

    // 接收到客户端的信息
    socket.on('data', (chunk) => {
        console.log(chunk.toString());
    });

}

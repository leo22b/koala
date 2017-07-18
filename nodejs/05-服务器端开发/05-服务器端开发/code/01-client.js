

const net = require('net');
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 读取输入的用户名
rl.question('请输入你的用户名(回车后自动登录): ', (answer) => {

    // 用户名
    const username = answer.toString();

    // 创建链接
    const client = net.createConnection(1234, '192.168.1.112', () => {
        // 接收服务端信息
        /*
        {   // 系统消息
            status: 200,    // 成功
            type: 'system', // 系统消息
            from: 'server', // 系统发送
            to: 'all',      // 所有用户
            message: 'xxx'  // 具体消息内容
        }
        */
        client.on('data', (chunk) => {
            // 获取到服务器的数据
            const dataSouce = JSON.parse(chunk.toString());

            switch (dataSouce.type) {
                case 'system':  // 系统消息
                    console.log(`
                        【系统公告: ${dataSouce.message}】
                    `);
                    rl.setPrompt('> ');
                    rl.prompt();
                    break;

                default:
                    break;
            }
        });

        // 发送(有内容才发送)
        /*
         {   // 用户消息 --- 群聊
            type: 'broadcast', // 群聊消息
            from: '张三',       // 张三
            to: 'all',         // 所有用户
            message: 'xxx'     // 具体消息内容
        }
        */
        let sendMessage = { // 群聊消息
            type: 'broadcast',
            from: username,
            to: 'all',
            message: ''
        };
        rl.on('line', (line) => {
            sendMessage.message = line.trim();
            client.write( JSON.stringify(sendMessage) );
            rl.prompt();
        })
    });
});


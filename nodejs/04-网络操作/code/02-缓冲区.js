

// 创建缓冲区，并指定大小
var buff1 = new Buffer(4);

// var buff1 = new Buffer( 'hello world' );



// 往缓冲区中写入数据
buff1.write('hello');

console.log(buff1.toString());


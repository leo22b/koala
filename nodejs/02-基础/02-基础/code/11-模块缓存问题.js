// 方式1
// setInterval(() => {

//     const modu = require('./module/05-module.js');
//     // 输出的时间都是不回变的 --- 模块是有缓存

//     // 函数调用，返回值
//     console.log(modu().time);

// }, 1000);




setInterval(() => {

    const modu = require('./module/05-module.js');
    // 输出的时间都是不回变的 --- 模块是有缓存

    console.log( modu.gettime().time );

}, 1000);

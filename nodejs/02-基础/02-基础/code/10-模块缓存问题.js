

// const modu = require('./module/04-module.js');

// 缓存
// setInterval(()=> {
//     const modu = require('./module/04-module.js');
//     // 输出的时间都是不回变的 --- 模块是有缓存
//     console.log(modu.time);
// }, 1000);





// 缓存解决
// var arr = Object.keys(require.cache); // 返回的是数组
// console.log(arr);

setInterval(() => {

    // 清理缓存
    Object.keys(require.cache).forEach( (key)=>{
        delete require.cache[key];
    } );

    const modu = require('./module/04-module.js');
    // 输出的时间都是不回变的 --- 模块是有缓存
    console.log(modu.time);

}, 1000);
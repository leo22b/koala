

const fs = require('fs');
const path = require('path');


// fs.stat(path.join(__dirname, 'github.css'), (err, stats) => {
//     if(err) throw err;

//     // console.log('文件存在');
//     console.log( stats.isDirectory() );
// });




// 重命名 文件
// fs.rename(path.join(__dirname, 'test.txt'), path.join(__dirname, 'hello.txt'), (err) => {
//     if(err){
//         throw err;
//     } else {
//         console.log('修改成功');
//     }
// });


// 重命名 文件夹
// fs.rename(path.join(__dirname, 'temp'), path.join(__dirname, 'temp1'), (err) => {
//     if(err){
//         throw err;
//     } else {
//         console.log('修改成功');
//     }
// });


// 文件移动
// /code/hello.txt  ==> /code/temp/hello.txt
// fs.rename(path.join(__dirname, 'hello.txt'), path.join(__dirname, 'temp/hello.txt'), (err) => {
//     if(err){
//         throw err;
//     } else {
//         console.log('修改成功');
//     }
// });



// 删除文件
// fs.unlink(path.join(__dirname, 'temp1/hello.txt'), (err) => {
//     if(err){ 
//         throw err; 
//     } else {
//         console.log('删除文件成功');
//     }
// });


// 创建目录
// fs.mkdir(path.join(__dirname, 'temp'), (err) => {
//     if(err){ 
//      throw err; 
//     } else { 
//         console.log('创建成功');
//     }
// });


// 删除空目录
// fs.rmdir(path.join(__dirname, 'temp'), (err) => {
//     if(err){ 
//      throw err; 
//     } else { 
//      console.log('删除目录成功'); 
//     }
// });


// 读取一个目录
// fs.readdir(__dirname, (err, files) => {
//     if(err){ 
//      throw err; 
//     } else { 
//      console.log(files); 
//     }
// });

// 客户端请求获取图片文件
let imagenames = [];
fs.readdir(path.join(__dirname, '../img'), (err, files) => {
    if(err){ 
        throw err; 
    } else { 
        // console.log(files); 

        // 只需要.jpg类型图片
        files.forEach( (file) => {
            if( path.extname(file) === '.jpg' ){
                console.log(file);

                // 添加到数组中
                imagenames.push(file);

                // 发送给客户端
            }
        } );
    }
});




// ES6 --- let声明变量
// var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined
// console.log(a); // undefined
var a = 10;


// let: 必须先定义后使用 【不会有变量提升】
// console.log(b); //b is not defined
// 声明一个变量
let b = 20;



//  let 所声明的变量，只在let命令所在的代码块内有效。
{
    let c = 30;
    var d = 40;
}
// console.log(d); // 40
// console.log(c); // c is not defined



// ES6 --- const常量(定义好之后不能被修改，定义时必须要进行初始化)
// var PI = 3.14;
// PI = 3;
// console.log(PI);

const pi = 3.14;
// pi = 3;  // TypeError: Assignment to constant variable.
// console.log(pi);

// const zhangsan; // 没有初始值
//zhangsan = 'zc';    // SyntaxError: Missing initializer in const declaration

const page = {
    jquery: '3.2.1'
};
page.jquery = '1.12.0';
page.haha = '123';
// console.log(page);





// ES6 --- 箭头函数(将function去掉，在第一个花括号之前添加‘=>’)
// var log = function(){
//     console.log('hello');
// }
// var log = ()=>{
//     console.log('hello');
// }
// log();


// var log = function(message){
//     console.log(message);
// }
var log = (message) => {
    console.log(message);
}



// ES6 --- 模版字符串(可以换行)
// var html = '<ul> <li> <a>首页</a> </li><li> <a>首页</a> </li><li> <a>首页</a> </li><li> <a>首页</a> </li><li> <a>首页</a> </li><li> <a>首页</a> </li> </ul>';
var html = `
    <ul>
        <li>
            <a>首页</a>
        </li>
        <li>
            <a>首页</a>
        </li>
        <li>
            <a>首页</a>
        </li>
        <li>
            <a>首页</a>
        </li>
    </ul>
`;
// console.log(html);

var num1 = 9;
var num2 = 20;
// console.log(num1 + '+' + num2 + '=' + (num1+num2));
console.log(` ${num1} + ${num2} = ${num1+num2} `);
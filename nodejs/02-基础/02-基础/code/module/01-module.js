

// 模块内是独立的作用域

function sum(a, b){
    return a + b;
}

// 没有导出的成员 --- 私有
function test(){
    console.log('你能调用吗？');
}



// 导出成员
module.exports = {sum};

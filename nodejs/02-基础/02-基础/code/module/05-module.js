


// 方式1
// module.exports = () => {
//     // 函数调用，才会给返回值，如果不调用，没有
//     return {'time': new Date()};
// };


function gettime(){
    return  {'time': new Date()};
}


// exports.gettime = gettime;

module.exports = {gettime};
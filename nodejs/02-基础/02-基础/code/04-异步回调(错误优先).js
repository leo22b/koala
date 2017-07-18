

// 回调函数参数： 错误优先
// 回调函数作为参数，都是最后一个参数


// (sum, err) => { console.log(sum);}
// 错误优先
compute('afdsf', (err, sum) => {
    console.log(sum);
});


// setTimeout(fn, time );
// function compute(callback ,index)
// 回调函数作为参数，都是最后一个参数
function compute(index, callback){
    var sum = 0;
    for(var i=0; i<index; i++){
        sum += i;
    }

    callback(sum);
}


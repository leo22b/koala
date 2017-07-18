

// 任务1
speak('早上好');


// 任务2
console.time('dragview');
setTimeout(()=>{
     var a = compute(1000000000);
     console.log(a);
}, 0);
console.timeEnd('dragview');


// 任务3
speak('晚上好');



function speak(message){
    console.log(message);
}

function compute(index){
    var sum = 0;
    for(var i=0; i<index; i++){
        sum += i;
    }

    // 表示计算完成
    return sum;
}
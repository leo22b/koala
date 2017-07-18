// 任务1
speak('hello world!');


// 任务2
console.time('dragview');
// 将耗时操作，添加到任务队列中的最后
setTimeout(function() {
    dragview();
}, 0);
console.timeEnd('dragview');

// 任务3
speak('拜拜');




function speak(message){
    console.log(message);
}


function dragview(){
    // 耗时操作
    for(var i=0; i<1000000000; i++)[

    ]
}
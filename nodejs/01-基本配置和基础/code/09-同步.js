
// 同步 -- 任务依次执行
// 任务1 -> 任务2 -> 任务3

// 任务1
speak('hello world!');


// 任务2
console.time('dragview');
dragview();
console.timeEnd('dragview');

// 任务3
speak('拜拜');



function speak(message){
    console.log(message);
}


function dragview(){
    // 耗时操作
    for(var i=0; i<100000000; i++)[

    ]
}
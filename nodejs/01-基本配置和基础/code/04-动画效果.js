
// 不断的在终端中重复： 输出字符画 、擦除字符画
var frames = [];
frames[frames.length] = `
┬┴┬┌─　●─┬─　　│─┼─┐　●├─┤○
┴┬┴├┬　┌─┼─　│◎　│　│　○└┬┘●
─┼─││　│　│　　││─┴─┴　──┼──
●│○││　┴─┼─　　│○　　●　／　│　＼
`;
frames[frames.length] = `
 /'　\\\\　　 //\\\\ 
　　　\\\\　 //　\`\\ 
　　　 \\\\ //           祝你：
　　　.-'^'-. 
　　.' a___a \`.           春节愉快 合家欢乐！
　 ==　(___)　== 
　　'. ._I_. .'           心想事成 红包拿来！
____\/.\`-----'.\\____ 
   [###(__)####             
`;
frames[frames.length] = `
                  ,;,,;
                 ,;;'(    马
       __      ,;;' ' \\   ┇
    /'  '\\'~~'~' \\ /'\\.)  到 
 ,;(      )    /  |.      ┇
,;' \\    /-.,,(   ) \\     成
     ) /       ) / )|     ┇ 
     ||        ||  \\)     功
     (_\\       (_\\
`;


var index = 0;
setInterval(function(){

    // 擦除字符画 (清空控制台)
    process.stdout.write('\033[2J');
    process.stdout.write('\033[0f');

    // 输出字符画
    process.stdout.write(frames[index]);

    index++;
    if(index >= frames.length){
        index = 0;
    }

}, 500);


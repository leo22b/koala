

const path = require('path');
const fs = require('fs');


fs.watchFile(path.join(__dirname, 'test1.txt'), {interval: 1000},(curr, prev) => {
    console.log('旧版本:' + prev.mtime);
    console.log('新版本:' + curr.mtime);
});

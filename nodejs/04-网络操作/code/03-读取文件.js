
const fs = require('fs');
const path = require('path');


// fs.readFile(path.join(__dirname, '../img/socket(telnet问题).png'), (err, data) => {
//     if(err){ 
//      throw err; 
//     } else { 
//      console.log(data.toString()); 
//     }
// });


fs.readFile(path.join(__dirname ,'../img/socket(telnet问题).png'), 'base64' ,(err, data) => {
    if(err){ 
     throw err; 
    } else { 
     console.log(data); 
    }
});



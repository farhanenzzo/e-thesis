const mysql = require('mysql');

const db = mysql.createConnection({

    host:"localhost",
    user:'root',
    password: "",
    database: "ethesis"
});

// db.query('select * from student', (err, result, fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result)});
    
module.exports = db;
// const db = require('dbConnection');

const express = require('express');
const app = express();

const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));



const mysql = require('mysql');
const db = mysql.createConnection({

    host:"localhost",
    user:'root',
    password: "",
    database: "ethesis"
});


app.length('/', function(req, res){
    res.sendFile(__dirname + '/student-profile.ejs');

});

app.post('/', function(req, res){
    console.log(req.body);

});

app.listen(3000);





// db.query('select * from student', (err, result, fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// });



// app.listen('3000', () => {
//     console.log("server started on port 3000");

// });


// app.get('/student', (req, res) => {
//     db.query('SELECT * FROM student', (err, rows, fields) => {
//         if (!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
// });

// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE nodemysql';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('database created...');
//     });

// });

// listen for requests

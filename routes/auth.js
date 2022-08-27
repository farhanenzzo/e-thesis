const express = require('express');

const router = express.Router();

const mysql = require('mysql'); 
const db = mysql.createConnection({

    host:"localhost",
    user:'root',
    password: "",
    database: 'ethesis'
});


router.get('/login', (req, res) => {
    console.log("/login || get " + req.session.userid);

    const query = 'select * from student where gsuite = ?';
    
    if (req.session.userid) {
        db.query(query, [req.session.userid], (err, rows) => {
            if(err) throw err;
    
            console.log("/login || get inside: " + req.session.userid);
    
            res.render('studentDetails', {student: rows[0], title: 'studentDetails'});
        });    
    } else {
        res.render('login', { title: 'Login' });   
    }
});


router.post('/login', (req, res) => {

    var type = "";


    const query = 'select * from login where email = ? and password = ?';


    db.query(query, [req.body.email, req.body.password], (err, rows) => {
        if(err) throw err;

        if(rows.length == 1) {


            if (req.body.email.includes('@g.bracu')) {
                type = 'student';

                // const query = 'select * from student where gsuite = ?';
                req.session.userid = req.body.email;
                req.session.type = type;

                console.log (req.session.type);

                res.render('index', {type: type, title: 'Home'});

    
                // db.query(query, [req.body.email], (err, rows) => {
                //     if(err) throw err;
    
                //     req.session.userid = req.body.email;
                //     req.session.type = req.body.type;
                //     // console.log("/login || post: " + req.session);
                //     // console.log("/login || post: " + req.session.userid);
    
                //     res.render('studentDetails', {student: rows[0], title: 'studentDetails'});
                // });

            } else {
                type = 'faculty';
            
                // const query = 'select * from faculty where email = ?';
                req.session.userid = req.body.email;
                req.session.type = type;
                
                console.log (req.session.type);

                res.render('index', {type: type, title: 'Home'});
    
                // db.query(query, [req.body.email], (err, rows) => {
                //     if(err) throw err;
    
                //     req.session.userid = req.body.email;
                //     req.session.type = req.body.type;
                //     res.render('facultyDetails', {faculty: rows[0], title: 'facultyDetails'});
                // });
    
            }
            
        } else {
            res.redirect("/login");

        }

        // console.log(req.body.email.includes('@g.bracu'));

       
    });
});

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/login');
});
  
// ------------ register info stored in database -------------------- 

router.get('/register', (req, res) => {
res.render('register', { title: 'register' });
});


router.post('/register', (req, res) => {

    const query = `INSERT INTO login(email, password) VALUES(?,?)`;

    db.query(query, [req.body.email, req.body.password], (err, row) => {
        console.log(err);
    });

    res.redirect("/login");

});











module.exports = router;
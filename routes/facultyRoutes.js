const express = require('express');

const router = express.Router();

const mysql = require('mysql'); 
const db = mysql.createConnection({

    host:"localhost",
    user:'root',
    password: "",
    database: "ethesis"
});


router.get('/faculty-profile', (req, res) => {
    res.render('faculty-profile', { title: 'faculty-profile' });
  
});

router.post('/faculty-profile', (req, res) => {

    const query = `INSERT INTO faculty(initial_name, full_name, email, room_number, bio, research_interest, role,  available_status, type) VALUES(?,?,?,?,?,?,?,?,?)`;

    db.query(query, [req.body.initial_name, req.body.full_name, req.body.email, req.body.room_number,  req.body.bio, req.body.research_interest, req.body.role,  req.body.available_status, req.body.type], (err, row) => {
        console.log(err);
    });

    res.redirect("/facultyList");

});

router.get('/facultyList', (req, res) => {
    const query = "SELECT * FROM faculty";
  
    db.query(query, (err, rows) => {
      if(err) throw err;
  
      res.render('facultyList', {faculties: rows, title: 'facultyList'});
    });
});



router.get('/facultyDetails/:initial_name', (req, res) => {

    const initial_name = req.params.initial_name;
    const query = 'select * from faculty where initial_name = ?';

    db.query(query, [initial_name], (err, rows) => {
        if(err) throw err;

        res.render('facultyDetails', {faculty: rows[0], title: 'facultyDetails', type:req.session.type});
    });
});

router.get('/updatefaculty/:initial_name', (req, res) =>{

    const initial_name = req.params.initial_name;
    const query = `select * from faculty where initial_name = ?`;
  
    db.query(query, [initial_name], (err, rows) => {
      if(err) throw err;
  
      res.render('updateFaculty', {title:'updateFaculty', action:'edit', faculty: rows[0]});
    });
  
});

router.post('/updatefaculty/:initial_name', (req, res) =>{
    const initial_name = req.params.initial_name;

    const query = `update faculty SET full_name = ?, email = ? , room_number = ?, bio = ?, research_interest = ?, role = ?,  available_status = ?, type = ?  where initial_name = ?`;
  
    db.query(query, [req.body.full_name, req.body.email, req.body.room_number,  req.body.bio, req.body.research_interest, req.body.role,  req.body.available_status, req.body.type, initial_name], (err, rows) => {
      if(err) throw err;

    });
    res.redirect("/index");
  
});
  

router.get('/facutly/notify', (req, res) =>{

    const email = req.session.userid;
    const query = 'SELECT g.id, g.s1, g.s2, g.s3, g.s4, g.s5 FROM faculty f ' 
    + ' JOIN groups g on g.faculty_initial = f.initial_name' 
    + ' where f.email = ?';
  
    db.query(query, [email], (err, rows) => {
      if(err) throw err;
  
      console.log(rows);

      res.render('faculty-notify', {title:'faculty notification', notifications: rows});
    });
  
});

module.exports = router;
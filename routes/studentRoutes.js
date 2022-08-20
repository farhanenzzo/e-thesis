const express = require('express');

const router = express.Router();

const mysql = require('mysql'); 
const db = mysql.createConnection({

    host:"localhost",
    user:'root',
    password: "",
    database: "ethesis"
});

router.get('/student-profile', (req, res) => {
    res.render('student-profile', { title: 'student-profile' });
});


router.post('/student-profile', (req, res) => {

    const query = `INSERT INTO student(id, name, department, gsuite, attempted_credit, earned_credit, completed_semester, current_cgpa) VALUES(?,?,?,?,?,?,?,?)`;

    db.query(query, [req.body.id, req.body.name, req.body.department, req.body.email, req.body.a_credit, req.body.e_credit, req.body.a_credit, req.body.cgpa], (err, row) => {
        console.log(err);
    });

    res.redirect("/studentList");

});


router.get('/studentList', (req, res) => {
    const query = "SELECT * FROM student";
  
    db.query(query, (err, rows) => {
      if(err) throw err;
  
      res.render('studentList', {students: rows, title: 'studentList'});
    });
});


router.get('/studentDetails/:id', (req, res) => {

    const id = req.params.id;
    const query = 'select * from student where id = ?';

    db.query(query, [id], (err, rows) => {
        if(err) throw err;

        res.render('studentDetails', {student: rows[0], title: 'studentDetails'});
    });
});



// ------- edit/update student list -------

router.get('/updateStudent/:id', (req, res) =>{

    const id = req.params.id;
    const query = `select * from student where id = ?`;
  
    db.query(query, [id], (err, rows) => {
      if(err) throw err;
  
      res.render('updateStudent', {title:'updateStudent', action:'edit', student: rows[0]});
    });
  
});
  
router.post('/updateStudent/:id', (req, res, next) =>{

    const id = req.params.id;
  
    const s_id = req.body.id;
    const name = req.body.name;
    const department = req.body.department;
    const gsuite = req.body.gsuite;
    const attempted_credit = req.body.attempted_credit;
    const earned_credit = req.body.earned_credit;
    const completed_semester = req.body.completed_semester;
    const current_cgpa = req.body.current_cgpa;
  
    const query = `update student set
    s_id = '${s_id}', 
    name = '${name}',
    department = '${department}',
    gsuite = '${gsuite}',
    attempted_credit = '${attempted_credit}',
    earned_credit = '${earned_credit}',
    completed_semester = '${completed_semester}',
    current_cgpa = '${current_cgpa}',`;
  
    db.query(query, (err, rows) => {
      if(err) throw err;
  
      res.redirect('/studentList');
    });
  
});


module.exports = router;


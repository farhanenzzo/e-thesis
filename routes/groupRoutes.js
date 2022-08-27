

const { response } = require('express');
const express = require('express');

const router = express.Router();

const mysql = require('mysql'); 
const db = mysql.createConnection({

    host:"localhost",
    user:'root',
    password: "",
    database: "ethesis"
});





router.get('/group-form1', (req, res) => {

    const query = 'SELECT DISTINCT(research_interest) from faculty';

    db.query(query, (err, rows) => {
        if(err) throw err;

        console.log(rows);

        res.render('group-form1', {topics: rows, title: 'group-form1' });
    });
    
});
  
router.post('/group-form1', (req, res) => {

    const query = 'select * from faculty where research_interest = ? and available_status = ?';

    db.query(query, [req.body.topic, req.body.slot], (err, rows) => {
        if(err) throw err;

        res.render('group-form2', {faculty: rows, title: 'group-form2'});
    });
    
});

  
  
router.get('/group-form2', (req, res) => {
    res.render('group-form2', { title: 'group-form2' });
});


router.post('/group-form2', (req, res) => {

    console.log("print group form 2");

    const query = `INSERT INTO groups(s1, s2, s3, s4, s5, faculty_initial, request_note) VALUES(?,?,?,?,?,?,?)`;

    db.query(query, [req.body.s1, req.body.s2, req.body.s3, req.body.s4, req.body.s5, req.body.faculty_initial, req.body.request_note], (err, row) => {
        if (err) throw err;

        console.log("insert id: " + row.insertId);
        const group_id = row.insertId;
        
        updateStudent(req.body.s1, group_id);
        updateStudent(req.body.s2, group_id);
        updateStudent(req.body.s3, group_id);
        updateStudent(req.body.s4, group_id);
        updateStudent(req.body.s5, group_id);

        
    });
 
    res.redirect("/");

});

function updateStudent(studentId, groupId) {
    if (studentId) {
        const query = "UPDATE student set group_id = ? where id = ?";
        db.query(query, [groupId, studentId], (err, rows) => {
            if (err) throw err;

            console.log("updated student " + studentId);
        });
    }
}

router.post('/student-profile', (req, res) => {

    const query = `INSERT INTO student(id, name, department, gsuite, attempted_credit, earned_credit, completed_semester, current_cgpa) VALUES(?,?,?,?,?,?,?,?)`;

    db.query(query, [req.body.id, req.body.name, req.body.department, req.body.email, req.body.a_credit, req.body.e_credit, req.body.a_credit, req.body.cgpa], (err, row) => {
        console.log(err);
    });

    res.redirect("/studentList");

});


  

module.exports = router;


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
    res.render('group-form1', { title: 'group-form1' });
});
  
router.post('/group-form1', (req, res) => {

    console.log(req.body.topic);

    console.log(req.body.slot);

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

    console.log(req.body.topic);

    console.log(req.body.slot);
 
    res.render('group-form2' , {title: 'group-form1' });

});

  

module.exports = router;
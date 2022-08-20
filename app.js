const express = require('express');
const app = express();

const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');

app.listen(process.env.PORT || 5000);

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

const mysql = require('mysql'); 
const db = mysql.createConnection({

    host:"localhost",
    user:'root',
    password: "",
    database: "ethesis"
});


app.get('/', (req, res) => {

  res.render('index', { title: 'Home' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'register' });
});


app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});


app.get('/thesis-group', (req, res) => {
  res.render('thesis-group', { title: 'thesis-group' });
});


app.use(studentRoutes);
app.use(facultyRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
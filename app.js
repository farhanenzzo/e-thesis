const express = require('express');
const app = express();
const cookie = require('cookie-parser');
const dotenv = require('dotenv');
// dotenv.config({path: './.env'});
const session=require('express-session');

app.set('view engine', 'ejs');
app.listen(process.env.PORT || 5000);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookie());

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const authRoutes = require('./routes/auth');
const group = require('./routes/groupRoutes');

const mysql = require('mysql'); 
const db = mysql.createConnection({

    host:"localhost",
    user:'root',
    password: "",
    database: "ethesis"
});

db.connect((err) => {
  if(err){
    console.log(err)
  }else{
    console.log("MYsqL Connected..")

  }
})


app.get('/', (req, res) => {

  res.render('login', {type: req.session.type, title: 'Login' });
});

app.get('/index', (req, res) => {

  res.render('index', {type: req.session.type, title: 'Home' });
});





app.get('/faculty-notify', (req, res) => {

  res.render('faculty-notify', {title: 'faculty-notify' });
});

app.use('/assets', express.static('assets'));




app.use(studentRoutes);
app.use(facultyRoutes);
app.use(authRoutes);
app.use(group);



// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
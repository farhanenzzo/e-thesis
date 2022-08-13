const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.get('/', (req, res) => {
  const blogs = [
   
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/student-profile', (req, res) => {
  res.render('student-profile', { title: 'student-profile' });
});

app.get('/faculty-profile', (req, res) => {
  res.render('faculty-profile', { title: 'faculty-profile' });
});

app.get('/register-student', (req, res) => {
  res.render('register-student', { title: 'register-student' });
});


app.get('/register-faculty', (req, res) => {
  res.render('register-faculty', { title: 'register-faculty' });
});

app.get('/thesis-group', (req, res) => {
  res.render('thesis-group', { title: 'thesis-group' });
});




// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
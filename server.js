const express = require('express'); 
const hbs = require('hbs');
const helpers = require('./utils/helpers');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
})

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to some website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle'
    });
});

app.listen(3000, () => {
    console.log('Server up on port: 3000');
});
// Configuración de Express

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const hbs = require('express-handlebars'); 

// Handlebars middleware

app.engine('.hbs', hbs({
    defaultLayout: 'main',
    extname : '.hbs'
}));


app.set('view engine', '.hbs'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


module.exports = app; 
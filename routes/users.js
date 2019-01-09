const express = require('express');
const Router = express.Router();


const { signUp, signIn } = require('../controllers/Auth');

const  { isAuth}  = require('../middlewares/Auth');

Router.get('/signup', (req, res) => {
    res.status(200)
        .send({
            message : "Welcome"
        })
});

Router.post('/signup', signUp);

Router.get('/signin', (req, res) => {
    res.status(200)
        .send({
            message: "Welcome Again"
        })
});

Router.post('/signin', signIn);


Router.get('/private', isAuth, (req, res) => {
    
    res.status(200).send({
        message : 'Tienes acceso'
    })
})

Router.get('/login', (req, res) => {
    res.render('login')
})


module.exports = Router; 
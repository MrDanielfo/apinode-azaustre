const mongoose = require('mongoose');

// Modelo
require('../models/User');
const User = mongoose.model('users');

// Requerir servicio

const { createToken }  = require('../services/index');

function signUp (req, res) {
    const user = {
        email : req.body.email,
        displayName : req.body.displayName,
        password : req.body.password
    }

    new User(user)
      .save()
      .then(user => {
        res
          .status(200)
          .send({
            message: 'User signed Up successfully',
            token: createToken(user)
          });
          
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: 'User can not sign up', error: err });
      });   
}

function signIn(req, res) {
    User.find({email : req.body.email })
        .then(user => {
            if(!user) {
              res
                .status(404)
                .send({ message: 'It seems that the user does not exist', error: err });
            } else {
              req.user = user
              res
                .status(200)
                .send({
                  message: 'Logged successfully',
                  token: createToken(user)
                });
            }
        })
        .catch(err => {
          res
            .status(500)
            .send({ message: 'There is a problem', error: err });
        })
}

module.exports = {
    signUp,
    signIn
}

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs'); 
const crypto = require('crypto-js'); 

const UserSchema = new Schema({
    email : {
        type: String,
        unique : true,
        lowercase : true
    }, 
    displayName : {
        type: String,
        required: true
    },
    avatar : {
        type : String
    },
    password : {
        type : String,
        select : false
    },
    signupDate : {
        type : Date,
        default : Date.now()
    },
    lastLogin : {
        type : Date
    }

});

// Funcionalidades de Mongoose 

UserSchema.pre('save', function (next)  {
    let user = this

    if(!user.isModified('password')) {
        return next()
    }

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) return next(err)

            user.password = hash
            next()
        })
    })
})

UserSchema.methods.gravatar = function() {
    if(!this.email) {
        return `https://gravatar.com/avatar/?s=200&d=retro`
    }

    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`

}


const User = mongoose.model('users', UserSchema);

module.exports = {
    User
}
const jwt = require('jwt-simple'); 
const moment = require('moment'); 

const secret = require('../config/secret_token');

function createToken(user) {
    // Se crea un objeto payload

    const payload = {
        sub : user._id,
        iat : moment().unix(),
        exp : moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, secret.SECRET_TOKEN )
}

function decodeToken(token) {

    const decoded = new Promise((resolve, reject) => {

        try {
            const payload = jwt.decode(token, secret.SECRET_TOKEN)

            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'Token has expired'
                })
            }

            resolve(payload.sub)
       
        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid token'
            })
        }

    })
    
    return decoded; 
}

module.exports = {
    createToken,
    decodeToken
}
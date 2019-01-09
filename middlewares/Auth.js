
// importar el servicio 

const { decodeToken } = require('../services/index');

function isAuth(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).send({
                message: "You are not authorized"
        })
    }

    const token = req.headers.authorization.split(' ')[0]
    decodeToken(token)
        .then(token => {
            req.user = token;
            next()
        })
        .catch(err => {
            res.status(500).send({message: err})
        })

    
} 


module.exports = {
    isAuth
}
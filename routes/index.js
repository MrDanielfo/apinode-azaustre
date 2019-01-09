const express = require('express');
const Router = express.Router(); 

// creando la carpeta Controller, los modelos se llaman en dicha carpeta 

// requerir Controlador 

const {getProduct, getProducts, updateProduct, deleteProduct, addProduct } =   require('../controllers/Product');

const { isAuth } = require('../middlewares/Auth');

Router.get('/', (req, res) => {
    res.render('products'); 
});


Router.get('/product', getProducts)

// También se pueden colocar JSon dentro del send()

Router.get('/product/:productId', getProduct)

Router.post('/product', isAuth, addProduct)

Router.put('/product/:productId', isAuth, updateProduct)

Router.delete('/product/:productId', isAuth, deleteProduct)


module.exports = Router; 
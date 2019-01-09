// Mongoose
const mongoose = require('mongoose');

// Modelo
require('../models/Product');
const Product = mongoose.model('products'); 

function getProduct(req, res) {
    Product.findById(req.params.productId)
            .then(productFound => {
                res
                  .status(200)
                  .send({
                    message:
                      'Product found!',
                    product: productFound
                  });
            })
            .catch(err => {
                res
                  .status(404)
                  .send({
                    message: 'Product could not be found',
                    error: err
                  });
            })
}

function getProducts(req, res) {

    Product.find()
        .sort({ date: "desc" })
        .then(products => {
            if (!products) {
                res
                    .status(200)
                    .send({ message: "We dont have products to offer to you yet!" });
            } else {
                res
                    .status(200)
                    .send({ products: products });
            }

        })
        .catch(err => {
            res.status(500).send({ message: err })
        })
}

function updateProduct(req, res) {
    Product.findById(req.params.productId)
        .then(product => {

            product.name = req.body.name;
            product.picture = req.body.picture;
            product.price = req.body.price;
            product.category = req.body.category;
            product.description = req.body.description;

            product.save()
                .then(product => {
                    res.status(200)
                        .send({
                            message: "Product was updated successfully",
                            product: product
                        })
                })
                .catch(err => {
                    res.status(500)
                        .send({
                            message: "There was a trouble with the update function",
                            error: err
                        })
                })

        })
        .catch(err => {
            res.status(500)
                .send({
                    message: "Upss there was a trouble",
                    error: err
                })
        })
}

function deleteProduct(req, res) {
    Product.deleteOne({ _id: req.params.productId })
        .then(() => {
            res
                .status(200)
                .send({
                    message: "Product deleted successfully"
                })
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Product can not be deleted or it does not exist",
                    error: err
                })
        })
}

function addProduct(req, res) {
    console.log(req.body)

    const producto = {
        name: req.body.name,
        picture: req.body.picture,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description
    }

    new Product(producto)
        .save()
        .then(productSaved => {
            res.status(200).send({ message: "Product was added successfully to the database", product: productSaved })
        })
        .catch(err => {
            res.status(500).send({ message: "Product could not be stored", error: err })
        })
}

module.exports = {
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    addProduct
}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    default:
      'https://cdn.tn.com.ar/sites/default/files/styles/1366x765/public/2016/05/03/ricardo-montaner.jpg'
  },
  price : {
      type: Number,
      default: 0
  },
  category : {
      type: String,
      enum: ['computers', 'phones', 'videogames', 'accesories']
  },
  description : {
      type: String,
      required: true
  }
});


const Product = mongoose.model('products', ProductSchema);

module.exports = {
    Product
}


const express = require('express')
const pub = express.Router()
const controllerPub = require('../controllers/Products')
const controllerCategories = require('../controllers/Categories')

pub.get('/products', controllerPub.getProducts)
pub.get('/collections', controllerPub.getProducts)
pub.get('/products/:id', controllerPub.getProductsId)
pub.get('/categories', controllerCategories.getCategories)

module.exports = pub
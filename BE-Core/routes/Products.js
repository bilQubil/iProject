const express = require('express')
const products = express.Router()
const controllerProducts = require('../controllers/Products')
const authorization = require('../middleware/authorization')

const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

products.get('/', controllerProducts.getProducts)
products.post('/', controllerProducts.postProducts)
products.get('/:id', controllerProducts.getProductsId)
products.put('/:id', authorization, controllerProducts.putProductsId)
products.delete('/:id', authorization, controllerProducts.deleteProductsId)
products.patch('/:id/imgUrl', authorization, upload.single('imgUrl'), controllerProducts.patchProductsId)

module.exports = products
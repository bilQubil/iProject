const express = require('express')
const categories = express.Router()
const controllerCategories = require('../controllers/Categories')
const authorization = require('../middleware/authorization')

categories.get('/', controllerCategories.getCategories)
categories.post('/', controllerCategories.postCategories)
categories.put('/:id', authorization, controllerCategories.putCategoriesId)

module.exports = categories
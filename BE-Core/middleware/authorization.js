const { Product, Category } = require('../models')

async function authorization(req, res, next) {
    try {
        const { id } = req.params
        if (req.originalUrl.includes('/products')){
            const products = id ? await Product.findByPk(id) : null
            if(!products) {
                throw { name: "NotFound" }
            }
            if (req.user.role === "admin") {
                return next()
            } else if (req.user.role === "user") {
                if(products.authorId !== req.user.id) {
                    throw { name: "Unauthorized" }
                }
            }
        }
        if (req.originalUrl.includes('/categories')){
            const categories = id ? await Category.findByPk(id) : null
            if(!categories) {
            throw { name: "NotFound" }
        }
        if (req.user.role === "admin") {
            return next()
        } else if (req.user.role === "user") {
            throw { name: "Unauthorized" }
        }
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authorization
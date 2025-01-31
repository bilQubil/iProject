const { Category } = require('../models')
const axios = require('axios')

class Categories {
    static async getCategories(req, res, next) {
        try {
           // Fetch products data from the API
        const response = await axios.get('https://api.escuelajs.co/api/v1/products');
        
        // Extract unique categories with their name and ID
        const categories = response.data.map((product) => ({
            id: product.category.id,
            name: product.category.name,
            image: product.category.image,
        }))
        .filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id === value.id
            ))
        );
        res.status(200).json(categories);
        } catch (err) {
            // console.log(err, '<<< error getCategories')
            next(err)
        }
    }
    static async postCategories(req, res, next) {
        try {
            const { name } = req.body
            const cat = await Category.create({
                name
            })
            res.status(201).json(cat)
        } catch (err) {
            next(err)
        }
    }
    static async putCategoriesId(req, res, next) {
        try {
            const { id } = req.params
            const { name } = req.body
            const cat = await Category.update({
                name
            }, {
                where: {
                    id
                }
            })
            // if (!cat) {
            //     throw { name: "NotFound" }
            // }
            res.status(200).json(cat)
        } catch (err) {
            // console.log(err, '<<< error putCategoriesId')
           next(err)
        }
    }
}

module.exports = Categories
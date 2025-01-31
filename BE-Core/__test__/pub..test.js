const request = require('supertest')
const app = require('../app')
const { Product, User } = require('../models')

let user1
beforeAll(async () => {
    try {
         user1 = await User.create({
                email: "joni.doe@example.com",
                password: 'hashed_password_5',               
            },)
            
        const productsData = require('../data/products.json')
        await Promise.all(productsData.map(product => Product.create(product)))
    } catch (error) {
        console.error('Error setting up test data:', error)
    }
})

describe('GET /pub/products', () => {
    test(`GET /pub/products should return list of products`, async () => {
        const response = await request(app).get('/pub/products')
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        response.body.data.forEach(element => {
            expect(element).toHaveProperty('id')
            expect(element).toHaveProperty('title')
            expect(element).toHaveProperty('description')
            expect(element).toHaveProperty('price')
            expect(element).toHaveProperty('images')
            expect(element).toHaveProperty('category')
        })
    })

    test(`GET /pub/products filter should return product by category`, async () => {
        const response = await request(app).get('/pub/products?filter=1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('page', 1)
        expect(response.body).toHaveProperty('totalData')
        expect(response.body).toHaveProperty('data')
        // console.log(response.body.data, '<<< response.body.data')
        response.body.data.forEach(el => {
            // console.log(el.category.id, "<<< el.category.id")
            expect(el).toHaveProperty('category.id')
        })
    })

    test(`GET /pub/products pagination should return product by page number & size`, async () => {
        const response = await request(app).get('/pub/products?page[number]=1&page[size]=3')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('page', 1)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.length).toBeLessThanOrEqual(39)
        expect(response.body).toHaveProperty('totalData')
        expect(response.body).toHaveProperty('totalPages')
        expect(response.body).toHaveProperty('dataPerPage', 3)
    })
})

describe('GET /pub/products/:id', () => {
    test(`GET /pub/products/:id should return product by id`, async () => {
        const response = await request(app).get('/pub/products/14')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('title')
        expect(response.body).toHaveProperty('description')
        expect(response.body).toHaveProperty('price')
        expect(response.body).toHaveProperty('images')
        expect(response.body).toHaveProperty('category')
    })

    test(`GET /pub/products/:id should fail (wrong id)`, async () => {
        const response = await request(app).get('/pub/products/1000')
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
    })
})
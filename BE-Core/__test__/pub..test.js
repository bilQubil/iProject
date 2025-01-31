const request = require('supertest')
const app = require('../app')
const { Product, User } = require('../models')

let user1
beforeAll(async () => {
    try {
         user1 = await User.create({
                email: "joni.doe@example.com",
                password: 'hashed_password_5',
                role: 'admin',
                username: 'joni',
                phoneNumber: '1234567890',
                address: '123 Main St',
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
            expect(element).toHaveProperty('name')
            expect(element).toHaveProperty('description')
            expect(element).toHaveProperty('price')
            expect(element).toHaveProperty('stock')
            expect(element).toHaveProperty('imgUrl')
            expect(element).toHaveProperty('categoryId')
            expect(element).toHaveProperty('authorId')
        })
    })

    test(`GET /pub/products filter should return product by category`, async () => {
        const response = await request(app).get('/pub/products?filter=1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('page', 1)
        expect(response.body).toHaveProperty('totalData')
        expect(response.body).toHaveProperty('data')
        response.body.data.forEach(el => {
            expect(el).toHaveProperty('categoryId', 1)
        })
    })

    test(`GET /pub/products pagination should return product by page number & size`, async () => {
        const response = await request(app).get('/pub/products?page[number]=1&page[size]=3')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('page', 1)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.length).toBeLessThanOrEqual(3)
        expect(response.body).toHaveProperty('totalData')
        expect(response.body).toHaveProperty('totalPages')
        expect(response.body).toHaveProperty('dataPerPage', 3)
    })
})

describe('GET /pub/products/:id', () => {
    test(`GET /pub/products/:id should return product by id`, async () => {
        const response = await request(app).get('/pub/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('description')
        expect(response.body).toHaveProperty('price')
        expect(response.body).toHaveProperty('stock')
        expect(response.body).toHaveProperty('imgUrl')
        expect(response.body).toHaveProperty('categoryId')
        expect(response.body).toHaveProperty('authorId')
    })

    test(`GET /pub/products/:id should fail (wrong id)`, async () => {
        const response = await request(app).get('/pub/products/1000')
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
    })
})
const request = require('supertest')
const app = require('../app')
const { Product, User } = require('../models')
const { tokenSign } = require('../helpers/jwt')
const { use } = require('../routes')

let user1
let user2
let token1
let token2
beforeAll(async () => {
    user1 = await User.create({
        email: "joni.doe@example.com",
        password: 'hashed_password_5',
        role: 'admin',
        username: 'joni',
        phoneNumber: '1234567890',
        address: '123 Main St',
    },)
    user2 = await User.create({
        email: "jane.doe@example.com",
        password: 'hashed_password_6',
        role: 'user',
        username: 'jane',
        phoneNumber: '1234567890',
        address: '123 Main St',
    },)
    // console.log(user.id)
    token1 = tokenSign({ id: user1.id })
    token2 = tokenSign({ id: user2.id })
})
afterAll(async () => {
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
})

// 2. Test CREATE /products 
test(`POST /products should failed (no login)`, async  () => {
    const respone = await request(app)
    .post('/products')
    .send({
        name: "Product baju bibiqlo 1",
        description: "Description baju bibiqlo 1",
        price: 100000,
        stock: 10,
        imgUrl: "https://example.com/product1.jpg",
        categoryId: 1,
    })
    
    expect(respone.status).toBe(401)
    expect(respone.body).toHaveProperty('message')
})
describe('CREATE /products endpoint test', () => {
        test(`POST /products should succsessfull`, async () => {
            const respone = await request(app)
            .post('/products')
            .send({
                name: "Product baju bibiqlo 1",
                description: "Description baju bibiqlo 1",
                price: 100000,
                stock: 10,
                imgUrl: "https://example.com/product1.jpg",
                categoryId: 1,
            })
            .set( 'Authorization' ,`Bearer ${token1}`)
            // console.log(respone.body, 'responeeeeeeeeee')
            expect(respone.status).toBe(201)
            expect(respone.body).toHaveProperty('id')
            expect(respone.body).toHaveProperty('name')
            expect(respone.body).toHaveProperty('description')
            expect(respone.body).toHaveProperty('price')
            expect(respone.body).toHaveProperty('stock')
            expect(respone.body).toHaveProperty('imgUrl')
            expect(respone.body).toHaveProperty('categoryId')
        })
        test(`POST /products should failed (unvalid token)`, async  () => {
            const respone = await request(app)
            .post('/products')
            // .set('Authorization', `Bearer salah`)
            .send({
                name: "Product baju bibiqlo 1",
                description: "Description baju bibiqlo 1",
                price: 100000,
                stock: 10,
                imgUrl: "https://example.com/product1.jpg",
                categoryId: 1,
            })
            // console.log(respone.body)
            expect(respone.status).toBe(401)
            expect(respone.body).toHaveProperty('message')
        })
        test(`POST /products should failed (wrong body)`, async  () => {
            const respone = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token1}`)
            .send({
                namaBajunyaApaYaa: "Baju keren bibilQlo",
                description: "Description baju bibiqlo 1",
                price: 100000,
                stock: 10,
                imgUrl: "https://example.com/product1.jpg",
                categoryId: 1,
            })
            // console.log(respone.body)
            expect(respone.status).toBe(400)
            expect(respone.body).toHaveProperty('message')
        })
})
// 3. Test PUT /products/idnpx
describe('PUT /products endpoint test', () => {
    test(`PUT /products should failed (no login)`, async  () => {
        const respone = await request(app)
        .put('/products/1')
        .send({
            name: "Product baju bibiqlo 1",
            description: "Description baju bibiqlo 1",
            price: 100000,
            stock: 10,
            imgUrl: "https://example.com/product1.jpg",
            categoryId: 1,
            authorId: 1,
        })
        // console.log(respone.body)
        expect(respone.status).toBe(401)
        expect(respone.body).toHaveProperty('message')
    })
    test(`PUT /products should succsessfull`, async () => {
        const respone = await request(app)
        .put('/products/1')
        .set('Authorization', `Bearer ${token1}`)
        .send({
            name: "Product baju bibiqlo 1",
            description: "Description baju bibiqlo 1",
            price: 100000,
            stock: 10,
            imgUrl: "https://example.com/product1.jpg",
            categoryId: 1,
            authorId: 1,
        })
        // console.log(respone.body)
        expect(respone.status).toBe(200)
        expect(respone.body).toHaveProperty('id')
        expect(respone.body).toHaveProperty('name')
        expect(respone.body).toHaveProperty('description')
        expect(respone.body).toHaveProperty('price')
        expect(respone.body).toHaveProperty('stock', 10)
        expect(respone.body).toHaveProperty('imgUrl')
        expect(respone.body).toHaveProperty('categoryId')
    })
    test(`PUT /products should failed (invalid token)`, async  () => {
        const respone = await request(app)
        .put('/products/1')
        .set('Authorization', `Bearer salah`)
        .send({
            name: "Product baju bibiqlo 1",
            description: "Description baju bibiqlo 1",
            price: 100000,
            stock: 10,
            imgUrl: "https://example.com/product1.jpg",
            categoryId: 1,
        })
        // console.log(respone.body)
        expect(respone.status).toBe(401)
        expect(respone.body).toHaveProperty('message')
    })
    test(`PUT /products should failed (wrong id)`, async ()=> {
        const respone = await request(app)
        .put('/products/1000')
        .set('Authorization', `Bearer ${token1}`)
        .send({
            name: "Product baju bibiqlo 1000",
            description: "Description baju bibiqlo 1",
            price: 100000,
            stock: 10,
            imgUrl: "https://example.com/product1.jpg",
            categoryId: 1,
        })
        // console.log(respone.body)
        expect(respone.status).toBe(404)
        expect(respone.body).toHaveProperty('message')
    })
    test(`PUT /products should failed (wrong body)`, async  () => {
        const respone = await request(app)
        .put('/products/1')
        .set('Authorization', `Bearer ${token1}`)
        .send({
            name: "",
            description: "Description baju bibiqlo 1",
            price: 100000,
            stock: 10,
            imgUrl: "https://example.com/product1.jpg",
            categoryId: 1,
        })
        // console.log(respone.body)
        expect(respone.status).toBe(400)
        expect(respone.body).toHaveProperty('message')
    })
    test(`PUT /products should failed (User edit another user's data)`, async  () => {
        const respone = await request(app)
        .put('/products/1')
        .set('Authorization', `Bearer ${token2}`)
        .send({
            name: "Product baju bibiqlo 1",
            description: "Description baju bibiqlo 1",
            price: 100000,
            stock: 10,
            imgUrl: "https://example.com/product1.jpg",
            categoryId: 1,
            authorId: 1,
        })
        // console.log(respone.body)
        expect(respone.status).toBe(403)
        expect(respone.body).toHaveProperty('message')
    })
})
// 4. Test DELETE /products/id
test(`DELETE /products/:id should failed (no login)`, async () => {
    const respone = await request(app).delete('/products/1')
    // console.log(respone.body)
    expect(respone.status).toBe(401)
    expect(respone.body).toHaveProperty('message')
})
describe('DELETE /products/:id', () => {
    test(`DELETE /products/:id should failed (invalid token)`, async () => {
        const respone = await request(app)
        .delete('/products/1')
        .set('Authorization', `Bearer salah`)
        // console.log(respone.body)
        expect(respone.status).toBe(401)
        expect(respone.body).toHaveProperty('message')
    })
    test(`DELETE /products/:id should failed (User delete another user's data)`, async () => {
        const respone = await request(app)
        .delete('/products/1')
        .set('Authorization', `Bearer ${token2}`)
        // console.log(respone.body)
        expect(respone.status).toBe(403)
        expect(respone.body).toHaveProperty('message')
    })
    test(`DELETE /products/:id should succsessfull`, async () => {
        const respone = await request(app)
        .delete('/products/1')
        .set('Authorization', `Bearer ${token1}`)
        // console.log(respone.body)
        expect(respone.status).toBe(200)
        expect(respone.body).toHaveProperty('message')
    })
    test(`DELETE /products/:id should failed (wrong id)`, async () => {
        const respone = await request(app)
        .delete('/products/1000')
        .set('Authorization', `Bearer ${token1}`)
        // console.log(respone.body)
        expect(respone.status).toBe(404)
        expect(respone.body).toHaveProperty('message')
    })
})



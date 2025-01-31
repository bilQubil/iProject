const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const { tokenSign } = require('../helpers/jwt')

// 1. Test GET /login 
describe('/login endpoint test', () => {
    let access_token
    beforeAll(async () => {
        const user = await User.create({
            email: "joni.doe@example.com",
            password: 'hashed_password_4',
            role: 'admin',
            username: 'joni',
            phoneNumber: '1234567890',
            address: '123 Main St',
        })
        access_token = `Bearer ${tokenSign({ id: user.id, role: user.role })}`
    })
    afterAll(async () => {
        await User.destroy({
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    })
    test(`POST /login should succsessfull`, async () => {
        const respone = await request(app).post('/login').send({
            email: "joni.doe@example.com",
            password: 'hashed_password_4',
        })
        
        expect(respone.status).toBe(200)
        expect(respone.body).toHaveProperty('access_token', expect.any(String))
    })
    test(`POST /login should failed (wrong email)`, async () => {
        const respone = await request(app).post('/login').send({
            email: "dadang@example.com",
            password: 'hashed_password_4',
        })
        
        expect(respone.status).toBe(401)
        expect(respone.body).toHaveProperty('message')
    })
    test(`POST /login should failed (wrong password)`, async () => {
        const respone = await request(app).post('/login').send({
            email: "joni.doe@example.com",
            password: 'hashed_password_1_salah',
        })
        
        expect(respone.status).toBe(401)
        expect(respone.body).toHaveProperty('message', 'Error: Authentication failed. Access denied.')
    })
    test(`POST /login should failed (no email)`, async () => {
        const respone = await request(app).post('/login').send({
            email: "",
            password: 'hashed_password_1_salah',
        })
        
        expect(respone.status).toBe(400)
        expect(respone.body).toHaveProperty('message', 'Error: Email is required')
    })
    test(`POST /login should failed (no password)`, async () => {
        const respone = await request(app).post('/login').send({
            email: "john.doe@example.com",
            password: '',
        })
        
        expect(respone.status).toBe(400)
        expect(respone.body).toHaveProperty('message', 'Error: Password is required')
    })


})
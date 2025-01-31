const { User, Order } = require('../models');
const { comparePass } = require('../helpers/bcrypt');
const { tokenSign } = require('../helpers/jwt');
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const { where } = require('sequelize');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class controller {
    static async postRegister(req, res, next) {
        try {
            const { username, email, password, role, phoneNumber, address } = req.body;
            console.log( username, email, password, role, phoneNumber, address, '<<< body')
            const userNew = await User.create({
                username,
                email,
                password,                
            });

            // console.log(userNew, '<<< usernew')

            res.status(201).json({
                message: 'User registered successfully', userNew
            })
        } catch (err) {
            console.log(err.name, '<<< error controler')
            next(err)
        }
    }
    static async postLogin(req, res, next) {
       try {
       const { email, password } = req.body

        if(!email) {
            throw { name: "EmailRequired" }
        }
        if(!password) {
            throw { name: "PasswordRequired" }
        }

        console.log(email, password, '<<<')
        const user = await User.findOne({
            where: {
                email: email,
            }
        });

        console.log(user, '<<<')
        if (!user) throw { name: "Unauthenticated" };

        const isPasswordValid = comparePass(password, user.password);

        if (!isPasswordValid) throw { name: "Unauthenticated" };

        const access_token  = tokenSign({ id: user.id, role: user.role });
        console.log(access_token, '<<< access_token')

        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({
            access_token 
         })
       } catch (err) {
        console.log(err, '<<< error getLogin')
         next(err)
        } 
    }
    static async googleLogin(req, res, next) {
        try {
            const { token } = req.body;
        
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,  
            });
            
            const payload = ticket.getPayload();
            
            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email,  
                },
                defaults: {
                    username: payload.name,  
                    password: '',  
                },
            });

            // Generate JWT token
            const accessToken = tokenSign({ id: user.id, role: user.role });

            // Send the token back to the frontend
            res.json({ access_token: accessToken });
        } catch (error) {
            console.error('Google login verification failed', error);
            next(error);
        }
    }
    static async patchUserUpgrade(req, res, next) {
        try {
            const { orderId } = req.body
            
            const order = await Order.findOne({
                where: {
                    id: orderId
                }
            });
            console.log(order, '<<< order')

            const base64ServerKey = process.env.MIDTRANS_SERVER_KEY.toString('base64')
            const response = await axios.get(`https://api.sandbox.midtrans.com/v2/${orderId}/status`,{
                headers: {
                    Authorization: `Basic ${base64ServerKey}`
                }
            })
            
            res.status(200).json({
                message: 'User upgraded successfully',
            });
            // console.log(response.data, '<<< response')
        } catch (err) {
            console.log(err, '<<< error patchUserUpgrade')
            next(err)
        }
    }
}

module.exports = controller;
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET
require('dotenv').config()

function tokenSign(payload) {
    return jwt.sign(payload, SECRET)
}

function tokenVerif(token) {
    return jwt.verify(token, SECRET)
}

module.exports = { tokenSign, tokenVerif }
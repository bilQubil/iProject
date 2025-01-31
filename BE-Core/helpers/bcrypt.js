const bcrypt = require('bcryptjs')

function hashPass(password) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function comparePass(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = { hashPass, comparePass }
const { tokenVerif } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
    try {
        const headers = req.headers.authorization
        // console.log(headers, '<<< headers')
        if(!headers || !headers.startsWith('Bearer ')) {
            // throw { name: "Unauthenticated" }
        }
        const token = headers.split(' ')[1]
        // console.log(token, '<<< token')

        const decodedToken = tokenVerif(token)
        // console.log(decodedToken, '<<< decoded')
        const user = await User.findByPk(decodedToken.id)
        if(!user) {
            throw { name: "Unauthenticated" }
        }
        req.user = user 
        // console.log(user.dataValues.id, '<<< req.user')
        next()
    } catch(err) {
        next(err)
    }
}

module.exports = authentication
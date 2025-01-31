const { Model } = require("sequelize")

function isAdmin(req, res, next){
    if(req.user.role !== "admin") {
        throw { name: "Unauthorized" }
    }
    next()
}

module.exports = isAdmin
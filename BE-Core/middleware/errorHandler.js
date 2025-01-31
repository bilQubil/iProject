function errorHandler(err, req, res, next) {
    // console.log(err.name, '<<< error handler')
    if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
            message: err.errors[0].message
        })
    } else if (err.name === "EmailRequired") {
        res.status(400).json({
            message: "Error: Email is required",
        });
    } else if (err.name === "PasswordRequired") {
        res.status(400).json({
            message: "Error: Password is required",
        });
    } else if(err.name === "Unauthenticated" || err.name === "JsonWebTokenError") {
        res.status(401).json({
            message: "Error: Authentication failed. Access denied."
        })
    } else if(err.name === "Unauthorized") {
        res.status(403).json({
            message: "Error: Forbidden. You are not authorized to access this resource."
        })
    } else if(err.name === "NotFound") {
        res.status(404).json({
            message: "Error: Data not found"
        })
    } else {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
module.exports = errorHandler
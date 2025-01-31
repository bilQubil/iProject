const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/Users')
const routesPub = require('./Pub')
const authentication = require('../middleware/authentication')
const errorHandler = require('../middleware/errorHandler')
const controllerProducts = require('../controllers/Products')


router.post('/login', controllerUser.postLogin)
router.post('/google-login', controllerUser.googleLogin)
router.post('/register', controllerUser.postRegister)

router.use('/pub', routesPub)
router.post('/askme', controllerProducts.postAskMe)
router.use(authentication)
router.patch('/users-upgrade', controllerUser.patchUserUpgrade)
router.get('/api/checkout', controllerProducts.checkout)

router.use(errorHandler)

module.exports = router
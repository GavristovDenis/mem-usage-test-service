const Router = require("express")
const authController = require('../Controllers/authController')
const authRouter = new Router


authRouter.post('/login', authController.login)


module.exports = authRouter
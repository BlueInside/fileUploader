const asyncHandler = require('express-async-handler');
const prisma = require('../prisma');

const getLoginPage = asyncHandler(async (req, res, next) => {
    res.render('login')
})

const getRegisterPage = asyncHandler(async (req, res, next) => {
    res.render('register')
})

const userLogin = asyncHandler(async((req, res, next) => {
    res.send('IMPLEMENT USER LOGIN POST')
}))

const userRegister = asyncHandler(async (req, res, next) => {
    const { email: username, password, confirm_password } = req.body
    console.log('REGISTER ', username, password, confirm_password)
    res.redirect('/login')
})
module.exports = {
    getLoginPage,
    getRegisterPage,
    userLogin,
    userRegister
}
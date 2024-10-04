const asyncHandler = require('express-async-handler');

const getLoginPage = asyncHandler(async (req, res, next) => {
    res.render('login')
})

const getRegisterPage = asyncHandler(async (req, res, next) => {
    res.render('register')
})

module.exports = {
    getLoginPage,
    getRegisterPage,
}
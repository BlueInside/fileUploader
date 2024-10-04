const asyncHandler = require('express-async-handler');
const passport = require('../config/passport');
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

const getLoginPage = asyncHandler(async (req, res, next) => {
    res.render('login')
})

const getRegisterPage = asyncHandler(async (req, res, next) => {
    res.render('register')
})

const userLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
})


const userRegister = asyncHandler(async (req, res, next) => {
    const { email: username, password } = req.body

    const existingUser = await prisma.users.findUnique({
        where: { username: username }
    })

    if (existingUser) {
        // Handle error if user already exists
        return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 8)


    const newUser = await prisma.users.create({
        data: { username: username, password: hashedPassword }
    })

    // Redirect after successful registration
    res.redirect('/')
})

module.exports = {
    getLoginPage,
    getRegisterPage,
    userLogin,
    userRegister
}
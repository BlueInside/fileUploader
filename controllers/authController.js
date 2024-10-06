const asyncHandler = require('express-async-handler');
const passport = require('passport');
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

const getLoginPage = asyncHandler(async (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    res.render('login')
})

const getRegisterPage = asyncHandler(async (req, res, next) => {
    res.render('register')
})

const userLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('login', { errors: [{ msg: info.message || 'No user found with those credentials' }] })
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/')
        })

    })(req, res, next);
}




const userRegister = asyncHandler(async (req, res, next) => {
    const { email, username, password } = req.body

    const existingUser = await prisma.user.findUnique({
        where: { email: email }
    })

    if (existingUser) {
        // Handle error if user already exists
        return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 8)


    const newUser = await prisma.user.create({
        data: { email: email, username: username, password: hashedPassword }
    })

    // Redirect after successful registration
    res.redirect('/')
})

const userLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
}

module.exports = {
    getLoginPage,
    getRegisterPage,
    userLogin,
    userRegister,
    userLogout
}
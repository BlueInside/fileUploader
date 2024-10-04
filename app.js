const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const port = process.env.PORT

// Require Routes
const auth = require('./routes/auth')

// Use Routes
app.use('/', auth)

// Set up views engine and path
app.set('/views', __dirname);
app.set('view engine', 'pug');

// Middleware
app.use(session({
    cookie: { maxAge: 7 * 24 * 60 * 60 * 100 },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), { checkPeriod: 2 * 60 * 1000, dbRecordIdIsSessionId: true, dbRecordIdFunction: undefined })
}))
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('main');
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
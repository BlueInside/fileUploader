const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
require('./config/passport');

const port = process.env.PORT

// Set up views engine and path
app.set('/views', __dirname);
app.set('view engine', 'pug');

// Middleware
app.use(session({
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined
    })
}))

app.use(passport.session());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Require Routes
const auth = require('./routes/auth')
const file = require('./routes/files');

// Use Routes
app.use('/', auth)
app.use('/folders', folder)
app.use('/files', file)

app.get('/', (req, res) => {
    res.render('main');
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
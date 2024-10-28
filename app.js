const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const prisma = require('./prisma');
const asyncHandler = require('express-async-handler');
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
app.use(methodOverride('_method'));

// Require Routes
const auth = require('./routes/auth')
const file = require('./routes/files');
const folder = require('./routes/folders')

app.get('/', asyncHandler(async (req, res) => {
    const errors = req.session.errors || [];
    delete req.session.errors;

    const recentFiles = await prisma.file.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 3,
        select: {
            id: true,
            fileName: true,
            createdAt: true,
            user: {
                select: {
                    username: true
                }
            },
        }
    });

    if (!recentFiles) {
        throw new Error(`Couldn't fetch files from database.`)
    }

    let userFolders = [];

    if (req.user) {
        userFolders = await prisma.folder.findMany(
            {
                where: { userId: req.user?.id },
                select: {
                    name: true,
                    id: true
                }
            }
        )
    }

    if (userFolders.length === 0 && req.user) {
        const newFolder = await prisma.folder.create({
            data: {
                userId: req.user.id,
                name: 'Default Folder',
            }
        });

        userFolders.push(newFolder);
    }

    res.render('main', { recentFiles, userFolders, errors });
}))


// Use Routes
app.use('/', auth)
app.use('/folders', folder)
app.use('/files', file)

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
    const error = new Error('Page Not Found');
    error.status = 404;
    next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    const status = err.status || 500;
    const message = status === 500
        ? "Something went wrong. Please try again later."
        : err.message;

    res.status(status).render('error', {
        status,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
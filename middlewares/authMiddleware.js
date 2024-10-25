const prisma = require('../prisma');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // If the user is not authenticated, redirect to login page
    res.redirect('/login');
}

async function isFileOwner(req, res, next) {
    try {
        const fileId = parseInt(req.params.id, 10);

        if (isNaN(fileId)) {
            const error = new Error('Invalid file identifier!');
            error.status = 400;
            throw error;
        }

        const file = await prisma.file.findUnique({
            where: { id: fileId },
            select: {
                userId: true,
            }
        })

        if (!file) {
            const error = new Error('File not found!');
            error.status = 404;
            throw error;
        }

        if (file.userId !== req.user.id) {
            const error = new Error('Not authorized to view this file');
            error.status = 403;
            throw error;
        }

        return next();
    } catch (error) {
        return next(error);
    }
}


module.exports = { ensureAuthenticated, isFileOwner }
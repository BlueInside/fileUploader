const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const prisma = require('../prisma');

const verifyFunction = async (username, password, done) => {
    try {

        const user = await prisma.users.findUnique({
            where: { username: username }
        });

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user)
    }
    catch (err) {
        return done(err);
    }
}

passport.use(new LocalStrategy(verifyFunction))

module.exports = passport


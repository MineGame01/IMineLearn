import LocalStrategy from "passport-local"
import passport from "passport"
import {client} from "@app/api/client";
import crypto from "crypto"

passport.use(new LocalStrategy.Strategy( async (username, password, done) => {
    const db = client.db("db")
    const users = db.collection("users")

    try {
        const user = await users.findOne({ username })
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password.' })
        }
        crypto.pbkdf2(password, user.salt, 1000, 64, 'sha512', (err, hashPassword) => {
            if (err) {
                return done(err)
            }
            if (!crypto.timingSafeEqual(user.hash_password, hashPassword)) {
                return done(null, false, { message: 'Incorrect username or password.'})
            }
            return done(null, user)
        })

    } catch (err) {
        console.error("Error Authentication!", err)
        return done(err)
    }
}))
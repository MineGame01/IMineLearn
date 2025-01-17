import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import "./app/api/passport"
import { GetPostsRequestHandler } from '@feature/GetPostsRequestHandler'
import {GetPostByIdRequestHandler} from "@feature/GetPostByIdRequestHandler";
import passport from "passport";

const app = express()

const PORT: number = 5000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200)
    res.render('Hello world')
})

app.get("/login", (req, res) => {
    res.render(`
    <h1>Sign in</h1>
<form action="/login/password" method="post">
    <section>
        <label for="username">Username</label>
        <input id="username" name="username" type="text" autocomplete="username" required autofocus>
    </section>
    <section>
        <label for="current-password">Password</label>
        <input id="current-password" name="password" type="password" autocomplete="current-password" required>
    </section>
    <button type="submit">Sign in</button>
</form>
    `)
})
app.post('/login/password', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}))

app.get('/posts', GetPostsRequestHandler)
app.get('/post/:postId', GetPostByIdRequestHandler)

app.listen(PORT, () => {
    console.log(`Server started: localhost:${PORT}`)
})
import { RequestHandler } from 'express'
import { client } from '@app/api'

export const GetPostsRequestHandler: RequestHandler = async (req, res) => {
    const database = client.db('db')
    const posts = database.collection('posts')

    const allPosts = posts.find()
    const data = []
    for await (const post of allPosts) {
        data.push(post)
    }
    res.json(data)
}

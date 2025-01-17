import { RequestHandler } from 'express'
import { client } from '@app/api'
import { ErrorResponse } from '@entities/ErrorResponse'

export const GetPostByIdRequestHandler: RequestHandler = async (req, res) => {
    const db = client.db("db")
    const posts = db.collection('posts')

    const postId: unknown = req.params.postId

    if (!postId || typeof postId !== "string") {
        const STATUS_CODE = 400

        console.log(postId)
        res.status(STATUS_CODE)
        res.json(new ErrorResponse('Post ID not found!', STATUS_CODE))
        return;
    }

    try {
        const post = await posts.findOne({ id: postId })
        res.json(post)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500)
            res.json(new ErrorResponse(err.message, 500))
        }
        console.error(err)
    }
}

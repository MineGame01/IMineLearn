import { randomUUID } from 'node:crypto'

export interface IPost {
    id: string
    username: string
    created_at: string
    tags: TPostTags[]
    title: string
    content: string
}

export type TPostUsername = IPost['username']
export type TPostTitle = IPost['title']
export type TPostTags = 'javascript' | 'css' | 'html' | 'web' | 'react' | 'vue'
export type TPostId = IPost['id']
export type TPostContent = IPost['content']

export class Post implements IPost {
    username
    title
    content
    tags
    id
    created_at

    constructor(
        username: TPostUsername,
        title: TPostTitle,
        content: TPostContent,
        tags: TPostTags[],
    ) {
        this.username = username
        this.title = title
        this.content = content
        this.tags = tags

        this.id = randomUUID()
        this.created_at = new Date().toJSON()
    }
}

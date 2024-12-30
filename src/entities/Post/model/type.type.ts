import { TAuthUserId } from '@/entities/LoginModal'

export interface IPost {
    id: string
    username: string
    userimage?: string | null
    created_at: string
    tags: TPostTags[]
    title: string
    content: string
}

export interface IComment extends Pick<IPost, 'id' | 'content' | 'created_at' | 'username'> {
    post_id: TPostId
    user_id: TAuthUserId
}

export type TPostUsername = IPost['username']
export type TPostUserimage = IPost['userimage']
export type TPostTitle = IPost['title']
export type TPostTags = 'javascript' | 'css' | 'html' | 'web' | 'react' | 'vue'
export type TPostId = IPost['id']
export type TPostContent = IPost['content']

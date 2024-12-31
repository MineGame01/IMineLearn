import React from 'react'
import classNames from 'classnames'
import { Post, PostPreview } from '@/features/Post'
import { useFecthSearchPost } from '@pages/Home/api/useFecthSearchPost.ts'
import { useAppSelector } from '@/app/model'
import { selectAuthUserInfo } from '@widgets/LoginModal'

export const HomePage: React.FC = () => {
    const { data } = useFecthSearchPost()
    const userData = useAppSelector(selectAuthUserInfo)

    if (data) {
        const postsIds = data.map((post) => post.id)

        return (
            <main className={classNames('container')}>
                <h1>Auth Data: </h1>
                <ul>
                    {Object.keys(userData).map(key => {

                        // @ts-ignore
                        return <li key={key}>{` ${key}: ${userData[key]}`}</li>
                    })}
                </ul>
                <div>
                    <h1>Posts: </h1>
                    <div>
                        {postsIds.map((postId) => {
                            return <Post key={postId} id={postId} />
                        })}
                    </div>
                    <div>
                        {postsIds.map((postId) => {
                            return <PostPreview key={postId} id={postId} />
                        })}
                    </div>
                </div>
            </main>
        )
    } else {
        return <div></div>
    }
}

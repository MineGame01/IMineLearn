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
                    {Object.keys(userData).map((key) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        return <li key={key}>{` ${key}: ${userData[key]}`}</li>
                    })}
                </ul>
                <div>
                    <h1>Posts: </h1>
                    <div>
                        <Post id={postsIds[0]} />
                    </div>
                    <div>
                        <PostPreview id={postsIds[0]} />
                    </div>
                </div>
            </main>
        )
    } else {
        return <div></div>
    }
}

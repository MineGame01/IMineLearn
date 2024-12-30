import React from 'react'

import classNames from 'classnames'

import { ForumAPI, useAppFetch } from '@/shared/api'
import { Post, PostPreview } from '@/features/Post'
import { LoginModal } from '@/widgets/LoginModal'
import { IGetFilteredPost } from '@/entities/ForumAPI'

export const HomePage: React.FC = () => {
    const { data } = useAppFetch<
        IGetFilteredPost['dataResponses']['postOnIdArray'],
        typeof ForumAPI.getFilteredPost
    >(ForumAPI.getFilteredPost, {
        search: 'T',
        return_ids_only: true,
    })

    if (data) {
        const postsIds = data.map((post) => post.id)

        return (
            <main className={classNames('container')}>
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
                <LoginModal />
            </main>
        )
    } else {
        return <div></div>
    }
}

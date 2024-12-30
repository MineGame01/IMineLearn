import React, { useRef, useState } from 'react'
import classNames from 'classnames'

import StylePostSCSS from './index.module.scss'
import { TPostId } from '@/entities/Post'
import { Title } from './Title'
import { Creator } from './Creator'
import { UserImage } from './UserImage'
import { UserName } from './UserName'
import { CreateData } from './CreateData'
import { Content } from './Content'
import { PostInteracting } from './PostInteracting'
import { Comment } from '@/features/Comment'
import { useSiblingStyles } from '@/shared/hooks'
import { useFetchPostById } from '../api/useFetchPostById'
import { useFetchCommentsByPostId } from '../api/useFetchCommentsByPostId'
import { Skeleton } from '@mui/material'
import { ContextLoadingComponent } from '../model/contextLoadingComponent'

export const Post: React.FC<{ id: TPostId }> = ({ id }) => {
    const { data: postData, isLoading: isLoadingPost, error: errorPost } = useFetchPostById(id)
    const {
        data: commentsData,
        // isLoading: isLoadingComments,
        error: errorComments,
    } = useFetchCommentsByPostId(id)

    const [isShowComments, setIsShowComments] = useState(false)

    if (postData && commentsData && !errorPost && !errorComments) {
        const { title, userimage, username, created_at, content } = postData[0]

        const classNamesPost = classNames(StylePostSCSS.post, StylePostSCSS.postContainer)

        return (
            <article className={classNamesPost}>
                <ContextLoadingComponent.Provider value={isLoadingPost}>
                    <Title title={title} className="hiden" />
                    <Creator>
                        <UserImage src={userimage} alt={username} />
                        <UserName name={username} />
                        <CreateData dataJSON={created_at} />
                    </Creator>
                    <Content>
                        <Title title={title} />
                        <div>
                            <div>{isLoadingPost ? <Skeleton /> : content}</div>
                        </div>
                    </Content>
                    <React.Fragment>
                        <PostInteracting
                            commentLength={commentsData.length}
                            isShowComment={isShowComments}
                            setShowComment={setIsShowComments}
                            id={id}
                        />
                        {isShowComments && (
                            <section
                                className={classNames(
                                    StylePostSCSS.post__commentList,
                                    StylePostSCSS.post__commentListContainer,
                                )}
                            >
                                <h1 className="hiden">Comments</h1>
                                {commentsData.map((comment) => {
                                    return <Comment key={comment.id} {...comment} />
                                })}
                            </section>
                        )}
                    </React.Fragment>
                </ContextLoadingComponent.Provider>
            </article>
        )
    }
}

export const PostPreview: React.FC<{ id: TPostId }> = ({ id }) => {
    const { data: postData, isLoading: isLoadingPost, error: errorPost } = useFetchPostById(id)

    const postPreviewRef = useRef<HTMLElementTagNameMap['article'] | null>(null)

    useSiblingStyles(postPreviewRef)

    if (postData && !errorPost) {
        const { title, userimage, username } = postData[0]

        const classNamesPost = classNames(
            StylePostSCSS.post,
            StylePostSCSS.postContainer,
            StylePostSCSS.postPreview,
            StylePostSCSS.postPreviewContainer,
        )

        return (
            <article ref={postPreviewRef} className={classNamesPost}>
                <ContextLoadingComponent.Provider value={isLoadingPost}>
                    <Title title={title} className="hiden" />
                    <Creator
                        classNameContainer={classNames(StylePostSCSS.postPreview__creatorContainer)}
                    >
                        <UserImage src={userimage} alt={username} />
                        <UserName name={username} />
                    </Creator>
                    <Content>
                        <Title title={title} />
                    </Content>
                </ContextLoadingComponent.Provider>
            </article>
        )
    }
}

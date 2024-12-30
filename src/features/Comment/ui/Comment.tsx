import React from 'react'

import { IComment } from '@/entities/Post'
import classNames from 'classnames'
import {
    Content,
    CreateData,
    Creator,
    Title,
    UserImage,
    UserName,
    StylePostSCSS,
} from '@/features/Post'
import { CommentInteracting } from './CommentInteracting'

export const Comment: React.FC<IComment> = ({ id, content, created_at, username }) => {
    return (
        <section className={classNames(StylePostSCSS.post, StylePostSCSS.postContainer)}>
            <h1 className="hiden">Comment</h1>
            <Creator>
                <UserImage src={null} alt={username} />
                <UserName name={username} />
                <CreateData dataJSON={created_at} />
            </Creator>
            <Content>
                <Title title={content} />
            </Content>
            <CommentInteracting id={id} />
        </section>
    )
}

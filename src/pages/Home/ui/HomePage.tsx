import React from 'react'
import { useAppSelector } from '@/app/model'
import { selectAuthUserInfo } from '@widgets/LoginModal'
import { Container, Typography } from '@mui/material'
import { useGetFilteredPostQuery } from '@/app/api'
import { PostList } from '@features/PostList'
import { Post } from '@features/Post'

export const HomePage: React.FC = () => {
    const { data } = useGetFilteredPostQuery({ return_ids_only: true })
    const userData = useAppSelector(selectAuthUserInfo)

    if (data) {
        return (
            <main>
                <Container>
                    <Typography variant={'h5'}>Auth Data: </Typography>
                    <ul>
                        {Object.keys(userData).map((key) => {
                            return (
                                <li key={key}>
                                    <Typography>{
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        ` ${key}: ${userData[key]}`
                                    }</Typography>
                                </li>
                            )
                        })}
                    </ul>
                    <Post id={data[0] as string} />
                    <PostList postIds={data as string[]} />
                </Container>
            </main>
        )
    } else {
        return <div></div>
    }
}

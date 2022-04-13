import { GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
// import Header from '../../components/header'
import dynamic from 'next/dynamic'

const Header = dynamic(()=> import('../../components/header'), {ssr : false})
interface PostProps {
    post: any[]
}

const Post = ({ post }: PostProps) => {
    const router = useRouter()
    return (
        <div>
            <Header/>
            {post.map((item: any) => (
                <li
                    style={{ backgroundColor: 'red', padding: '20px', marginBottom: '1000px' }}
                    key={item.id}
                >
                    <Link href={`/posts/${item.id}`}>{item.title}</Link>
                </li>
            ))}
        </div>
    )
}
export const getStaticProps: GetStaticProps<PostProps> = async (context: GetStaticPropsContext) => {
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
    const data = await response.json()
    return {
        props: {
            post: data.data.map((x: any) => ({
                id: x.id,
                title: x.title,
            })),
        },
    }
}

export default Post

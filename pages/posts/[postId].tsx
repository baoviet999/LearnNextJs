import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
    post: any
}

const DetailPage = ({ post }: Props) => {
    const router = useRouter()
    console.log(router)
    if (!post) return null
    return (
        <div>
            <h1>{post.title}</h1>
            <img src={post.imageUrl} alt="" />
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
    const data = await response.json()
    // console.log(data.data.map((post: any) => ({ params: { postId: post.id } })))
    return {
        paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<Props> = async (context: GetStaticPropsContext) => {
    const postId = context.params?.postId
    // console.log('postId' , postId)
    if (!postId) return { notFound: true }

    const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
    const data = await response.json()
    console.log('data', data)
    return {
        props: {
            post: data,
        },
    }
}

export default DetailPage

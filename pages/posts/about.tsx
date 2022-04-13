import { GetServerSideProps, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type Props = {}

const About = (props: Props) => {
    const [posts, setPosts] = useState([])
    const router = useRouter()
    console.log(router.query)
    const page = router.query?.page
    useEffect(() => {
        if (!page) return
        ;(async () => {
            const response = await fetch(
                `https://js-post-api.herokuapp.com/api/posts?_page=${page}`
            )
            const data: any = await response.json()
            setPosts(data.data)
        })()
    }, [page])
    const handlePageChange = () => {
        router.push(
            {
                pathname: 'about',
                query: {
                    page: (Number(router.query?.page) || 1) + 1,
                },
            },
            undefined,
            { shallow: true }
        )
    }
    return (
        <div>
            <h1>Day la trang about</h1>
            <h1>Cai nay dc render san ben server rooif</h1>
            <ul>
                {posts.map((item: any) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
            <button onClick={handlePageChange}>Change page</button>
        </div>
    )
}

// export const getStaticProps: GetStaticProps = async () => {
//     console.log('server render')
//     return {
//         props: {},
//     }
// }

// export const getServerSideProps: GetServerSideProps = async () => {
//     return {
//         props: {},
//     }
// }

export default About

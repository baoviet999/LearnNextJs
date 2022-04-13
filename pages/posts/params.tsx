import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'

type Props = {
    posts: any
}

const ParamCache = ({ posts }: Props) => {
    const [time, setTime] = useState(0)
    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => {
                if (prev > 60) clearInterval(timer)
                return prev + 1
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])
    return (
        <div>
            <p>{time}</p>
            <h1>{posts?.title}</h1>
            <h1>{posts?.id}</h1>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    context.res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=5')
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: 'nguyen bao viet', age: 21 })
        }, 3000)
    })

    const response = await fetch('https://js-post-api.herokuapp.com/api/posts/sktwi1cgkkuif36dj')
    const data = await response.json()

    return {
        props: {
            posts: data,
        },
    }
}

export default ParamCache

import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'

type Props = {
    data: any
}

const ParamCache = ({ data }: Props) => {
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
            <h1>{data?.name}</h1>
            <h1>{data?.age}</h1>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    context.res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate')
    const data = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: 'nguyen bao viet', age: 21 })
        }, 3000)
    })
    return {
        props: {
            data,
        },
    }
}

export default ParamCache

import { useRouter } from 'next/router'
import React from 'react'

const Products = () => {
  const router = useRouter()
  console.log(router)
  return (
    <div>Hello anh em</div>
  )
}

export default Products
"use client"
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import  {useQuery, useMutation} from 'react-query'

const TESTS = [
  {id:1, title: "Basic test"},
  {id:2, title: "Basic test 2"},

]

const MotionLink = motion(Link);

function wait(duration: number | undefined) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default function MemberHome() {
  const testsQuery = useQuery({
    queryKey: ["tests"],
    queryFn:() => wait(1000).then(() => [...TESTS]),
  })

  if(testsQuery.isLoading) return <div className='w-full min-h-screen flex text-center items-center'>Loading...</div>
  if(testsQuery.isError) {
    return <pre>{JSON.stringify(testsQuery.error)}</pre>
  }
  
  return (
  <main className=" w-full min-h-screen grid grid-cols-12 gap-28 px-28 mt-20">
    {testsQuery.data?.map(post => (
      <MotionLink key={post.id} href="/member/test" className="h-60 col-span-4 bg-gray-300 rounded-3xl">{post.title}</MotionLink>   
    ))}
  </main>
   
  )
}





"use client"
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import  {useQuery, useMutation} from '@tanstack/react-query'
import { getTests } from '../api/tests'

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
    queryFn: getTests,
  })

  if(testsQuery.isLoading) return <div className='w-full min-h-screen flex text-center items-center'>Loading...</div>
  if(testsQuery.isError) {
    return <pre>{JSON.stringify(testsQuery.error)}</pre>
  }
  
  return (
  <main className=" w-full min-h-screen grid grid-cols-12 gap-28 px-60 mt-20 ">
    {testsQuery.data?.map((test: any) => (
      <MotionLink key={test.id} href={`/admin/test#${test.testId}`} className="flex flex-col items-center justify-center h-60 col-span-4 bg-gray-300 rounded-3xl">
        <h1 className='font-semibold text-2xl mb-2'>{test.testName}</h1>
        <h3 className='my-1'>Thời gian: {test.testTime}</h3>
        <h3 className='my-1'>Số câu hỏi: {test.questionAmount}</h3>
        <p className='text-center mx-2'>{test.testDesc}</p>


      </MotionLink>   
    ))}
  </main>
   
  )
}





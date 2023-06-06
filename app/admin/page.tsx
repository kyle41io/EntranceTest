"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import  {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { randomUUID } from 'crypto'
import axios from 'axios'

const MotionLink = motion(Link);

// function wait(duration: number | undefined) {
//   return new Promise(resolve => setTimeout(resolve, duration))
// }

export default function AdminHome() {
//   const queryClient = useQueryClient()
//   const testsQuery = useQuery({
//     queryKey: ["tests"],
//     queryFn:(obj) => wait(1000).then(() => {
//       console.log(obj)
//       return [...TESTS]
//     }),
//   })

//   if(testsQuery.isLoading) return <h1 className='min-h-screen flex text-center items-center'>Loading...</h1>
//   if(testsQuery.isError) {
//     return <pre>{JSON.stringify(testsQuery.error)}</pre>
//   }
  const [tests, setTests] = useState([])
  
  useEffect(() =>{
    fetchApi()
  }, [])
  const fetchApi = async () => {
    
    const response = await axios.get('https://localhost:5433/api/TestLists')
    console.log("response", response)
    setTests(response.data)
  }

  return (
    
    <main>
      <button className='absolute top-16 right-8 m-5 p-2 bg-purple-700 rounded-md text-light
      shadow-md'>
        Thêm bài test
      </button>
      <div className=" w-full min-h-screen grid grid-cols-12 gap-28 px-28 mt-20">
        {tests?.map((test) => {
            return (
              <MotionLink key={test.testId}  href="/admin/test" className="h-60 col-span-4 bg-gray-300 rounded-3xl">
                <div className="flex flex-col items-center text-center">
                  <h2 className='text-2xl font-bold text-gray-800 my-2'>{test.testName}</h2>
                  <div className="flex items-center text-center ">
                    <h3 className="mr-2">Số câu hỏi: {test.questionAmount} câu</h3>
                    <h3 className="">Thời gian: {test.testTime}</h3>
                  </div>
                  <p>{test.testDesc}</p>
                </div>
              </MotionLink>
            )
          })
        }
          
      </div>
      
    </main>
  )
    
}




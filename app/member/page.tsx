"use client"
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const variants = {
  hover: {
    height: '100%',
    top: 0,
  },
  initial: {
    height: 0,
    top: '100%',
  },
};
const MotionLink = motion(Link);


export default function MemberHome() {
  return (
    <main className=" w-full min-h-screen">
      <div className='grid grid-cols-12 gap-28 px-28 mt-20 min-h-[600px] w-full'>
        <MotionLink  href="/member/test" className="h-60 col-span-4 bg-gray-300 rounded-3xl"></MotionLink>   
        <MotionLink href="/member/test" className="h-60 col-span-4 bg-gray-300 rounded-3xl"></MotionLink>   
        <MotionLink href="/member/test" className="h-60 col-span-4 bg-gray-300 rounded-3xl"></MotionLink>  
        <MotionLink href="/member/test" className="h-60 col-span-4 bg-gray-300 rounded-3xl"></MotionLink>   
        <MotionLink href="/member/test" className="h-60 col-span-4 bg-gray-300 rounded-3xl"></MotionLink>   
        <MotionLink href="/member/test" className="h-60 col-span-4 bg-gray-300 rounded-3xl"></MotionLink>   
      </div> 
    </main>
  )
}




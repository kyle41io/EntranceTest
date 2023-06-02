import React from 'react'
import { LeftIcon, RightIcon } from './Icon'
import { useState } from 'react';


const Test = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen w-full  '>
      <div className="flex bg-gray-300 text-white h-[50px] w-[150px] rounded-2xl text-xl font-semibold text-center items-center justify-center mb-12 shadow-lg">
        00:00:00
      </div>
      <div className="grid grid-cols-6 gap-8 h-[500px] w-[80%] ">
        <div className="flex flex-col items-center col-span-2 bg-gray-300 shadow-lg rounded-xl ">
          <div className="flex justify-center items-center bg-blue-800/80 text-white h-[40px] w-[200px] rounded-xl text-xl mt-6">Danh sách câu hỏi</div>
          <div className="w-[70%] grid grid-cols-12 gap-4 mt-10">
            <div className="bg-blue-700 col-span-3 h-14 w-12 rounded-md shadow-lg"></div>
            <div className="bg-blue-700 col-span-3 h-14 w-12 rounded-md shadow-lg"></div>
            <div className="bg-blue-700 col-span-3 h-14 w-12 rounded-md shadow-lg"></div>
            <div className="bg-blue-700 col-span-3 h-14 w-12 rounded-md shadow-lg"></div>
            <div className="bg-blue-700 col-span-3 h-14 w-12 rounded-md shadow-lg"></div>
            <div className="bg-blue-700 col-span-3 h-14 w-12 rounded-md shadow-lg"></div>
            <div className="bg-blue-700 col-span-3 h-14 w-12 rounded-md shadow-lg"></div>
            <div className="bg-blue-700 col-span-3 h-14 w-12 rounded-md shadow-lg"></div>
            <div className="bg-blue-700 col-span-3 h-14 w-12 rounded-md shadow-lg"></div>
            <div className="bg-blue-700 col-span-3 h-14 w-12 rounded-md shadow-lg"></div>
          </div>
        </div>
        <div className="flex flex-col items-center col-span-4 bg-gray-300 shadow-lg rounded-xl">
          <div className="flex justify-center items-center bg-blue-800/80 text-white h-[40px] w-[120px] rounded-xl text-xl mt-6">Câu X</div>
          <div className="flex justify-between items-center h-[400px] w-full">
            <LeftIcon className='!w-8 text-blue-900'/>
            <div className=""></div>
            <RightIcon className='!w-8 text-blue-900' />
          </div>
        </div>
      </div>
      <button className='bg-blue-800/80 text-white h-[50px] w-[150px] rounded-2xl text-xl font-semibold mt-10'>Hoàn thành</button>
    </div>
  )
}

export default Test
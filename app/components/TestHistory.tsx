"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTestAttempts } from '../api/testAttempts'
import { AccuracyIcon } from './Icon'

const TestHistory = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const testAtemptsQuery = useQuery({
    queryKey: ["testAttempts"],
    queryFn:getTestAttempts,
  })
  return (
    <div className='flex flex-col items-center justify-start absolute h-full w-1/2 right-40 bg-gray-300 -z-20 ml-16 p-6'>
      <div className="inline-flex items-center rounded-md px-2 py-1 ring-1 ring-inset bg-blue-50 text-blue-700 ring-blue-600/20 font-semibold text-xl">Lịch sử tham gia</div>
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-2 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-0">
                    Thời gian
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Bài test
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Số câu đúng
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Tổng số câu
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Điểm số
                  </th>
                  
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {testAtemptsQuery &&
                  testAtemptsQuery.data
                    ?.filter((attempt: any) => attempt.email == user.email)
                    .map((attempt: any, index: number) => (
                      <tr key={user.email}>
                       <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                         <div className="flex items-center">
                           {attempt.timeStart}
                         </div>
                       </td>
                       <td className="whitespace-nowrap px-3 py-5 text-base text-gray-500">
                         <div className="text-gray-900 text-semibold">{attempt.testName}</div>
                       </td>
   
                       <td className="whitespace-nowrap px-3 py-5 text-semibold text-gray-500">
                         
                         <div className="flex items-center">
                           {attempt.amountCorrect}
                         </div>
                       </td>
                       <td className="whitespace-nowrap px-3 py-5 text-semibold text-gray-500">
                         <div className="flex items-center">
                           
                           {attempt.testAmount}
                           
                         </div>
                       </td>
                        
                       <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <AccuracyIcon accurate={attempt.accurate}/>
                       </td>
                       
                     </tr>
                    ) 
                  )
                }
              </tbody>
            </table>
    </div>
  )
}

export default TestHistory
"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import {getTestAttemptsByEmail } from '../api/testAttempts'
import { AccuracyIcon } from './Icon'


interface TestHistoryListProps {
  email: string;
}

const TestHistoryList = ({ email }: TestHistoryListProps) => {
  
  const testAtemptsQuery = useQuery({
    queryKey: ["testAttempts", email],
    queryFn: () => getTestAttemptsByEmail(email),
  })
  return (
    <>
      <div className="inline-flex items-center rounded-md px-2 py-1 ring-1 ring-inset bg-blue-50 text-blue-700 ring-blue-600/20 font-semibold text-xl">Lịch sử tham gia</div>
      <div className="w-full overflow-x-auto mt-4">
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
                  ?.sort((a: any, b: any) => Number(new Date(b.timeStart)) - Number(new Date(a.timeStart))) // sắp xếp theo thời gian giảm dần
                  .map((attempt: any, index: number) => (
                      <tr key={email}>
                       <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-0">
                         <div className="flex items-center">
                           {attempt.timeStart}
                         </div>
                       </td>
                       <td className="whitespace-nowrap px-3 py-3 text-base text-gray-500">
                         <div className="text-gray-900 text-semibold">{attempt.testName}</div>
                       </td>
   
                       <td className="whitespace-nowrap px-3 py-3 text-semibold text-gray-500">
                         
                         <div className="flex items-center">
                           {attempt.amountCorrect}
                         </div>
                       </td>
                       <td className="whitespace-nowrap px-3 py-3 text-semibold text-gray-500">
                         <div className="flex items-center">                          
                           {attempt.testAmount}                          
                         </div>
                       </td>
                        
                       <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                        <AccuracyIcon accurate={attempt.accurate} className='!w-28 !h-28'/>
                       </td>
                       
                     </tr>
                    ) 
                  )
                }
              </tbody>
            </table>
        </div>
    </>
  )
}

export default TestHistoryList
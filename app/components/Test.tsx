"use client"
import Test from '@/app/components/Test'
import { useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import React from 'react'
import Logo from '../../../../public/img/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import ProfilePic from '../../../../public/img/1389952697.png'
import { useQuery } from '@tanstack/react-query'
import { getTestById } from '../api/tests';
import { useParams, useSearchParams } from 'next/navigation'
import { getQuestions, getQuestionsPaginated } from '@/app/api/questions';
import { LeftIcon, RightIcon } from '@/app/components/Icon';

type Question = {
  answer4: ReactNode;
  answer3: ReactNode;
  answer2: ReactNode;
  answer1: ReactNode;
  content: string;
  Answer1: string;
  Answer2: string;
  Answer3: string;
  Answer4: string;
  testId: number;
};
export default function TestPage() {
  const params = useSearchParams()
  const page = parseInt(params.get("page")!)||1;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  //const [page, setPage] = useState(1)
  const param = useParams()
  const testQuery = useQuery({
    queryKey: ['test', param.testId],
    queryFn: () => getTestById(param.testId),
  });
  // const questionsQuery = useQuery({
  //   queryKey: ["questions"],
  //   queryFn:getQuestions,
  // })
  //const { question } = props;
  const { status, error, data, isPreviousData } = useQuery({
    queryKey: ["questions", { page }],
    keepPreviousData: true,
    queryFn: () => getQuestionsPaginated(page),
  })

  
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestion < data?.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  // useEffect(() => {
  //   console.log(param.testId)
  
  //   return () => {
      
  //   }
  // }, [])
  
  return (
    <main className=" w-full min-h-screen">
      <div className='w-full fixed top-0 h-16 bg-gray-800 flex items-center justify-between'>
        <Link href='https://kpim.vn' target='_blank'>
          <Image src={Logo} alt={'KPIM'} className='h-10 w-auto ml-[120px] mt-1.5 '  />
        </Link>
        <div className="h-12 min-w-[180px] bg-stone-300 rounded-xl p-2 text-center text-3xl font-semibold mr-[60px]">
          {testQuery.status === 'loading' ? 'Loading...' : testQuery.data.testName}
        </div>
        <Image src={ProfilePic} alt='' className='h-12 p-1 w-auto mr-[120px] bg-white rounded-full' />
      </div>
      
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
          <div className="flex justify-center items-center bg-blue-800/80 text-white h-[40px] w-[120px] rounded-xl text-xl mt-6">Câu {currentQuestion + 1}</div>
          <small>{isPreviousData && "Previous Data"}</small>

          <div className="flex justify-between items-center h-[400px] w-full">
            <div onClick={goToPreviousQuestion} className=""><LeftIcon className='!w-8 text-blue-900' /></div>
            {data?.questions &&
              data.questions
                .filter((question: Question) => question.testId == Number(param.testId))
                .map((question: Question) => (
                  <div key={question.content} className="flex flex-col">
                    <h2>{question.content}</h2>
                    <label>
                      <input type="radio" name={question.content} value="1" />
                      {question.answer1}
                    </label>
                    <label>
                      <input type="radio" name={question.content} value="2" />
                      {question.answer2}
                    </label>
                    <label>
                      <input type="radio" name={question.content} value="3" />
                      {question.answer3}
                    </label>
                    <label>
                      <input type="radio" name={question.content} value="4" />
                      {question.answer4}
                    </label>
                  </div>
                ))
            }

            <div className="" onClick={goToNextQuestion}><RightIcon className='!w-8 text-blue-900' /></div>
          </div>
        </div>
      </div>
      <button className='bg-blue-800/80 text-white h-[50px] w-[150px] rounded-2xl text-xl font-semibold mt-10'>Hoàn thành</button>
    </div>
    </main>
  );
}
"use client"
import Test from '@/app/components/Test'
import { useState, useEffect, ReactNode, Key } from 'react';
import axios from 'axios';
import React from 'react'
import Logo from '../../../../public/img/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import ProfilePic from '../../../../public/img/1389952697.png'
import { useQuery } from '@tanstack/react-query'
import { getTestById } from '../api/tests'
import { useParams, useSearchParams } from 'next/navigation'
import { getQuestions, getQuestionsPage, getQuestionsPaginated } from '@/app/api/questions';
import { LeftIcon, RightIcon } from '@/app/components/Icon';
import PageButton from '@/app/components/PageButton';

type Question = {
  questionId: Key | null | undefined;
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
  //const page = parseInt(params.get("page")!)||1;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  //const [page, setPage] = useState(1)
  const param = useParams()
  const testQuery = useQuery({
    queryKey: ['test', param.testId],
    queryFn: () => getTestById(param.testId),
  });
  
  // const { status, error, data, isPreviousData } = useQuery({
  //   queryKey: ["questions", { page }],
  //   keepPreviousData: true,
  //   queryFn: () => getQuestionsPaginated(page),
  // })

  const [page, setPage] = useState(1)

    const {
        isLoading,
        isError,
        error,
        data: questions,
        isFetching,
        isPreviousData,
    } = useQuery(['questions', page], () => getQuestionsPage(page), {
        keepPreviousData: true
    })

  
  // const goToPreviousQuestion = () => {
  //   if (currentQuestion > 0) {
  //     setCurrentQuestion(currentQuestion - 1);
  //   }
  // };

  // const goToNextQuestion = () => {
  //   if (currentQuestion < data?.questions.length - 1) {
  //     setCurrentQuestion(currentQuestion + 1);
  //   }
  // };
    const lastPage = () => setPage(questions.total_pages)

    const firstPage = () => setPage(1)

    const pagesArray = Array(questions?.total_pages).fill().map((_, index) => index + 1)
    const nav = (
      <nav className="mt-6">
          {/* <button onClick={firstPage} disabled={isPreviousData || page === 1}>&lt;&lt;</button> */}
          {/* Removed isPreviousData from PageButton to keep button focus color instead */}
          {pagesArray.map(pg => <PageButton key={pg} pg={pg} setPage={setPage} />)}
          {/* <button onClick={lastPage} disabled={isPreviousData || page === questions?.total_pages}>&gt;&gt;</button> */}
      </nav>
    )
  
  
  
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
          {nav}
        </div>
        <div className="flex flex-col items-center col-span-4 bg-gray-300 shadow-lg rounded-xl">
          <div className="flex justify-center items-center bg-blue-800/80 text-white h-[40px] w-[120px] rounded-xl text-xl mt-6">Câu {currentQuestion + 1}</div>
          <small>{isPreviousData && "Previous Data"}</small>

          <div className="flex justify-between items-center h-[400px] w-full">
            <div  className=""><LeftIcon className='!w-8 text-blue-900' /></div>
            {questions?.data &&
              questions?.data
                .filter((question: Question) => question.testId == param.testId)
                .map((question: Question) => (
                  <div key={question.questionId} className="flex flex-col">
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

            <div className="" ><RightIcon className='!w-8 text-blue-900' /></div>
          </div>
        </div>
      </div>
      <button className='bg-blue-800/80 text-white h-[50px] w-[150px] rounded-2xl text-xl font-semibold mt-10'>Hoàn thành</button>
    </div>
    </main>
  );
}
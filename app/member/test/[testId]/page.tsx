"use client"
import { useState, useEffect, ReactNode, Key } from 'react';
import axios from 'axios';
import React from 'react'
import Logo from '../../../../public/img/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import ProfilePic from '../../../../public/img/1389952697.png'
import { useQuery } from '@tanstack/react-query'
import { getTestById } from '../../../api/tests'
import { useParams, useSearchParams } from 'next/navigation'
import { getQuestions, getQuestionsPaginated } from '@/app/api/questions';
import { Modal } from '@/app/components/Modal';
import Timer from '@/app/components/Timer';

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
  const page = parseInt(params.get("page")!)||1;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  //const [page, setPage] = useState(1)
  const param = useParams()
  const testQuery = useQuery({
    queryKey: ['test', param.testId],
    queryFn: () => getTestById(param.testId),
  });
  const questionsQuery = useQuery({
    queryKey: ["questions"],
    queryFn:getQuestions,
  })

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questionsQuery.data.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const [showModal, setShowModal] = useState(false);
  
  const handleCompleteClick = () => {
    setShowModal(true);
  };
  
  const handleConfirm = () => {
    // Xử lý sự kiện khi người dùng đồng ý nộp bài
  };
  
  const handleClose = () => {
    setShowModal(false);
  };
  
  return (
    <main className=" w-full min-h-screen mb-16">
      <div className='w-full fixed top-0 h-16 bg-gray-800 flex items-center justify-between'>
        <Link href='https://kpim.vn' target='_blank'>
          <Image src={Logo} alt={'KPIM'} className='h-10 w-auto ml-[140px] mt-1.5 '  />
        </Link>
        <div className="h-12 min-w-[180px] bg-stone-300 rounded-xl p-2 text-center text-3xl font-semibold mr-[60px]">
          {testQuery.status === 'loading' ? 'Loading...' : testQuery.data.testName}
        </div>
        <Image src={ProfilePic} alt='' className='h-12 p-1 w-auto mr-[140px] bg-white rounded-full' />
      </div>
      
      <div className='flex flex-col justify-center items-center min-h-screen w-full  '>
        <div className="flex fixed right-40 top-20 bg-gray-300 text-white h-[50px] w-[150px] rounded-2xl text-xl font-semibold text-center items-center justify-center mb-12 shadow-lg">
        
        <Timer seconds={testQuery.data?.testTime ? testQuery.data.testTime * 60 : 20} />
        </div> 
        {/* <Timer testTime={testQuery.data?.testTime} /> */}
        <div className=" min-h-[500px] w-[80%] ">    
           
            <div className="flex flex-col justify-between items-start w-full mb-6 mt-20 p-12 bg-gray-300 shadow-lg rounded-xl">
              
            {questionsQuery &&
              questionsQuery.data
                ?.filter((question: Question) => question.testId == Number(param.testId))
                .map((question: Question, index: number) => (
                  <div key={question.questionId} className="flex flex-col mb-12 text-lg">
                    <h2 className='mb-5 '><span className='font-semibold'>Câu {index + 1}:</span> {question.content}</h2>
                    <label className='mb-4 cursor-pointer'>
                      <input className='mr-3 cursor-pointer w-5 h-5'  type="radio" name={question.content} value="1" />
                      {question.answer1}
                    </label >
                    <label className='mb-4 cursor-pointer'>
                      <input className='mr-3 cursor-pointer w-5 h-5' type="radio" name={question.content} value="2" />
                      {question.answer2}
                    </label>
                    <label className='mb-4 cursor-pointer'>
                      <input className='mr-3 cursor-pointer w-5 h-5' type="radio" name={question.content} value="3" />
                      {question.answer3}
                    </label>
                    <label className='mb-4 cursor-pointer'>
                      <input className='mr-3 cursor-pointer w-5 h-5' type="radio" name={question.content} value="4" />
                      {question.answer4}
                    </label>
                  </div>
                ))
            }
    
            </div>
          
            <div className='flex justify-center'>
              <button className='bg-blue-800/80 text-white h-[50px] w-[150px] rounded-2xl text-xl font-semibold mt-10 items-center' onClick={handleCompleteClick}>Hoàn thành</button>
            </div>
            {showModal && <Modal onClose={handleClose} onConfirm={handleConfirm} />}
        </div>
    
      </div>
    </main>
  );
}
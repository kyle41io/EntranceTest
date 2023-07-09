"use client"
import { useState, useEffect, ReactNode, Key } from 'react';
import axios from 'axios';
import React from 'react'
import Logo from '../../../../public/img/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import ProfilePic from '../../../../public/img/1389952697.png'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTestById } from '../../../api/tests'
import { useParams, useSearchParams } from 'next/navigation'
import { getQuestions } from '@/app/api/questions';
import { Modal } from '@/app/components/Modal';
import Timer from '@/app/components/Timer';
import { isEqual } from 'lodash';
import { AccuracyIcon } from '@/app/components/Icon';
import { createTestAttempt, getTestAttempts } from '@/app/api/testAttempts';

type Question = {
  questionId: number;
  testId: number;
  content: string;
  answer1: ReactNode; 
  answer2: ReactNode;
  answer3: ReactNode;
  answer4: ReactNode;
  correctAnswer: number; //1,2,3,4
};
type Attempt ={
  attemptId: number,
  testId: number,
  email: string, 
  timeStart: string,
  testAmount: number,
  amountCorrect: number,
  accurate: number,
  applicationUser: null
}
export default function TestPage() {
  const params = useSearchParams()
  //const [userAnswers, setUserAnswers] = useState({});
  const param = useParams()
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showModal, setShowModal] = useState(false);
  
  const testQuery = useQuery({
    queryKey: ['test', param.testId],
    queryFn: () => getTestById(param.testId),
  });
  const questionsQuery = useQuery({
    queryKey: ["questions"],
    queryFn:getQuestions,
  })
  
//thêm lần tham gia test
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const queryClient = useQueryClient()
  
  
  const {status ,error, mutate, } = useMutation({
    mutationFn: createTestAttempt,
    onSuccess: newTestAttempt => {
      queryClient.setQueryData(["testAttempts", newTestAttempt.attemptId], newTestAttempt);
    },
  });
  

//thêm lần tham gia test

  const handleCompleteClick = () => {
    setShowModal(true);
  };
  
  const handleConfirm = () => {
    // tính toán điểm số của người dùng
  let score = 0;
  questionsQuery.data?.filter((question: Question) => question.testId == Number(param.testId)).forEach((question: Question) => {
    if (isEqual(userAnswers[question.questionId], question.correctAnswer.toString())) {
      score++;
    }
  });
  setScore(score);
  setShowModal(false);
  setIsCompleted(true); // đánh dấu là người dùng đã hoàn thành bài kiểm tra
  
  mutate({
    testId: param.testId,
    testName:testQuery.data?.testName,
    email: user.email,
    testAmount: testQuery.data?.testAmount,
    amountCorrect: score,
    accurate: score/testQuery.data?.testAmount,    
  })
  };
  

  const handleClose = () => {
    setShowModal(false);
  };
  
  if(testQuery.isLoading === true) {
    return (
      <div className="min-h-sceen bg-gray-800"></div>
    );
  }
  return (
    <main className=" w-full min-h-screen mb-16">
      <div className='w-full fixed top-0 h-16 bg-gray-800 flex items-center justify-between'>
        <Link href='https://kpim.vn' target='_blank'>
          <Image src={Logo} alt={'KPIM'} className='h-10 w-auto ml-[140px] mt-1.5 '  />
        </Link>
        <div className="h-12 min-w-[180px] bg-stone-300 rounded-xl p-2 text-center text-3xl font-semibold mr-[60px]">
          {testQuery.data?.testName }
        </div>
        <Image src={ProfilePic} alt='' className='h-12 p-1 w-auto mr-[140px] bg-white rounded-full' />
      </div>
      
      <div className='flex flex-col justify-center items-center min-h-screen w-full  '>
        <div className="flex fixed right-40 top-20 bg-gray-300 text-white h-[50px] w-[150px] rounded-2xl text-xl font-semibold text-center items-center justify-center mb-12 shadow-lg">
        <Timer seconds={testQuery.data?.testTime * 60} handleConfirm={handleConfirm} />
        </div> 
        <div className=" min-h-[500px] w-[80%] ">    
           
            <div className="flex flex-col justify-between items-start w-full mb-6 mt-20 p-12 bg-gray-300 shadow-lg rounded-xl">
              
            {questionsQuery &&
              questionsQuery.data
                ?.filter((question: Question) => question.testId == Number(param.testId))
                .map((question: Question, index: number) => (
                  <div key={question.questionId} className="flex flex-col mb-12 text-lg">
                    <h2 className='mb-5 '><span className='font-semibold'>Câu {index + 1}:</span> {question.content}</h2>
                    <label className='mb-4 cursor-pointer'>
                      <input className='mr-3 cursor-pointer w-5 h-5' type="radio" name={question.content} value="1" onChange={(e) => setUserAnswers({...userAnswers, [question.questionId]: e.target.value})} />
                      {question.answer1}
                    </label >
                    <label className='mb-4 cursor-pointer'>
                      <input className='mr-3 cursor-pointer w-5 h-5' type="radio" name={question.content} value="2" onChange={(e) => setUserAnswers({...userAnswers, [question.questionId]: e.target.value})} />
                      {question.answer2}
                    </label>
                    <label className='mb-4 cursor-pointer'>
                      <input className='mr-3 cursor-pointer w-5 h-5' type="radio" name={question.content} value="3" onChange={(e) => setUserAnswers({...userAnswers, [question.questionId]: e.target.value})} />
                      {question.answer3}
                    </label>
                    <label className='mb-4 cursor-pointer'>
                      <input className='mr-3 cursor-pointer w-5 h-5' type="radio" name={question.content} value="4" onChange={(e) => setUserAnswers({...userAnswers, [question.questionId]: e.target.value})} />
                      {question.answer4}
                    </label>
                  </div>
                ))
            }
            </div>
          
            <div className='flex justify-center'>
              <button className='bg-blue-800/80 text-white h-[50px] w-[150px] rounded-2xl text-xl font-semibold mt-10 items-center' onClick={handleCompleteClick}>Hoàn thành</button>
            </div>
            {showModal && (<Modal onClose={handleClose} onConfirm={handleConfirm} />)}
            {isCompleted && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
                <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg">
                  <p className="text-xl font-semibold mb-4">Bạn đã đạt đúng {score}/{testQuery.data.testAmount} câu</p>
                  <AccuracyIcon accurate={score/testQuery.data.testAmount} />
                  
                  <Link href="/member">
                    <button className="w-[100%] bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg">Thoát</button>
                  </Link>
                </div>
              </div>
            )}
        </div>
    
      </div>
    </main>
  );
}

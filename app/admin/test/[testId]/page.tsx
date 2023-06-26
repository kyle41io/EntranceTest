"use client"
import { useState, useEffect, ReactNode, Key } from 'react';
import axios from 'axios';
import React from 'react'
import Logo from '../../../../public/img/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import ProfilePic from '../../../../public/img/1389952697.png'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getTestById } from '../../../api/tests'
import { useParams, useSearchParams } from 'next/navigation'
import { deleteQuestion, getQuestions } from '@/app/api/questions';
import { EditIcon, TrashIcon } from '@/app/components/Icon';
import { ModalAdmin, ModalDelete } from '@/app/components/Modal';
import AddQuestion from '@/app/components/AddQuestion';

type Question = {
  questionId: Key | null | undefined;
  testId: number;
  answer4: ReactNode;
  answer3: ReactNode;
  answer2: ReactNode;
  answer1: ReactNode;
  content: string;
  correctAnswer: Number;
};

interface EditQuestion {
  questionId: number;
  testId: number;
  content: string;
  answer4: string;
  answer3: string;
  answer2: string;
  answer1: string;
  correctAnswer: number;
}

export default function TestPage() {
  const params = useSearchParams()
  const page = parseInt(params.get("page")!)||1;
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deletingQuestionId, setDeletingQuestionId] = useState<Key | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const param = useParams()

  const testQuery = useQuery({
    queryKey: ['test', param.testId],
    queryFn: () => getTestById(param.testId),
  });
  
  const questionsQuery = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });
  
  const updateTestMutation = useMutation((updatedTest) => {
    return axios.put(`https://localhost:5433/Tests/${param.testId}`, updatedTest);
  }, {
    onSuccess: () => {
      testQuery.refetch();
    },
  });

  const handleDeleteClick = (questionId: Key) => {
    setDeletingQuestionId(questionId);
    setShowDeleteModal(true);
  };
  
  const handleConfirm = () => {
    // Xử lý sự kiện khi người dùng đồng ý nộp bài
  };
  
  const handleDeleteConfirm = () => {
    if (deletingQuestionId) {
      handleDelete(deletingQuestionId);
    }
  };
  
  const handleClose = () => {
    setShowModal(false);
  };
  
  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };
  
  const handleDelete = (questionId: Key) => {
    deleteQuestion(questionId)
      .then(() => {
        // Xóa question thành công, cập nhật UI hoặc thực hiện các thao tác khác
        questionsQuery.refetch(); // Làm mới danh sách các question
        if (testQuery.data && testQuery.data.testAmount) {
          const updatedTest = {
            ...testQuery.data,
            testAmount: testQuery.data.testAmount - 1,
          };
          updateTestMutation.mutate(updatedTest);
          setShowDeleteModal(false);
        }
      })
      .catch((error) => {
        // Xóa test thất bại, xử lý lỗi tại đây
        console.error(error);
      });
  };
  
  //edit question
  const [editQuestion, setEditQuestion] = useState<EditQuestion>({
    questionId: 0,
    testId: Number(param.testId),
    content: '',
    answer4: '',
    answer3: '',
    answer2: '',
    answer1: '',
    correctAnswer: 1,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditQuestion(prev => ({ ...prev, [name]: String(value) }));
  };
  

  const handleEdit = (question: any) => {
    setEditingQuestionId(question.questionId);
    setEditQuestion({
      ...question
    });
    setIsEditing(true);
    questionsQuery.refetch();
  };

  const updateQuestion = async () => {
    try {
      questionsQuery.refetch();

      const res = await axios.put(`https://localhost:5433/api/Questions/${editQuestion.questionId}`, editQuestion);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async () => {
    try {
      await updateQuestion();
      questionsQuery.refetch();
      resetEditingState();
    } catch (error) {
      console.error(error);
    }
  };

  function resetEditingState() {
    setIsEditing(false);
    setEditingQuestionId(null);
    setEditQuestion({
    questionId: 0,
    testId: Number(param.testId),
    content: '',
    answer4: '',
    answer3: '',
    answer2: '',
    answer1: '',
    correctAnswer: 1,
    });
  }
  
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
        
        <AddQuestion testId={Number(param.testId)} />
          
        <div className=" min-h-[500px] w-[80%] ">
          
            <div className="flex flex-col justify-between items-start w-full mb-6 mt-8 p-12 bg-gray-300 shadow-lg rounded-xl">
              
            {questionsQuery &&
              questionsQuery.data
                ?.filter((question: Question) => question.testId == Number(param.testId)
                )
                .map((question: Question, index: number) => (
                  <div key={question.questionId} className=" w-full flex justify-between ">
                    <div  className="flex flex-col mb-12 text-lg">

                    {editingQuestionId === question.questionId ? (
                      <div className="flex flex-col items-start text-center min-w-[600px]">
                        <label className='flex w-full h-full text-center justify-between text-base'>Câu hỏi: <input className='h-[39px] w-[85%]' type="text" name="content" value={editQuestion.content} onChange={handleChange} /></label>
                        <label className='flex w-full h-full text-center justify-between text-base' htmlFor=""> Đáp án 1: <input className='h-[39px] w-[85%] mt-1' type="text" name="answer1" value={editQuestion.answer1} onChange={handleChange} /></label>
                        <label className='flex w-full h-full text-center justify-between text-base' htmlFor=""> Đáp án 2: <input className='h-[39px] w-[85%] mt-1' type="text" name="answer2" value={editQuestion.answer2} onChange={handleChange} /></label>
                        <label className='flex w-full h-full text-center justify-between text-base' htmlFor=""> Đáp án 3: <input className='h-[39px] w-[85%] mt-1' type="text" name="answer3" value={editQuestion.answer3} onChange={handleChange} /></label>
                        <label className='flex w-full h-full text-center justify-between text-base' htmlFor=""> Đáp án 4: <input className='h-[39px] w-[85%] mt-1' type="text" name="answer4" value={editQuestion.answer4} onChange={handleChange} /></label>
                        <label className='flex w-full h-full text-center justify-between text-base' htmlFor=""> Đáp án đúng: <input className='h-[39px] w-[20%] mt-1' type="number" min={1} max={4} name="correctAnswer" value={editQuestion.correctAnswer} onChange={handleChange} /></label>
                        {isEditing && (
                          <div className="flex justify-around items-center text-light font-semibold text-lg w-full mt-4">
                          <button className="bg-blue-500 hover:bg-blue-700 py-1 w-1/3 rounded-lg" onClick={handleUpdate}>
                            Thay đổi
                          </button>
                          <button className="bg-red-500 hover:bg-red-700 py-1 w-1/3 rounded-lg" onClick={resetEditingState}>
                            Hủy
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div key={question.questionId} className="flex flex-col">
                     <h2 className='mb-5 '>
                      <span className='font-semibold'>Câu {index + 1}:</span> {question.content} 
                      </h2>
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
                  )}
 
                  </div>
                  <div className="flex flex-col">
                    <div onClick={() => handleEdit(question)} className=""><EditIcon className=' ml-5 !h-8 !w-8 cursor-pointer' /></div>
                    <div onClick={() => handleDeleteClick(Number(question.questionId))} className="">
                      <TrashIcon  className='mt-6 text-red-700 ml-5 !h-8 !w-8 cursor-pointer' />
                    </div>
                  </div>
                  
                  </div>
                  
                ))
            }
            {showDeleteModal && <ModalDelete onClose={handleDeleteClose} onConfirm={handleDeleteConfirm} questionId={deletingQuestionId} />}
  
            </div>
          
            <div className='flex justify-center'>
              <Link href={`/admin`} className='bg-blue-600 hover:bg-blue-800 text-white h-full w-[150px] rounded-2xl text-xl font-semibold mt-10 text-center py-2' >Thoát</Link>
            </div>
            {showModal && <ModalAdmin onClose={handleClose} onConfirm={handleConfirm} />}
        </div>
    
    </div>
    </main>
  );
}
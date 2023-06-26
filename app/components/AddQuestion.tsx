import React, { useState, useRef, FormEvent } from 'react'
import { useMutation, useQuery  } from '@tanstack/react-query'
import { createQuestion, getQuestions } from '../api/questions'
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation'
import { getTestById } from '../api/tests';
import axios from 'axios';

interface Props {
  testId: number // thêm props để nhận giá trị của testId
}

const AddQuestion = ({ testId }: Props) => {
  const params = useSearchParams()

  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLInputElement>(null);
  const answer1Ref = useRef<HTMLInputElement>(null);
  const answer2Ref = useRef<HTMLInputElement>(null);
  const answer3Ref = useRef<HTMLInputElement>(null);
  const answer4Ref = useRef<HTMLInputElement>(null);
  const correctAnswerRef = useRef<HTMLSelectElement>(null);
  const param = useParams()
  const queryClient = useQueryClient()
  const [isCreate, setIsCreate] = useState(false);

  const questionsQuery = useQuery({
    queryKey: ["questions"],
    queryFn:getQuestions,
  })

  const testQuery = useQuery({
    queryKey: ['test', param.testId],
    queryFn: () => getTestById(param.testId),
  });
  

  const updateTestMutation = useMutation((updatedTest) => {
    return axios.put(`https://localhost:5433/Tests/${param.testId}`, updatedTest);
  }, {
    onSuccess: () => {
      testQuery.refetch();
    },
  });

  const {status ,error, mutate, } = useMutation({
    mutationFn: createQuestion,
    onSuccess: newQuestion => {
      queryClient.setQueryData(["questions", newQuestion.questionId], newQuestion);
      questionsQuery.refetch(); // load lại dữ liệu sau khi thêm thành công
    },
  });
  
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    mutate({
      testId: testId,
      content: contentRef.current!.value,
      answer1: answer1Ref.current!.value,
      answer2: answer2Ref.current!.value,
      answer3: answer3Ref.current!.value,
      answer4: answer4Ref.current!.value,
      correctAnswer: Number(correctAnswerRef.current!.value),
    })
      setOpen(false);
      if (testQuery.data && testQuery.data.testAmount) {
        const updatedTest = {
          ...testQuery.data,
          testAmount: testQuery.data.testAmount + 1,
        };
        updateTestMutation.mutate(updatedTest);
        
      }
    }

  return (
    <div className='container mx-auto flex items-end justify-end ml-10' >
      {status === "error" && JSON.stringify(error)}
      <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold mt-8 py-2 px-4 rounded mr-48" onClick={() => setOpen(true)}>
                Thêm câu hỏi
      </button>
      {open &&(
        <div className="absolute z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor='content' className="block text-gray-700 text-sm font-bold mb-2">Nội dung câu hỏi: </label>
                            <input id='content' ref={contentRef} type="text"  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor='answer1' className="block text-gray-700 text-sm font-bold mb-2">Đáp án 1: </label>
                            <input id='answer1' type="text" ref={answer1Ref} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div> 
                        <div className="mb-4">
                            <label htmlFor='answer2'className="block text-gray-700 text-sm font-bold mb-2">Đáp án 2: </label>
                            <input id='answer2' type="text" ref={answer2Ref} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div> 
                        <div className="mb-4">
                            <label htmlFor='answer3' className="block text-gray-700 text-sm font-bold mb-2">Đáp án 3: </label>
                            <input id='answer3' type="text" ref={answer3Ref} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div> 
                        <div className="mb-4">
                            <label htmlFor='answer4' className="block text-gray-700 text-sm font-bold mb-2">Đáp án 4: </label>
                            <input id='answer4' type="text" ref={answer4Ref} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div> 
                        <div className="mb-4">
                            <label htmlFor='correctAnswer' className="block text-gray-700 text-sm font-bold mb-2">Đáp án đúng: </label>
                            <select id='correctAnswer' ref={correctAnswerRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option value="1">Đáp án 1</option>
                                    <option value="2">Đáp án 2</option>
                                    <option value="3">Đáp án 3</option>
                                    <option value="4">Đáp án 4</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                {isCreate ? "Thêm câu hỏi" : "Lưu"}
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setOpen(false)}>Hủy</button>
                        </div>
                    </form>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddQuestion;
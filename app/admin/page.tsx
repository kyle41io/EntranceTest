"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import  {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
import { deleteTest, getTests} from '../api/tests'
import AddTest from '../components/AddTest'
import { EditIcon } from '../components/Icon'

const MotionLink = motion(Link);

interface EditTest {
    testId: number;
    testName: string;
    questionAmount: string;
    testTime: string;
    testDesc: string;
  }

export default function AdminHome() {
  
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(false);
  const [editingTestId, setEditingTestId] = useState(null);

  const testsQuery = useQuery({
      queryKey: ["tests"],
      queryFn:getTests,
  })
  function handleDelete(testId: any) {
    deleteTest(testId)
      .then(() => {
        // Xóa test thành công, cập nhật UI hoặc thực hiện các thao tác khác
        testsQuery.refetch();// Làm mới danh sách các bài test
        setOpen(false)
      })
      .catch(error => {
        // Xóa test thất bại, xử lý lỗi tại đây
        console.error(error);
      });
  }
  
  const [editTest, setEditTest] = useState<EditTest>({
    testId: 0,
    testName: '',
    questionAmount: '',
    testTime: '',
    testDesc: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditTest(prev => ({ ...prev, [name]: value }));
  };
  // const handleEdit = (test: any) => {
  //   setEditTest(test);
  //   setState(true);
  // };
  const handleEdit = (test: any) => {
    setEditingTestId(test.testId);
    setEditTest({
      testId: test.testId,
      testName: test.testName,
      questionAmount: test.questionAmount,
      testTime: test.testTime,
      testDesc: test.testDesc
    });
    setState(true);
    testsQuery.refetch();
  };
  

  const updateTest = async () => {
    try {
      testsQuery.refetch();

      const res = await axios.put(`https://localhost:5433/api/TestLists/${editTest.testId}`, editTest);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = () => {
    updateTest();
    setState(false);
    testsQuery.refetch();
  };
  
  // const testUpdateQuery = useQuery({
  //   queryKey: ["tests"],
  //   queryFn: updateTest,
  // })
  const testDeleteQuery = useQuery({
    queryKey: ["tests"],
    queryFn: deleteTest,
  })
  
  if(testsQuery.status === "loading"){return <h1 className='w-full h-screen'>Loading...</h1>}
  if(testsQuery.status === "error"){return <h1 className='w-full h-screen'>{JSON.stringify(testsQuery.error)}</h1>}


 
  return (
    
    <main>
      <AddTest />

      <div className=" w-full min-h-screen grid grid-cols-12 gap-24 px-32 my-20">
      {testsQuery.data.map((test: any) => (
        <div key={test.testId} className="overflow-hidden flex flex-col h-60 col-span-4 bg-gray-300 rounded-3xl">
          <div className="" onClick={() => handleEdit(test)}><EditIcon className="ml-4 mt-1 !w-8 !h-8"  /></div>
          {editingTestId === test.testId ? (
            <div className="flex flex-col items-center text-center w-full">
              <input type="text" name="testName" value={editTest.testName} onChange={handleChange} />
              <input type="text" name="questionAmount" value={editTest.questionAmount} onChange={handleChange} />
              <input type="text" name="testTime" value={editTest.testTime} onChange={handleChange} />
              <input type="text" name="testDesc" value={editTest.testDesc} onChange={handleChange} />
              <div className=" text-light font-semibold text-lg w-full">
                <button className="bg-blue-700 py-1 w-1/2" onClick={handleUpdate}>
                  Thay đổi
                </button>
                <button className="bg-red-600 py-1 w-1/2" onClick={() => setState(false)}>
                  Hủy
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center w-full">
              <h2 className="text-2xl font-bold text-gray-800 my-2">{test.testName}</h2>
              <h3 className="mr-2">Số câu hỏi: {test.questionAmount} câu</h3>
              <h3 className="mb-4">Thời gian: {test.testTime}</h3>
              <p>{test.testDesc}</p>
              <div className="mt-8 text-light font-semibold text-lg w-full">
                <button className="bg-blue-700 py-1 w-1/2">
                  <Link href={`/admin/test/${test.testId}`}>Chi tiết</Link>
                </button>
                <button className="bg-red-600 py-1 w-1/2" onClick={() => setOpen(true)}>
                  Xóa
                </button>
              </div>
            </div>
          )}
          {open && (
            <div className="absolute z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-20 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h2 className="text-center">Bạn có muốn xóa bài test này</h2>
                    <button
                      onClick={() => handleDelete(test.testId)}
                      className="bg-red-600 py-1 w-1/2 mx-4 my-4"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="bg-gray-700 py-1 w-1/2 mx-4 my-4"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
                
      </div>
      
    </main>
  )
    
}




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
    testAmount: number;
    testTime: string;
    testDesc: string;
  }

export default function AdminHome() {
  
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(false);
  const [editingTestId, setEditingTestId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
    testAmount: 0,
    testTime: '',
    testDesc: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditTest(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (test: any) => {
    setEditingTestId(test.testId);
    setEditTest({
      ...test
    });
    setIsEditing(true);
    testsQuery.refetch();
  };

  const updateTest = async () => {
    try {
      testsQuery.refetch();

      const res = await axios.put(`https://localhost:5433/Tests/${editTest.testId}`, editTest);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async () => {
    try {
      await updateTest();
      resetEditingState();
      testsQuery.refetch();
    } catch (error) {
      console.error(error);
    }
  };

  function resetEditingState() {
    setIsEditing(false);
    setEditingTestId(null);
    setEditTest({
      testId: 0,
      testName: '',
      testAmount: 0,
      testTime: '',
      testDesc: ''
    });
  }
  
  const testDeleteQuery = useQuery({
    queryKey: ["tests"],
    queryFn: deleteTest,
  })
  
  if(testsQuery.status === "loading"){return <h1 className='w-full h-screen'>Loading...</h1>}
  if(testsQuery.status === "error"){return <h1 className='w-full h-screen'>{JSON.stringify(testsQuery.error)}</h1>}
 
  
  return (
    
    <main>
      <AddTest />

      <div className=" w-full min-h-screen grid grid-cols-12 gap-24 px-40 my-12">
      {testsQuery.data.map((test: any) => (
        <div key={test.testId} className="overflow-hidden flex flex-col h-60 col-span-4 bg-gray-300 rounded-3xl">
          <div className="" onClick={() => handleEdit(test)}><EditIcon className="ml-4 mt-0.5 !w-8 !h-8 hover:cursor-pointer"  /></div>
          {editingTestId === test.testId ? (
            <div className="flex flex-col items-center text-center w-full">
              <input className='h-[39px]' type="text" name="testName" value={editTest.testName} onChange={handleChange} />
              <input className='h-[39px] mt-1' type="text" name="testAmount" value={editTest.testAmount} onChange={handleChange} />
              <input className='h-[39px] mt-1' type="number" name="testTime" value={editTest.testTime} onChange={handleChange} />
              <input className='h-[39px] mt-1' type="text" name="testDesc" value={editTest.testDesc} onChange={handleChange} />
              {isEditing && (
                <div className=" text-light font-semibold text-lg w-full">
                  <button className="bg-blue-500 hover:bg-blue-700 py-1 w-1/2" onClick={handleUpdate}>
                    Thay đổi
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 py-1 w-1/2" onClick={resetEditingState}>
                    Hủy
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center justify-between w-full h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{test.testName}</h2>
              <h3 className="mr-2">Số câu hỏi: {test.testAmount} câu</h3>
              <h3 className="mb-0.5">Thời gian: {test.testTime} phút</h3>
              <p className='mx-2'>{test.testDesc}</p>
              <div className="text-light font-semibold text-lg w-full">
                <button className="bg-blue-500 hover:bg-blue-700 py-1.5 w-1/2">
                  <Link href={`/admin/test/${test.testId}`}><a>Chi tiết</a> </Link>
                </button>
                <button className="bg-red-500 hover:bg-red-700 py-1.5 w-1/2" onClick={() => setOpen(true)}>
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
                    <h2 className="text-center text-xl">Bạn có muốn xóa bài test này</h2>
                    <div className="flex text-light font-semibold mt-2">
                      <button
                      onClick={() => handleDelete(test.testId)}
                      className="bg-red-500 hover:bg-red-700 py-1 w-1/2 mx-4 my-4 rounded-md"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="bg-blue-500 hover:bg-blue-700 py-1 w-1/2 mx-4 my-4 rounded-md"
                    >
                      Hủy
                    </button></div>
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




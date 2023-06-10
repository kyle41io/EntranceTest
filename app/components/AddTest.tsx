import React, { useState, useRef, FormEvent } from 'react'
import { useMutation, useQuery  } from '@tanstack/react-query'
import { createTest, deleteTest, getTests } from '../api/tests'
import { QueryClient, useQueryClient } from '@tanstack/react-query';





const AddTest = () => {
  const [open, setOpen] = useState(false);
  const testNameRef = useRef<HTMLInputElement>(null);
  const testDescRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient()
  const [isCreate, setIsCreate] = useState(false);
  const testsQuery = useQuery({
    queryKey: ["tests"],
    queryFn:getTests,
  })
  

  const {status ,error, mutate, } = useMutation({
    mutationFn: createTest,
    onSuccess: newTest => {
      queryClient.setQueryData(["tests", newTest.testId], newTest);
      testsQuery.refetch();
    },
  });
  
  // console.log("error",error)
  

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    mutate({
      testName: testNameRef.current!.value,
      testDesc: testDescRef.current!.value,

    })
      setOpen(false);
      
    }

  return (
    <div className='container mx-auto flex items-end justify-end ml-10' >
      {status === "error" && JSON.stringify(error)}
      <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-24" onClick={() => setOpen(true)}>
                Thêm bài test
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
                            <label htmlFor='testName' className="block text-gray-700 text-sm font-bold mb-2">Tên bài test: </label>
                            <input id='testName' ref={testNameRef} type="text"  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor='testDesc' className="block text-gray-700 text-sm font-bold mb-2">Mô tả: </label>
                            <input id='testDesc' type="text" ref={testDescRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div> 
                        
                        <button type="submit" disabled={status === "loading"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Thêm</button>
                        <button type="button" onClick={() => setOpen(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-6">Thoát</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
      )
        }
    </div>
  )
}

export default AddTest
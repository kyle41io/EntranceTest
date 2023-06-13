"use client"
import React, { useState, useRef, FormEvent } from 'react'
import { useMutation, useQuery  } from '@tanstack/react-query'
import { createMember, getMembers} from '../api/members'
import { QueryClient, useQueryClient } from '@tanstack/react-query';


export default function AddMember() {
    const [open, setOpen] = useState(false);
    
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const dateOfBirthRef = useRef<HTMLInputElement>(null);
    const avatarRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLInputElement>(null);


    
    const queryClient = useQueryClient()
    const [isCreate, setIsCreate] = useState(false);
    // const membersQuery = useQuery({
    //   queryKey: ["members"],
    //   queryFn:getMembers,
    // })
    
  
    const {status ,error, mutate, } = useMutation({
      mutationFn: createMember,
      onSuccess: newMember => {
        queryClient.setQueryData(["members"], newMember);
        queryClient.fetchQuery
      },
    });
    
    // console.log("error",error)
    
  
    function handleSubmit(e: FormEvent) {
      e.preventDefault()
      mutate({
        firstName: firstNameRef.current!.value,
        lastName: lastNameRef.current!.value,
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
        confirmPassword: confirmPasswordRef.current!.value,
        dateOfBirth: dateOfBirthRef.current!.value,
        avatar: avatarRef.current!.value,
        status: Number(statusRef.current!.value),
      })
        setOpen(false);
        
      }
  

    return (
        <div className="container mx-auto flex items-end justify-end ml-10">
            <button className="mr-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-8" onClick={() => setOpen(true)}>
                Thêm thành viên
            </button>
            {open && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                                        <input type="text" name="firstName"  ref={firstNameRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                                        <input type="text" name="lastName"  ref={lastNameRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                        <input type="email" name="email"  ref={emailRef}className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                                        <input type="password" name="password"  ref={passwordRef}className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
                                        <input type="password" name="confirmPassword"  ref={confirmPasswordRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth:</label>
                                        <input type="date" name="dateOfBirth"  ref={dateOfBirthRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Avatar:</label>
                                        <input type="text" name="avatar"  ref={avatarRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
                                        <input type="text" name="status"  ref={statusRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Thêm</button>
                                    <button type="button" onClick={() => setOpen(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-6">Thoát</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

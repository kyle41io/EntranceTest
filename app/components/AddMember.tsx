"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

export default function AddMember() {
    const [open, setOpen] = useState(false);
    const [member, setMember] = useState({
        memberId: '',
        memberName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        phone: '',
        avatar: '',
        status: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setMember({
            ...member,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const memberId = uuidv4();
        const signUpDate = new Date();
        const testAmount = 0;
        const newMember = { ...member, memberId, signUpDate, testAmount };
        await axios.post('http://localhost:5000/api/members', newMember);
        setOpen(false);
    }

    return (
        <div className="container mx-auto flex items-end justify-end ml-10">
            <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-24" onClick={() => setOpen(true)}>
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
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Member Name:</label>
                                        <input type="text" name="memberName" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                        <input type="email" name="email" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                                        <input type="password" name="password" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth:</label>
                                        <input type="date" name="dateOfBirth" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
                                        <input type="text" name="phone" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Avatar:</label>
                                        <input type="text" name="avatar" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
                                        <input type="text" name="status" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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

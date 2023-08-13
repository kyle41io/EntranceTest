import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../api/users"
import { EditIcon } from '../components/Icon'
import { useState } from "react"
import axios from "axios";
import TestHistoryList from "./TestHistoryList";
import React from 'react'


interface EditUser {
  email: string;
  isAdmin: Boolean;
  isActive: Boolean
}
export default function UserList() {
  const [editingEmail, setEditingEmail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState<EditUser>({
    email: '',
    isAdmin: false,
    isActive: false,
  });
  const [showModal, setShowModal] = useState(false);
  
  const usersQuery = useQuery({
      queryKey: ["users"],
      queryFn:getUsers,
    })
    
    if(usersQuery.status === "loading"){return <h1 className='w-full min-h-screen'>Loading...</h1>}
    if(usersQuery.status === "error"){return <h1 className='w-full min-h-screen'>{JSON.stringify(usersQuery.error)}</h1>}
  
  //edit user

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser(prev => ({ ...prev, [name]: String(value) }));
  };
  

  const handleEdit = (user: any) => {
    setEditingEmail(user.email);
    setEditUser({
      ...user
    });
    setIsEditing(true);
    usersQuery.refetch();
  };

  const updateUser = async () => {
    try {
      usersQuery.refetch();
      const res = await axios.put(`https://localhost:5433/api/AdminModUser/${editUser.email}`, editUser);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async () => {
    try {
      await updateUser();
      usersQuery.refetch();
      resetEditingState();
    } catch (error) {
      console.error(error);
    }
  };

  function resetEditingState() {
    setIsEditing(false);
    setEditingEmail(null);
    setEditUser({
      email: '',
      isAdmin: false,
      isActive: false,
    });
  }
  //modal
  const handleShowModal = (email: any) => {
    setSelectedUser(email);
    setShowModal(true);
  };
  

  return (
    
    <div className="px-4 mt-4 sm:px-6 lg:px-8 min-h-[300px] bg-white mx-40">
      
      <div className="mt-4 flow-root mx-20">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-2 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Thành viên
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Số ĐT
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Chức danh
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Các test tham gia
                  </th>
                  
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {usersQuery.data.map((user: any) => (
                  <tr key={user.email}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img className="h-11 w-11 rounded-full " src={user.avatar} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{user.firstName}  {user.lastName}
                          </div>
                          <div className="mt-1 text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{user.phoneNumber}</div>
                    </td>

                    {editingEmail === user.email ? (
                      <div className="flex flex-col items-start text-center min-w-[100px]">
                        <div className="flex">
  <label className='flex w-full h-full text-center justify-between text-base' htmlFor="">
    Admin: <input className=' mt-1' type="checkbox" name="isAdmin" checked={editUser.isAdmin} onChange={handleChange} />
  </label>
  <label className='flex w-full h-full text-center justify-between text-base' htmlFor="">
    Hoạt động: <input className=' mt-1' type="checkbox"  name="isActive" checked={editUser.isActive} onChange={handleChange} />
  </label>
</div>
                        
                        {isEditing && (
                          <div className="flex items-center text-light font-semibold w-full mt-4">
                          <button className="bg-blue-500 hover:bg-blue-700 py-1 w-1/2 rounded-lg" onClick={handleUpdate}>
                            Thay đổi
                          </button>
                          <button className="bg-red-500 hover:bg-red-700 py-1 w-1/2 rounded-lg" onClick={resetEditingState}>
                            Hủy
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (

                    <>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        
                        <div className="flex">
                        <div onClick={() => handleEdit(user)} className=""><EditIcon className="!w-6 !h-6 hover:cursor-pointer -ml-5 mr-2 "/></div>
                          <span className={
                            `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                              user.isAdmin === false ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                              user.isAdmin === true ? 'bg-violet-50 text-violet-700 ring-violet-600/20' :
                              'bg-blue-50 text-blue-700 ring-blue-600/20'
                            }`
                          }>
                            {user.isAdmin === false ? 'Thành viên' : user.isAdmin === true ? 'Admin' : 'Không xác định'}
                          </span>
                          
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="flex">
                          
                          <span className={
                            `inline-flex items-center rounded-md px-2 py-true text-xs font-medium ring-true ring-inset ${
                              user.isActive === false ? 'p-1 bg-red-50 text-red-700 ring-red-600/20' :
                              user.isActive === true ? 'p-1 bg-green-50 text-green-700 ring-green-600/20' : 
                              'bg-red-50 text-red-700 ring-red-600/20'
                            }`
                          }>
                            {user.isActive === false ? 'Tắt hoạt động' : user.isActive === true ? 'Hoạt động' : 'Không xác định'}
                          </span>
                          
                        </div>
                      </td>
                    </>
                  )}  
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{user.testAmount}</td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-left text-sm font-medium sm:pr-0">
                    <button
              className="text-indigo-600 hover:text-indigo-900 p-2 rounded-md bg-slate-200 hover:bg-slate-400"
              onClick={() => handleShowModal(user.email)}
            >
              Chi tiết
            </button>
            {showModal && selectedUser && selectedUser === user.email && (
                      <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen w-full pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-40"></div>
                          </div>
                          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              
                              <TestHistoryList email={user.email} />

                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)}>
                                Đóng
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    </td>
                  </tr>
            ))}
              </tbody>
            </table>
          </div>
        </div>               
      </div>
    </div>
  )
}

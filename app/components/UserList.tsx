import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../api/users"
import { EditIcon } from '../components/Icon'
import { useState } from "react"
import axios from "axios";

interface EditUser {
  id: string;
  isAdmin: Boolean;
  isActive: Boolean
}
export default function UserList() {
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState<EditUser>({
    id: '',
    isAdmin: false,
    isActive: false,
  });
  
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
    setEditingId(user.id);
    setEditUser({
      ...user
    });
    setIsEditing(true);
    usersQuery.refetch();
  };

  const updateUser = async () => {
    try {
      usersQuery.refetch();

      const res = await axios.put(`https://localhost:5433/api/AdminModUser/${editUser.id}`, editUser);
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
    setEditingId(null);
    setEditUser({
      id: '',
      isAdmin: false,
      isActive: false,
    });
  }

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
                    Số bài test tham gia
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

                    {editingId === user.d ? (
                      <div className="flex flex-col items-start text-center min-w-[100px]">
                        <div className="flex">
                          <label className='flex w-full h-full text-center justify-between text-base' htmlFor=""> Admin: <input className=' mt-1' type="checkbox" name="isAdmin" value={editUser.isAdmin ? "true" : "false"} onChange={handleChange} /></label>
                          <label className='flex w-full h-full text-center justify-between text-base' htmlFor=""> Hoạt động: <input className=' mt-1' type="checkbox" min={1} max={4} name="isActive" value={editUser.isActive ? "true" : "false"} onChange={handleChange} /></label>
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
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900 p-2 rounded-md bg-slate-200 hover:bg-slate-400">
                        Chi tiết<span className="sr-only">, {user.lastName}</span>
                      </a>
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

import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../api/users"



export default function UserList() {
  const usersQuery = useQuery({
      queryKey: ["users"],
      queryFn:getUsers,
    })
    
    if(usersQuery.status === "loading"){return <h1 className='w-full h-screen'>Loading...</h1>}
    if(usersQuery.status === "error"){return <h1 className='w-full h-screen'>{JSON.stringify(usersQuery.error)}</h1>}
  
  return (
    

    <div className="px-4 mt-4 sm:px-6 lg:px-8 min-h-[300px] bg-white mx-40">
      
      <div className="mt-4 flow-root mx-20">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Thành viên
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Số ĐT
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Số bài test tham gia
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {usersQuery.data.map((user: any) => (
                  <tr key={user.email}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img className="h-11 w-11 rounded-full " src={user.Avatar} alt="" />
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
                     {/* <div className="mt-1 text-gray-500">{user.Role}</div> */}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span className={
                          `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                            user.role === 0 ? 'bg-gray-50 text-gray-700 ring-gray-600/20' :
                            user.role === 1 ? 'bg-green-50 text-green-700 ring-green-600/20' :
                            user.role === 2 ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                            'bg-red-50 text-red-700 ring-red-600/20'
                          }`
                        }>
                          {user.role === 0 ? 'Tắt hoạt động' : user.role === 1 ? 'Hoạt động' : user.role === 2 ? 'Admin' : 'Không xác định'}
                        </span>
                      </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{user.testAmount}</td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4 p-3 rounded-md bg-slate-200">
                        Chi tiết<span className="sr-only">, {user.name}</span>
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

"use client"
import AddUser from '@/app/components/AddUser'

import UserList from '@/app/components/UserList'


export default function UserManage() {
  return (
    <main className=" w-full min-h-screen mb-16 ">
      <AddUser />
      <UserList />
    </main>
  )
}

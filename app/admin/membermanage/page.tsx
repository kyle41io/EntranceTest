"use client"
import AddMember from '@/app/components/AddMember'

import MemberList from '@/app/components/MemberList'


export default function MemberManage() {
  return (
    <main className=" w-full min-h-screen ">
      <AddMember />
      <MemberList />
    </main>
  )
}

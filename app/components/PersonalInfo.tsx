"use client"
import React from 'react'

const PersonalInfo = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className='flex flex-col items-start pl-6 justify-center absolute w-1/5 left-40 h-full bg-gray-300 -z-10'>
      <p className='my-4'>Avatar: {user.avatar}</p>
      <p className='my-4'>Họ tên: {user.firstName} {user.lastName}</p>
      <p className='my-4'>Email: {user.email}</p>
      <p className='my-4'>Số điện thoại: {user.phoneNumber}</p>
      <p className='my-4'>Số lần test: {user.testAmount}</p>
      <p className='my-4'>Ngày sinh: {user.dateOfBirth}</p>
      <p className='my-4'>Quyền truy cập: {user.isAdmin ? 'Admin' : 'Thành viên'}</p> 
    </div>
  )
}

export default PersonalInfo
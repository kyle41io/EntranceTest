"use client"
import { useState, useEffect, ReactNode, Key } from 'react';
import axios from 'axios';
import React from 'react'
import Logo from '../../../../public/img/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import ProfilePic from '../../../../public/img/1389952697.png'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getTestById } from '../../../api/tests'
import { useParams, useSearchParams } from 'next/navigation'
import { deleteQuestion, getQuestions } from '@/app/api/questions';
import { EditIcon, TrashIcon } from '@/app/components/Icon';
import { ModalAdmin, ModalDelete } from '@/app/components/Modal';
import AddQuestion from '@/app/components/AddQuestion';
import TestHistoryOfTest from '@/app/components/TestHistoryOfTest';

const accessToken = localStorage.getItem("accessToken");

export default function TestPage() {
  const params = useSearchParams()
  const page = parseInt(params.get("page")!)||1;
  const param = useParams()

  const testQuery = useQuery({
    queryKey: ['test', param.testId],
    queryFn: () => getTestById(param.testId),
  });
  
  return (
    <main className=" w-full min-h-screen mb-16">
      <div className='w-full fixed top-0 h-16 bg-gray-800 flex items-center justify-between'>
        <Link href='https://kpim.vn' target='_blank'>
          <Image src={Logo} alt={'KPIM'} className='h-10 w-auto ml-[140px] mt-1.5 '  />
        </Link>
        <div className="h-12 min-w-[180px] bg-stone-300 rounded-xl p-2 text-center text-3xl font-semibold mr-[60px]">
          {testQuery.status === 'loading' ? 'Loading...' : testQuery.data.testName}
        </div>
        <Image src={ProfilePic} alt='' className='h-12 p-1 w-auto mr-[140px] bg-white rounded-full' />
      </div>
      <TestHistoryOfTest testId={Number(param.testId)} />
      {/* <div className='flex justify-center'>
           <Link href={`/admin/resultmanage`} className='bg-blue-600 hover:bg-blue-800 text-white h-full w-[150px] rounded-2xl text-xl font-semibold mt-10 text-center py-2' >Thoát</Link>
      </div> */}
    
    </main>
  );
}
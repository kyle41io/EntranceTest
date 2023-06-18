"use client"
import TestHeader from '@/app/components/TestHeader'
import Test from '@/app/components/Test'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';



export default function TestPage() {
  // const router = useRouter();
  // const { testId } = router.query;
  // const [test, setTest] = useState(null);

  // useEffect(() => {
  //   if (testId) {
  //     axios.get(`https://localhost:5433/api/TestLists/{id}`).then(response => {
  //       setTest(response.data);
  //     });
  //   }
  // }, [testId]);

  // if (!test) {
  //   return <div>Loading...</div>;
  // }
  return (
    <main className=" w-full min-h-screen">
      <TestHeader />
      <Test />
    </main>
  )
}

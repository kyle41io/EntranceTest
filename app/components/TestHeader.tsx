import React from 'react'
import Logo from '../../public/img/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import ProfilePic from '../../public/img/1389952697.png'

const TestHeader = () => {
  return (
    <div className='w-full fixed top-0 h-16 bg-gray-800 flex items-center justify-between'>
      
        <Link href='https://kpim.vn' target='_blank'><Image src={Logo} alt={'KPIM'} className='h-10 w-auto ml-[120px] mt-1.5 '  /></Link>
        <div className="h-12 min-w-[180px] bg-stone-300 rounded-xl p-2 text-center text-3xl font-semibold mr-[60px]">Test Name</div>
        <Image src={ProfilePic} alt='' className='h-12 p-1 w-auto mr-[120px] bg-white rounded-full' />
      </div>
      
  )
}

export default TestHeader
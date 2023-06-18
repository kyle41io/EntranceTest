import React from 'react'
import Logo from '../../public/img/logo.png'
import Image from 'next/image'
import MS from '../../public/img/2-4.png'
import TB from '../../public/img/Đã-thông-báo-BCT-768x291.png'
import { FacebookIcon, LinkedInIcon, YoutubeIcon, InstaIcon, MapIcon, PhoneIcon, MailIcon } from './Icon'
import Link from 'next/link'


const Footer = () => {
  return (
    <footer className='relative bottom-0 flex items-center justify-between w-full min-h-[260px] bg-gray-800 px-40 '>
      <div className="flex flex-col w-56">
        
        <div className="flex">
          <Image src={Logo} alt='' className='h-8 w-auto ' />
          <Image src={MS} alt='' className='h-16 w-auto -mt-3 ml-3 ' />
        </div>
        <div className="flex flex-col">
          <h2 className='text-white font-semibold'>CÔNG TY CỔ PHẦN KPIM</h2>
          <p className='text-white text-base font-light'>Giấy chứng nhận ĐKKD số 0109280316 do Sở Kế hoạch và Đầu tư TP. Hà Nội cấp ngày 24/07/2020</p>
          <Image src={TB} alt='' className='h-10 w-28 ml-2 mt-3' />
        </div>

      </div>
      <div className="flex ">
        <Link href={'https://www.facebook.com/kpim.vn'} target='_blank'><FacebookIcon className='!w-[40px] h-auto mx-7 ' /></Link> 
        <Link href={'https://www.youtube.com/c/KPIMvn'} target='_blank'><YoutubeIcon className='!w-[40px] h-auto mx-7' /></Link> 
        <Link href={'https://www.instagram.com/kpim.vn/'} target='_blank'><InstaIcon className='!w-[40px] h-auto mx-7' /></Link>
        <Link href={'https://www.linkedin.com/company/kpim/'} target='_blank'><LinkedInIcon className='!w-[36px] h-auto mx-7' /></Link>
      </div>
      <div className="w-56 ">
        <h2 className='text-white font-semibold text-3xl mb-5'>Liên hệ</h2>
        <div className="flex text-white"><MapIcon className='mr-3 !w-[55px]'/><p>Số 39 Châu Long, Phường Trúc Bạch, Quận Ba Đình, TP. Hà Nội</p></div>
        <div className="flex text-white my-5"><PhoneIcon className='mr-3 !w-[22px]'/><p>091 668 2020</p></div>
        <div className="flex text-white"><MailIcon className='mr-3 !w-[22px]'/><p>info@kpim.vn</p></div>
      </div>
      
    </footer>
  )
}

export default Footer
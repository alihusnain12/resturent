'use client';
import React from 'react';
import pic from "../app/public/assets/tacos1.webp";
import Image from 'next/image';
import { TbMessageFilled } from "react-icons/tb";
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const subscribePage = () => {
    router.push("/subscribe");
  };
  const messgepage = () => {
    router.push("/messages");
  };

  return (
    <div className='w-screen h-screen flex flex-col relative'>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-sm flex justify-between items-center p-4 z-10">
        <h1 className="text-2xl font-bold animate-bounce bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          TacosDeCrema
        </h1>
        <button onClick={subscribePage} className="bg-[#ed0d1ffa] text-white p-2 rounded-lg shadow hover:bg-white hover:text-black focus:outline-none">
          Subscribe
        </button>
      </nav>
      {/* Blurred Background Image */}
      <div className='relative flex-1 w-full'>
        <Image 
          src={pic} 
          layout="fill" 
          objectFit="cover" 
          objectPosition="center" 
          alt="Tacos" 
          className="blur-sm"
        />
        {/* Heading */}
        <div className='absolute inset-0 flex flex-col justify-center items-center text-center p-4'>
          <h1 className='text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-md'>
            Welcome to TacosDeCrema
          </h1>
          <p className='text-xl md:text-2xl text-gray-300 mt-4'>Experience authentic Mexican flavors like never before</p>
        </div>
      </div>
      {/* Floating Mini Card with Message Button */}
      <div className="fixed bottom-4 right-4 cursor-pointer">
        <div className="bg-blue-500 p-2 md:p-4 rounded-lg shadow-lg flex items-center"onClick={messgepage}>
          <TbMessageFilled size={20} className="mr-2 md:hidden" />
          <TbMessageFilled size={30} className="mr-2 hidden md:block" />
          <span className="text-white text-sm md:text-base">Message</span>
        </div>
      </div>
    </div>
  );
};

export default Page;

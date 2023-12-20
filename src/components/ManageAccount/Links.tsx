"use client";

import React from 'react'
import LinksRow from './LinksRow'
import Image from 'next/image'

const Links = () => {
  const [allSelected, setAllSelected] = React.useState(false);

  return (
    <div className='h-full flex flex-col gap-4 justify-between items-center'>
      <div className='flex w-full items-center pl-8 gap-4'>
        <button onClick={()=>{setAllSelected(!allSelected)}} className='w-6 h-[1.43rem] bg-[#FFFFFF] rounded-sm'>
          {allSelected ? (
            <Image src="/checked-icon-white.svg" alt='check' width={24} height={24}/>
          ):(
            <Image src="/not-checked-icon-white.svg" alt='uncheck' width={24} height={24}/>
          )}
        </button>
        <p>Select All</p>
      </div>
      
      <div className='w-full h-[27rem] flex flex-col gap-4 mt-3 pr-2 overflow-auto'>
        <LinksRow/>
        <LinksRow/>
        <LinksRow/>
        <LinksRow/>
        <LinksRow/>
        <LinksRow/>
        <LinksRow/>
        <LinksRow/>
        <LinksRow/>
      </div>
    </div>
  )
}

export default Links
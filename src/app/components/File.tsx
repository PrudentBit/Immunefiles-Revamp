import React from 'react'
import Image from 'next/image'

type Props = {}

const File = (props: Props) => {
  return (
    <div className='w-[13.5rem] h-12 bg-primary_bg cursor-pointer rounded-md flex justify-between p-3 items-center'>
      <div className='flex gap-3'>
        <Image src='/folder-icon-filled.svg' width={24} height={24} alt='File icon'/>
        <p className='text-[#8E8EFF] pb-1 truncate w-[75%]'>File nameeeeeee</p>
      </div>
      <div className='text-secondary_font font-medium bg-primary_bg text-2xl leading-[0px] pb-5 p-[0.35rem] px-1 text-center rounded-full hover:bg-[#DADAFF] cursor-pointer'>
        ...
      </div>
    </div>
  )
}

export default File
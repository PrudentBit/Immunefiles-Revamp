import React from 'react'
import Image from 'next/image'

const FileSelectOptions = () => {
  return (
    <div className='flex items-center gap-4'>
      <button className='rounded-full bg-[#F0F0F0] hover:bg-[#DADADA] flex justify-center items-center h-8 w-8'>
              <Image src='/cross-icon.svg' width={12} height={12} alt='Cross icon'/>
            </button>

            <p> x Selected</p>
      <div className='flex gap-4 items-center'>
        <button className='rounded-full p-2 bg-primary_bg  hover:bg-bg_hover'>
          <Image src='/share-icon.svg' width={20} height={20} alt='Share icon'/>
        </button>
        <button className='rounded-full p-2 bg-primary_bg  hover:bg-bg_hover'>
          <Image src='/link-icon.svg' width={20} height={20} alt='Link icon'/>
        </button>
        <button className='rounded-full p-2 bg-primary_bg  hover:bg-bg_hover'>
          <Image src='/copy-icon.svg' width={20} height={20} alt='Copy icon'/>
        </button>
        <button className='rounded-full p-2 bg-primary_bg  hover:bg-bg_hover'>
          <Image src='/move-icon.svg' width={20} height={20} alt='Move icon'/>
        </button>
        <button className='rounded-full p-2 bg-[#FFE3E5]  hover:bg-[#FFCDD0]'>
          <Image src='/delete-icon.svg' width={20} height={20} alt='Delete icon'/>
        </button>
      </div>
    </div>
  )
}

export default FileSelectOptions
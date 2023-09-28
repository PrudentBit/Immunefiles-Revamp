import React from 'react'
import Image from 'next/image'

type Props = {}

const FileOperations = (props: Props) => {
  return (
    <div className='Operations flex justify-between'>
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


        <div className='flex gap-6'>
          <div className='flex gap-5'>
            <button className='flex gap-2 items-center'>
              <Image src='/add_file-icon.svg' width={18} height={18} alt='Add file icon'/>
              <p className=' text-secondary_font font-medium text-sm'>Add File</p>
            </button>
            <button className='flex gap-2 items-center'>
              <Image src='/add_folder-icon.svg' width={18} height={18} alt='Add folder icon'/>
              <p className=' text-secondary_font font-medium text-sm'>Add Folder</p>
            </button>
            <button className='flex gap-2 items-center'>
              <Image src='/request-icon.svg' width={18} height={18} alt='Request icon'/>
              <p className=' text-secondary_font font-medium text-sm'>Request File</p>
            </button>
          </div>

          <button className="bg-primary_bg px-[0.65rem] pb-[0.4rem] rounded-full hover:bg-[#DADAFF] ">
            <p className='leading-[0px] text-3xl text-secondary_font font'>+</p>
          </button>

          <button className="rounded-full bg-primary_bg p-2 hover:bg-[#DADAFF] ">
            <Image src='/upload-icon.svg' width={26} height={26} alt='File icon'/>
          </button>
        </div>
      </div>
  )
}

export default FileOperations
import Image from 'next/image'
import React from 'react'

type Props = {}

const RequestedFile = (props: Props) => {
  return (
    <div className='h-14 w-[13.6rem] flex justify-center px-3 items-center rounded-lg gap-2 border-2 border-dashed border-primary_border bg-bg_hover'>
      <Image src='/file-icon-2.svg' width={24} height={24} alt='file'/>

      <p className="text-primary_font_2 pb-1 truncate w-full mt-1 font-normal">File name</p>

      <button className='flex items-center justify-center rounded-full h-6 min-w-[1.5rem] hover:bg-primary_bg'>
        <Image src='/close-icon.svg' width={12} height={12} alt='remove'/>
      </button>
    </div>
  )
}

export default RequestedFile
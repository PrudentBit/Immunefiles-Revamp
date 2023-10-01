"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

type Props =  {
  file: ItemProps;
  type: string;
}

const File = ({ file }:Props) => {
  const [threeDotsMenu, setThreeDotsMenu] = React.useState(false);

  const extension = file.is_file ? file.name.split('.').pop() : '';
  const iconSrc = file.is_file ? `/FileIcons/${extension}.svg` : '/folder-icon-filled.svg';

  return (
    <>
      {!file.is_file
        ? (
          <Link href={`/filesystem/${file.urlhash}`}>
            <div className='w-[13.5rem] h-12 bg-primary_bg hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center'>
              <div className='flex gap-3'>
                <Image src={iconSrc} width={24} height={24} alt='File icon'/>
                <p className='text-primary_font_2 pb-1 truncate w-[8rem] mt-1'>{file.name}</p>
              </div>
              <button className='text-secondary_font font-medium text-2xl leading-[0px] pb-[1.3rem] p-[0.3rem] px-1 text-center rounded-full hover:bg-button_hover cursor-pointer'>
                ...
              </button>
            </div>
          </Link>
        )
        : (
          
          <div className='w-[13.5rem] h-12 bg-primary_bg hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center'>
          <div className='flex gap-3'>
            <Image src={iconSrc} width={24} height={24} alt='File icon'/>
            <p className='text-primary_font_2 pb-1 truncate w-[8rem] mt-1'>{file.name}</p>
          </div>
          <button className='text-secondary_font font-medium text-2xl leading-[0px] pb-[1.3rem] p-[0.3rem] px-1 text-center rounded-full hover:bg-button_hover cursor-pointer'
            onClick={()=>setThreeDotsMenu(!threeDotsMenu)}>
            ...
          </button>
        </div>
        )
      }

      {threeDotsMenu && (
        <div className='fixed top-[30rem] left-[30rem] w-40 h-20 bg-white rounded-md shadow-md flex flex-col gap-2 p-2'>
          <button className='text-secondary_font font-medium text-2xl leading-[0px] pb-[1.3rem] p-[0.3rem] px-1 text-center rounded-full hover:bg-button_hover cursor-pointer'>
            Rename
          </button>
          <button className='text-secondary_font font-medium text-2xl leading-[0px] pb-[1.3rem] p-[0.3rem] px-1 text-center rounded-full hover:bg-button_hover cursor-pointer'>
            Delete
          </button>
        </div>
        // use shadcn for components
      )}
    </>
  )
}

export default File;


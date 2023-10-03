"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import ThreeDotsMenu from './menus/ThreeDotsMenu';

type Props =  {
  file: ItemProps;
  type: string;
}

const File = ({ file }:Props) => {

  const extension = file.is_file ? file.name.split('.').pop() : '';
  const iconSrc = file.is_file ? `/FileIcons/${extension}.svg` : '/folder-icon-filled.svg';

  return (
    <>
      {!file.is_file
        ? (
          <Link href={`/filesystem/${file.urlhash}`}>
            <div className='w-[14rem] h-12 bg-primary_bg hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center'>
              <div className='flex gap-3'>
                <Image src={iconSrc} width={24} height={24} alt='File icon'/>
                <p className='text-primary_font_2 pb-1 truncate w-[8rem] mt-1 font-[550]'>{file.name}</p>
              </div>

              <ThreeDotsMenu/>
            </div>
          </Link>
        )
        : (
          
          <div className='w-[14rem] h-12 bg-primary_bg hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center'>
            <div className='flex gap-3'>
              <Image src={iconSrc} width={24} height={24} alt='File icon'/>
              <p className='text-primary_font_2 pb-1 truncate w-[8rem] mt-1 font-[550]'>{file.name}</p>
            </div>

            <ThreeDotsMenu/>
          </div>
        )
      }

    </>
  )
}

export default File;


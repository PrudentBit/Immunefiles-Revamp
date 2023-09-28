import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

type Props =  {
  file: ItemProps;
  type: string;
}

const File = ({ file }:Props) => {

  const extension = file.is_file ? file.name.split('.').pop() : '';
  const iconSrc = file.is_file ? `/FileIcons/${extension}.svg` : '/folder-icon-filled.svg';

  return (
    <>
      {file.is_file
        ? (
          <div className='w-[13.5rem] h-12 bg-primary_bg hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center'>
            <div className='flex gap-3'>
              <Image src={iconSrc} width={24} height={24} alt='File icon'/>
              <p className='text-[#8E8EFF] pb-1 truncate w-[8rem] mt-1'>{file.name}</p>
            </div>
            <div className='text-secondary_font font-medium bg-primary_bg text-2xl leading-[0px] pb-5 p-[0.35rem] px-1 text-center rounded-full hover:bg-[#DADAFF] cursor-pointer'>
              ...
            </div>
          </div>
        )
        : (
          <Link href={`/filesystem/${file.urlhash}`}>
            <div className='w-[13.5rem] h-12 bg-primary_bg hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center'>
              <div className='flex gap-3'>
                <Image src={iconSrc} width={24} height={24} alt='File icon'/>
                <p className='text-[#8E8EFF] pb-1 truncate w-[8rem] mt-1'>{file.name}</p>
              </div>
              <div className='text-secondary_font font-medium bg-primary_bg text-2xl leading-[0px] pb-5 p-[0.35rem] px-1 text-center rounded-full hover:bg-[#DADAFF] cursor-pointer'>
                ...
              </div>
            </div>
          </Link>
        )
      }
    </>
  )
}

export default File;


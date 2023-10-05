"use client"

import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link';
import ThreeDotsMenu from './menus/ThreeDotsMenu';
import { selectedFilesStore } from '@/utils/store/selectFilesStore';

type Props =  {
  file: ItemProps;
  type: string;
}

const File = ({ file }:Props) => {
  const [files, addFile, removeAllFiles, removeFile] = selectedFilesStore((state) => [state.files, state.addFile, state.removeAllFiles, state.removeFile]);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(files.some((f) => f.urlhash === file.urlhash));
  }, [files, file]);

  const handleSelect = (event: React.MouseEvent) => {
    if (event.shiftKey) {
      if (isSelected) {
        removeFile(file.urlhash);
        setIsSelected(false);
      } else {
        addFile(file);
        setIsSelected(true);
      }
    } else {
      if (isSelected && files.length === 1) {
        removeAllFiles();
        setIsSelected(false);
      } else {
        removeAllFiles();
        addFile(file);
        setIsSelected(true);
      }
    }
    console.log(files);
  };
  

  const handleDoubleClick = () => {
    window.open(`/filesystem/${file.urlhash}`, '_blank');
  };

  const extension = file.is_file ? file.name.split('.').pop() : '';
  const iconSrc = file.is_file ? `/FileIcons/${extension}.svg` : '/folder-icon-filled.svg';

  return (
    <>
      {!file.is_file
        ? (
          <Link href={`/filesystem/${file.urlhash}`}>
            <div onClick={removeAllFiles} className={`w-[14rem] select-none h-12 bg-primary_bg hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center ${isSelected && 'border-solid border-primary border-[1px]'}`}>
              <div className='flex gap-3'>
                <Image src={iconSrc} width={24} height={24} alt='File icon'/>
                <p className='text-primary_font_2 pb-1 truncate w-[8rem] mt-1 font-[500]'>{file.name}</p>
              </div>

              <ThreeDotsMenu file={file}/>
            </div>
          </Link>
        )
        : (
          <div onClick={handleSelect} className={`w-[14rem] select-none h-12 bg-primary_bg hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center ${isSelected && 'border-solid border-primary border-[1px]'}`}>
            <div className='flex gap-3'>
              <Image src={iconSrc} width={24} height={24} alt='File icon'/>
              <p className='text-primary_font_2 pb-1 truncate w-[8rem] mt-1 font-[550]'>{file.name}</p>
            </div>

            <ThreeDotsMenu file={file}/>
          </div>
        )
      }

    </>
  )
}

export default File;


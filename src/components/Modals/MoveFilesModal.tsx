"use client"

import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'

type Props = {
  file: FileOrFolderType[];
  multiplefiles: boolean;
}

const MoveFilesModal = ({file, multiplefiles}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild >
        <Image src='/move-icon.svg' onClick={(e) => e.stopPropagation()} width={19} height={19} alt='Move icon'/>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[45rem]'>

        <AlertDialogHeader className='flex flex-row h-10 justify-between'>
          <AlertDialogTitle className='font-bold text-xl text-black mt-1 pt-[0.3rem]'>Move Content</AlertDialogTitle>
          <AlertDialogCancel className='w-9 h-9 p-[0.6rem] rounded-full bg-[#F0F0F0] mt-0' onClick={(e) => e.stopPropagation()}>
            <Image src="/cross-icon.svg" width={20} height={20} className='rounded-full' alt='close icon'/>
          </AlertDialogCancel>
        </AlertDialogHeader>

        <AlertDialogDescription className='text-[#7A7AFF] text-md flex flex-col justify-center h-[25rem] gap-4'>
          <div className='w-full h-[30%] rounded-lg px-4 py-3 border-[1px] border-solid border-[#7A7AFF]'>
            <div className='overflow-y-auto flex gap-3 flex-wrap h-full rounded-lg pr-4'>
              {file.map((item, index) => (
                <div key={index} className='h-10 max-w-[38%] flex gap-2 items-center p-2 bg-primary_bg rounded-md'>
                  <Image src={`${item.is_file ? "/file-icon.svg":"/folder-icon-filled.svg"}`} width={18} height={18} alt={`${item.is_file ? 'file' : 'folder'} icon`}/>
                  <p className='truncate pr-2'>{item.name}</p>
                  <button className='shrink-0'><Image src='/cross-icon.svg' width={14} height={14} alt='remove'/></button>
                </div> 
              ))}
            </div>
          </div>

          <div className="w-full h-10 flex gap-4">
            <div className='w-10 h-10 rounded-lg bg-[#F0F0F0]'></div>
            <div className='w-full h-10 rounded-lg bg-[#F0F0F0]'></div>
          </div>

          <div className='w-full h-[50%] rounded-lg p-4 border-[1px] border-solid border-[#7A7AFF]'>
            <div className='overflow-y-auto flex gap-3 flex-wrap h-full'>
              {file.map((item, index) => (
                <div key={index} className='h-10 w-full mr-4 flex justify-between items-center p-2 bg-primary_bg rounded-md'>
                  <div className='flex gap-2 '>
                    <Image src='/folder-icon.svg' width={20} height={20} alt='folder icon'/>
                    <p className='truncate pr-2'>{item.name}</p>
                  </div>
                  <button className='shrink-0'><Image src='/cross-icon.svg' width={14} height={14} alt='remove'/></button>
                </div> 
              ))}
            </div>
          </div>
          
        </AlertDialogDescription>

        <AlertDialogFooter className='flex justify-between items-center w-full'>
          <button className='flex gap-2 items-center rounded-full hover:bg-primary_bg px-3 py-2'>
            <Image src='/add_folder-icon.svg' width={18} height={18} alt='Add folder icon'/>
            <p className=' text-[#7A7AFF] font-medium text-sm'>Create Folder</p>
          </button>
          <AlertDialogAction className='rounded-full text-white font-semibold bg-primary_font hover:text-primary_font border-2 border-solid border-primary_font'>Move here</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default MoveFilesModal
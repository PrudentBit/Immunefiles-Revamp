"use client"
import React from 'react'
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
  file: FileOrFolderType;
}

const FileDetailsAlert = ({ file }: Props) => {
  console.log(file)
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p onClick={(e) => e.stopPropagation()} className='w-full'>Details</p>
      </AlertDialogTrigger>
      <AlertDialogContent className=''>
        <AlertDialogHeader className='flex flex-row justify-between h-10'>
          <div className="flex gap-3">
            <Image src="/details-icon.svg" width={20} height={20} className='rounded-full w-10 h-10 p-[0.6rem] bg-primary_bg' alt='details icon'/>
            <AlertDialogTitle className='font-medium text-lg text-primary_font pt-[0.3rem]'>Details</AlertDialogTitle>
          </div>
          <AlertDialogCancel className='w-9 h-9 p-[0.6rem] rounded-full bg-[#F0F0F0] mt-0' onClick={(e) => e.stopPropagation()}>
            <Image src="/cross-icon.svg" width={20} height={20} className='rounded-full ' alt='close icon'/>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription className='text-primary_font text-md p-2'>
          <div className='flex flex-col gap-2 '>
            <div className='flex flex-row justify-between'>
              <p className='w-[30%]'>{file.is_file ? 'File Name' : 'Folder Name'}</p>
              <p className='text-[#7A7AFF] w-[70%]'>{file.name}</p>
            </div>
            <div className='flex flex-row justify-between'>
              <p className='w-[30%]'>Owner</p>
              <p className='text-[#7A7AFF] w-[70%]'>{file.owner}</p>
            </div>
            <div className='flex flex-row justify-between'>
              <p className='w-[30%]'>Created on</p>
              <p className='text-[#7A7AFF] w-[70%]'>{file.date_created}</p>
            </div>
            <div className='flex flex-row justify-between'>
              <p className='w-[30%]'>Size</p>
              <p className='text-[#7A7AFF] w-[70%]'>{file.size}</p>
            </div>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter className=''>
          <AlertDialogAction className='rounded-full text-white gap-2 font-normal bg-primary_font hover:text-primary_font border-[1px] border-solid border-primary_font'>
            Rename
            <Image src="/rename-icon.svg" width={15} height={15} alt='rename icon'/>
          </AlertDialogAction>
          <AlertDialogAction className='rounded-full text-white font-normal bg-primary_font_2 hover:text-primary_font_2 border-[1px] border-solid border-primary_font_2'>Manage shared</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default FileDetailsAlert
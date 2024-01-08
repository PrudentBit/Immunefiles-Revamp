"use client"

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
import { useState, useEffect } from "react"

type Props = {
  file: SharedFilesType["files"][0] | SharedFilesType["children"][0];
  type: string;
}

const SharedFileDetails = ({ file, type }: Props) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if(file?.date_created){
        const date = new Date(file?.date_created).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      setFormattedDate(date);
    }
  }, [file])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p onClick={(e) => e.stopPropagation()} className='w-full'>Details</p>
      </AlertDialogTrigger>
      <AlertDialogContent className=''>
        <AlertDialogHeader className='flex flex-row justify-between h-10'>
          <div className="flex gap-3">
            <Image src="/details-icon.svg" width={20} height={20} className='rounded-full w-10 h-10 p-[0.6rem] bg-primary_bg' alt='details icon'/>
            <AlertDialogTitle className='font-bold text-xl text-black pt-[0.3rem]'>Details</AlertDialogTitle>
          </div>
          <AlertDialogCancel className='w-9 h-9 p-[0.6rem] rounded-full bg-[#F0F0F0] mt-0' onClick={(e) => e.stopPropagation()}>
            <Image src="/cross-icon.svg" width={20} height={20} className='rounded-full ' alt='close icon'/>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription className='text-[#7A7AFF] text-md p-2'>
          <div className='flex flex-col gap-2 rounded-xl bg-primary_bg px-5 py-3'>
            <div className='flex gap-2'>
              <Image src={`${type ? "/File-icon.svg":"/Folder-icon.svg"}`} width={25} height={25}alt='file icon'/>
              <p className='text-primary_font text-lg font-semibold w-[20rem] truncate'>{file.name}</p>
            </div>
            <div className='flex flex-row gap-2 pl-1'>
              <p>{file?.size}</p>
              <div className='flex flex-row gap-1'> 
                <p>Owned by: </p>
                <p>{file?.owner}</p>
              </div>
            </div>
            <div className='flex gap-2 pl-1'>
              <p>Created on: </p>
              <p>{file?.owner}</p>
            </div>
            
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default SharedFileDetails
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
import deleteFiles from '@/utils/api/deleteFileAPI'

type Props = {
  file: FileOrFolderType;
}

const DeleteFileAlert = ({ file }: Props) => {

  const deleteSelected = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    console.log('delete');
    if( file.is_file ){
      const result = await deleteFiles([file.urlhash], []);
      console.log(result);
      if(result.message === 'success'){
        window.location.reload();
      }
    }
    else{
      const result = await deleteFiles([], [file.urlhash]);
      console.log(result);
      if(result.message === 'success'){
        window.location.reload();
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p onClick={(e) => e.stopPropagation()} className='w-full'>Delete</p>
      </AlertDialogTrigger>
      <AlertDialogContent className=''>
        <AlertDialogHeader className='flex flex-row items-center gap-3'>
          <Image src="/trash-icon.svg" width={20} height={20} className='rounded-full w-10 h-10 p-2 bg-[#FFEBEB]' alt='delete icon'/>
          <div className="flex flex-col h-full">
            <AlertDialogTitle className='font-medium text-md'>Do you want to delete this item?</AlertDialogTitle>
            <AlertDialogDescription className='text-xs'>
              You can restore the item from trash
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex gap-4'>
          <AlertDialogAction className='w-[50%] rounded-full bg-[#FF6161] text-white hover:bg-[#FF7F7F]' onClick={(e)=>deleteSelected(e)}>Delete</AlertDialogAction>
          <AlertDialogCancel className='w-[50%] rounded-full hover:bg-[#D2D4DA] hover:text-black' onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteFileAlert
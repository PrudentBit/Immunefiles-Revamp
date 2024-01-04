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
import ManageShared from "./ManageSharedModal/ManageSharedModal"

type Props = {
  file?: FileOrFolderType ;
  groupFile?: groupFileandFolderType;
  type: string;
}

const FileDetailsModal = ({ file, groupFile, type }: Props) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if(groupFile?.date_uploaded){
        const date = new Date(groupFile?.date_uploaded).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      setFormattedDate(date);
    }
  }, [groupFile])
  
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
              <p className='text-primary_font text-lg font-semibold w-[20rem] truncate'>{file?.name || groupFile?.name}</p>
            </div>
            <div className='flex flex-row gap-2 pl-1'>
              <p>{file?.size || groupFile?.size || ""}</p>
              <div className='flex flex-row gap-1'> 
                {file?.owner ? (
                  <>
                    <p>Owned by: </p>
                    <p>{file?.owner}</p>
                  </>
                ) : (
                  <>
                    <p>Shared by: </p>
                    <p>{groupFile?.shared_by}</p>
                  </>
                )}
              </div>
            </div>
            <div className='flex gap-2 pl-1'>
              {file?.owner ? (
                  <>
                    <p>Created on: </p>
                    <p>{file?.owner}</p>
                  </>
                ) : (
                  <>
                    {groupFile?.date_uploaded && (
                      <>
                        <p>Shared on: </p>
                        <p>{formattedDate}</p>
                      </>
                    )}
                  </>
                )}
            </div>
            
          </div>
        </AlertDialogDescription>
        {file?.owner && (
          <AlertDialogFooter className=''>
            <AlertDialogAction className='rounded-full text-white gap-2 font-normal bg-primary_font hover:text-primary_font border-[1px] border-solid border-primary_font'>
              Rename
              <Image src="/rename-icon.svg" width={15} height={15} alt='rename icon'/>
            </AlertDialogAction>
            <AlertDialogAction className='rounded-full text-white font-normal bg-primary_font_2 hover:text-primary_font_2 border-[1px] border-solid border-primary_font_2'>
              <ManageShared file={file} type={type}/>
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default FileDetailsModal
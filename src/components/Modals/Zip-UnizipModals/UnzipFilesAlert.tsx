"use client"
import React, {useState} from 'react'
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
import { selectedFilesStore } from '@/utils/store/selectFilesStore'
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore'
import { unzippingFiles } from '@/utils/api/unzippingFilesAPI'

type Props = {
  files: FileOrFolderType[];
  multipleFiles: boolean;
}

const UnzipFilesAlert = ({files, multipleFiles} : Props) => {
  const [removeAllFiles] = selectedFilesStore((state) => [state.removeAllFiles]);
  const [toggleForceRefresh] = useFileAndFolderStore((state) => [state.toggleForceRefresh]);

  const handleUnzipFiles = async () => {
    const zipFile = files[0].urlhash;
    const response = await unzippingFiles([zipFile]);
    if (response.message === "Folder unzipped") {
      toggleForceRefresh();
      removeAllFiles();
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {multipleFiles 
            ? <Image src='/extract-icon.svg' onClick={(e) => e.stopPropagation()} width={20} height={20} alt='extract icon'/>
            : <p onClick={(e) => e.stopPropagation()} className='w-full'>Extract here</p>
          }
        </AlertDialogTrigger>
        <AlertDialogContent className='translate-y-[-155%] gap-5'>
          <AlertDialogHeader className='flex flex-row items-center gap-3'>
            <div className='rounded-full w-10 h-10 flex items-center justify-center bg-primary_bg'>
              <Image src="/zip-folder-icon.svg" width={20} height={20}  alt='zip icon'/>
            </div>
            <AlertDialogTitle className='font-medium text-md pb-1'>
              <div className='flex flex-col'>
                Do you want to extract items here?
                <p className='text-xs text-[#87898E] font-normal'>You can zip the items again anytime you want.</p>
              </div>
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className='px-2'>
            <div className='flex gap-4 pl-4 bg-primary_bg border-[1px] items-center border-solid border-primary_border rounded-md h-12'>
              <Image src='/FileIcons/zip.svg' width={28} height={28} alt='zip icon'/>
              <p className='text-primary_font_2 text-base w-[18rem] truncate'>{files[0].name}</p>
            </div>
          </AlertDialogDescription>
          <AlertDialogFooter className='flex gap-4'>
            <AlertDialogAction className='w-[50%] rounded-full bg-primary_font text-white hover:bg-bg_hover' onClick={handleUnzipFiles}>Yes! Extract</AlertDialogAction>
            <AlertDialogCancel className='w-[50%] rounded-full bg-[#F1F1F1] hover:bg-[#D2D4DA] hover:text-black' onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default UnzipFilesAlert
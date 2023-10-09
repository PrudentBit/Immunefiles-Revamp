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
import deleteFiles from '@/utils/api/deleteFileAPI'
import recoverDeletedFiles from '@/utils/api/recoverDeletedFilesAPI'

type Props = {
  file: FileOrFolderType[];
  multiplefiles: boolean;
}

const DeleteFileAlert = ({ file, multiplefiles }: Props) => {
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);
  const [deletedFolders, setDeletedFolders] = useState<string[]>([]);

  const deleteSelected = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    console.log('delete');

    const files = file.filter(item => item.is_file);
    const folders = file.filter(item => !item.is_file);

    const fileUrls = files.map(item => item.urlhash);
    const folderUrls = folders.map(item => item.urlhash);

    const result = await deleteFiles(fileUrls, folderUrls);
    console.log(result);
    
    if(result.message === 'success'){
      setDeletedSuccessfully(true);
      setDeletedFiles(fileUrls);
      setDeletedFolders(folderUrls);
      setTimeout(() => {
        setDeletedSuccessfully(false);
      }, 10000);
    }
  }

  const recoverDeleted = async () => {
    const result = await recoverDeletedFiles(deletedFiles, deletedFolders);
    console.log(result);
    
    if(result.message === 'success'){
      window.location.reload();
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {multiplefiles 
            ? <Image src='/delete-icon.svg' onClick={(e) => e.stopPropagation()} width={16} height={16} alt='Delete icon'/>
            : <p onClick={(e) => e.stopPropagation()} className='w-full'>Delete</p>
          }
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
            <button className='w-[50%] rounded-full bg-[#FF6161] text-white hover:bg-[#FF7F7F]' onClick={(e)=>deleteSelected(e)}>Delete</button>
            <AlertDialogCancel className='w-[50%] rounded-full hover:bg-[#D2D4DA] hover:text-black' onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteFileAlert
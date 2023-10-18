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
import { selectedFilesStore } from '@/utils/store/selectFilesStore'
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore'
import BotLeftAlert from '../botLeftAlert'

type Props = {
  file: FileOrFolderType[];
  multiplefiles: boolean;
}

const DeleteFileAlert = ({ file, multiplefiles }: Props) => {
  const [deletedSuccessfully, setDeletedSuccessfully] = useState<boolean>();
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);
  const [deletedFolders, setDeletedFolders] = useState<string[]>([]);
  const [undoMessage, setUndoMessage] = useState<string>('Items moved to trash.');
  const [removeAllFiles, removeFile, addFile] = selectedFilesStore((state) => [state.removeAllFiles, state.removeFile, state.addFile]);
  const [toggleForceRefresh] = useFileAndFolderStore((state) => [state.toggleForceRefresh]);

  const deleteSelected = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    const files = file.filter(item => item.is_file);
    const folders = file.filter(item => !item.is_file);

    const fileUrls = files.map(item => item.urlhash);
    const folderUrls = folders.map(item => item.urlhash);

    const result = await deleteFiles(fileUrls, folderUrls);
    
    if(result.message === 'success'){
      setDeletedSuccessfully(true);
      setDeletedFiles(fileUrls);
      setDeletedFolders(folderUrls);
      for(let i = 0; i < fileUrls.length; i++){
        removeFile(fileUrls[i]);
      }
      addFile({name: 'Trash', urlhash: 'trash', is_file: false, owner : '', date_created:"", shared_with:[]})
      toggleForceRefresh();
      setTimeout(() => {
        setDeletedSuccessfully(false);
        removeAllFiles();
      }, 5000);
    }
  }

  const recoverDeleted = async () => {
    setUndoMessage("Recovering files...")
    const result = await recoverDeletedFiles(deletedFiles, deletedFolders);
    if(result.message === 'successfully recovered'){
      setUndoMessage("Items recovered successfully.")
      removeAllFiles();
      toggleForceRefresh();
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
        <AlertDialogContent className='translate-y-[-210%]'>
          <AlertDialogHeader className='flex flex-row items-center gap-3'>
            <Image src="/trash-icon.svg" width={20} height={20} className='rounded-full w-10 h-10 p-2 bg-[#FFEBEB]' alt='delete icon'/>
            <div className="flex flex-col h-full">
              <AlertDialogTitle className='font-medium text-md'>{multiplefiles? ("Do you want to delete these items?"):("Do you want to delete this item?")}</AlertDialogTitle>
              <AlertDialogDescription className='text-xs'>
                You can restore deleted items from trash
              </AlertDialogDescription>
            </div>  
          </AlertDialogHeader>
          <AlertDialogFooter className='flex gap-4'>
            <AlertDialogAction className='w-[50%] rounded-full bg-[#FF6161] text-white hover:bg-[#FF7F7F]' onClick={(e)=>deleteSelected(e)}>Delete</AlertDialogAction>
            <AlertDialogCancel className='w-[50%] rounded-full hover:bg-[#D2D4DA] hover:text-black' onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {(deletedSuccessfully) &&
        <BotLeftAlert image='/delete-icon.svg' imagebg='bg-[#FFE3E5]'>
          <div className='flex flex-col items-start text-left leading-[0.2rem] gap-[0.35rem]'>
            <p className='text-[#FF6161] font-semibold text-base leading-4  '>{undoMessage}</p>
            <p className='text-[#979797] font-[400] text-sm leading-[1.1rem]'>you can restore the items from trash bin whenever needed.</p>
          </div>
          <button onClick={recoverDeleted} className='border-2 border-solid border-primary_font text-primary_font px-2 py-[0.1rem] rounded-lg'>undo</button>
        </BotLeftAlert>
      }
    </>
  )
}

export default DeleteFileAlert
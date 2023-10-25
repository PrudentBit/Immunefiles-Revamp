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
import { motion, AnimatePresence } from 'framer-motion';
import SelectedFilesDisplay from '@/components/Modals/Modal-components/SelectedFilesDisplay'
import { selectedFilesStore } from '@/utils/store/selectFilesStore';
import TabSelectionComponent from './TabSelectionComponent';
import GenerateLinkSection from './generateLinkSection';
import SendMailSection from './SendMailSection';
import InternalShareSection from './InternalShareSection';
import SendInGroupsSection from './SendInGroupsSection';

type Props = {
  multiplefiles: boolean;
}

const ShareContentModal = ({multiplefiles}:Props) => {
  const [tab, setTab] = useState<"link" | "email" | "internal" | "groups">('link');
  const [files, removeFile, removeAllFiles] = selectedFilesStore((state) => [state.files, state.removeFile, state.removeAllFiles]);

  const removeFileFromSelection = (indexToRemove: number) => {
    removeFile(files[indexToRemove].urlhash);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {multiplefiles 
          ? <Image src='/share-icon.svg' onClick={(e) => e.stopPropagation()} width={20} height={20} alt='Share icon'/>
          : <p onClick={(e) => e.stopPropagation()} className='w-full'>Share</p>
        }
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[50rem]'>
        <AlertDialogHeader className='flex flex-row h-10 justify-between'>
          <AlertDialogTitle className='flex gap-4 items-center pt-1 '>
            <Image src='/share-icon.svg' className='rounded-full p-[0.35rem] bg-primary_bg' width={30} height={30} alt='Share icon'/>
            <p>Share Content</p>
          </AlertDialogTitle>
          <AlertDialogCancel className='w-7 h-7 p-[0.4rem] rounded-full bg-[#F0F0F0] mt-0' onClick={(e) => e.stopPropagation()}>
            <Image src="/cross-icon.svg" width={20} height={20} className='rounded-full' alt='close icon'/>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription className='h-[25rem] text-md p-2'>

          <SelectedFilesDisplay file={files} removeFileFromSelection={removeFileFromSelection}/>

          <TabSelectionComponent tab={tab} setTab={setTab}/>

          <div className='w-full h-[54%] rounded-lg px-4 py-3 border-[1px] border-solid border-[#7A7AFF] '>
            {tab === "link" && (
              <GenerateLinkSection/>
            )}

            {tab === "email" && (
              <SendMailSection/>
            )}

            {tab === "internal" && (
              <InternalShareSection/>
            )}

            {tab === "groups" && (
              <SendInGroupsSection/>
            )}
          </div>
          
        </AlertDialogDescription>
        <AlertDialogFooter className='flex justify-end'>
          <AlertDialogAction>
                            
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ShareContentModal
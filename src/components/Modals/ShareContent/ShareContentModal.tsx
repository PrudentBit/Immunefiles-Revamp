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
import GenerateLinkSection from './GenerateLinkSection';
import SendMailSection from './SendMailSection';
import InternalShareSection from './InternalShareSection';
import SendInGroupsSection from './SendInGroupsSection';
import BotLeftAlert from '@/components/botLeftAlert';
import shareLinkOrMail from '@/utils/api/ShareLinkOrMail.API';

type Props = {
  multiplefiles: boolean;
}

const ShareContentModal = ({multiplefiles}:Props) => {
  const [tab, setTab] = useState<"link" | "email" | "internal" | "groups">('link');
  const [files, removeFile, removeAllFiles] = selectedFilesStore((state) => [state.files, state.removeFile, state.removeAllFiles]);
  const [linkName, setLinkName] = useState<string>('');
  const [shareEmail, setShareEmail] = useState<string>('');
  const [sharedSuccessfully, setSharedSuccessfully] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);

  const [shareSettings, setLinkSettings] = useState<ShareSettings>({
    expiry: false,
    password: false,
    accesslimit: false,
    downloadable: false,
    proctored: false,
    expiryDate: null,
    expiryTime: null,
    passwordValue: null,
    accessValue: 0
  });

  const removeFileFromSelection = (indexToRemove: number) => {
    removeFile(files[indexToRemove].urlhash);
  };

  const testing = () => {
    console.log(shareSettings);
    console.log(linkName);
    console.log(shareEmail);
  }

  const onCloseAlert = () => {
    setSharedSuccessfully(false);
    setResponse(null);
  }

  const handleShare = async () => {
    try {
      const file = files.filter(item => item.is_file);
      const folder = files.filter(item => !item.is_file);
  
      const fileUrls = file.map(item => item.urlhash);
      const folderUrls = folder.map(item => item.urlhash);

      const accessType = tab === 'link' ? 'employee' : 'client';
  
      const shareResponse = await shareLinkOrMail(
        accessType,
        linkName,
        shareSettings,
        fileUrls,
        folderUrls,
        [shareEmail]
      );
      
      console.log(shareResponse);
      setResponse(shareResponse);
      setSharedSuccessfully(true);
      setLinkSettings({
        expiry: false,
        password: false,
        accesslimit: false,
        downloadable: false,
        proctored: false,
        expiryDate: null,
        expiryTime: null,
        passwordValue: null,
        accessValue: 0
      });
      setLinkName('');
      setShareEmail('');
    } catch (error) {
      console.error(error);
    }
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

          <div className='w-full h-[54%] rounded-lg px-5 py-4 pr-2 border-[1px] border-solid border-[#7A7AFF] '>
            {tab === "link" && (
              <GenerateLinkSection settings={shareSettings} setSettings={setLinkSettings} linkName={linkName} setLinkName={setLinkName}/>
            )}

            {tab === "email" && (
              <SendMailSection settings={shareSettings} setSettings={setLinkSettings} linkName={linkName} setLinkName={setLinkName} shareEmail={shareEmail} setShareEmail={setShareEmail}/>
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
        {tab === "link" && (
          <AlertDialogAction 
            onClick={handleShare} 
            className='rounded-full text-white font-normal bg-primary_font_2 hover:text-primary_font_2 border-[1px] border-solid border-primary_font_2'
            disabled={!linkName}
          >
            Generate link
          </AlertDialogAction>
        )}

        {tab === "email" && (
          <AlertDialogAction 
            onClick={handleShare} 
            className='rounded-full text-white font-normal bg-primary_font_2 hover:text-primary_font_2 border-[1px] border-solid border-primary_font_2'
            disabled={!linkName || !shareEmail}
          >
            Send Mail
          </AlertDialogAction>
        )}

        {tab === "internal" && (
          <AlertDialogAction
            onClick={testing}
            className='rounded-full text-white font-normal bg-primary_font_2 hover:text-primary_font_2 border-[1px] border-solid border-primary_font_2'
          >
            Share
          </AlertDialogAction>
        )}

        {tab === "groups" && (
          <AlertDialogAction
            onClick={testing}
            className='rounded-full text-white font-normal bg-primary_font_2 hover:text-primary_font_2 border-[1px] border-solid border-primary_font_2'
          >
            Share
          </AlertDialogAction>
        )}
      </AlertDialogFooter>
      </AlertDialogContent>

      {(sharedSuccessfully && tab==="link") && (
        <BotLeftAlert image='/task-completed-icon.svg' imagebg='bg-[#E5EDFF]' className='w-fit'>
          <div className='flex flex-col items-start text-left leading-[0.2rem] gap-[0.35rem]'>
            <p className='text-primary_font font-semibold text-base leading-4  '>Files/Folders shared successfully</p>
            <p className='text-[#979797] font-[400] text-sm leading-[1.1rem]' title={response.data.data.link}>Link: {response.data.data.link}</p>
          </div>
          <button onClick={onCloseAlert} className='text-primary_font px-2 mb-8 text-lg'>x</button>
        </BotLeftAlert>
      )}

      {(sharedSuccessfully && tab==="email") && (
        <BotLeftAlert image='/task-completed-icon.svg' imagebg='bg-[#E5EDFF]'>
          <div className='flex flex-col items-start text-left leading-[0.2rem] gap-[0.35rem]'>
            <p className='text-primary_font font-semibold text-base leading-4  '>Files/Folders shared successfully</p>
            <p className='text-[#979797] font-[400] text-sm leading-[1.1rem]'>{response.data.message}</p>
          </div>
          <button onClick={onCloseAlert} className='text-primary_font px-2 mb-8 text-lg'>x</button>
        </BotLeftAlert>
      )}

    </AlertDialog>
  )
}

export default ShareContentModal
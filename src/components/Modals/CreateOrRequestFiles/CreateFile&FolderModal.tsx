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
import Tabs from '@/components/Modals/CreateOrRequestFiles/Tabs'
import CreateFileSection from '@/components/Modals/CreateOrRequestFiles/CreateFileSection'
import CreateFolderSection from '@/components/Modals/CreateOrRequestFiles/CreateFolderSection'
import RequestFileSection from '@/components/Modals/CreateOrRequestFiles/RequestFile/RequestFileSection'
import createFile from '@/utils/api/createFilesAPI'
import createFolder from '@/utils/api/createFolderAPI'
import requestFiles from '@/utils/api/requestFilesAPI'
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore'

type Props = {
  propTab:string;
}

type Request = {
  id: string;
  fileName: string[];
  email: string;
  requestType: string;
};


const CreateFileOrFolder = ({propTab}:Props) => {
  const [tab, setTab] = useState(propTab);

  const [fileName, setFileName] = useState('');
  const [selectedExtension, setSelectedExtension] = useState('txt');
  
  const [toggleForceRefresh] = useFileAndFolderStore((state) => [state.toggleForceRefresh]);

  const [folderName, setFolderName] = useState('');

  const [requestType, setRequestType] = useState<'internal' | 'external' | 'none'>('none');
  const [request, setRequest] = useState<Request>({id:'', fileName: [""], email: '', requestType : 'internal'});

  const handleCreateFile = async () => {
    try {
      const result = await createFile(fileName, selectedExtension, 'root');
      console.log(result);
      toggleForceRefresh();
    } catch (error) {
      console.error(error);
    }
  }

  const handleCreateFolder = async () => {
    try {
      const result = await createFolder(folderName, 'root');
      console.log(result);
      toggleForceRefresh();
    } catch (error) {
      console.error(error);
    }
  }

  const handleRequestFiles = async () => {
    try {
      const result = await requestFiles(request, 'root');
      console.log(result);
      toggleForceRefresh();
    } catch (error) {
      console.error(error);
    }
  }  

  const variants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0.8 },
  };  

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div onClick={(e) => e.stopPropagation()} className='flex gap-2 items-center'>
          <Tabs tabName={tab}/>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[35rem]'>
          <AlertDialogHeader className='flex flex-row h-10 justify-between'>
            <AlertDialogTitle className='flex gap-4 items-center pt-1'>
            <Tabs onClick={() => { setTab("Create File")}} tabName='Create File' className={`${tab==="Create File" && "bg-primary_bg"}`}/>
            <Tabs onClick={() => { setTab("Create Folder")}}  tabName='Create Folder'className={`${tab==="Create Folder" && "bg-primary_bg"}`}/>
            <Tabs onClick={() => { setTab("Request File")}}  tabName='Request File' className={`${tab==="Request File" && "bg-primary_bg"}`}/>
            </AlertDialogTitle>
            <AlertDialogCancel className='w-7 h-7 p-[0.4rem] rounded-full bg-[#F0F0F0] mt-0' onClick={(e) => e.stopPropagation()}>
              <Image src="/cross-icon.svg" width={20} height={20} className='rounded-full' alt='close icon'/>
            </AlertDialogCancel>
          </AlertDialogHeader>
        <AlertDialogDescription className={`text-[#7A7AFF] text-md p-2 relative ${tab === "Request File" ? ("h-[16rem]") : ("h-[8rem]")} w-full`}>
          <AnimatePresence initial={false} >
            <motion.div
              variants={variants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
              key={tab}
              className='absolute h-[7rem] w-[31rem]'
            >
              {tab === 'Create File' && (
                <CreateFileSection fileName={fileName} setFileName={setFileName} selectedExtension={selectedExtension} setSelectedExtension={setSelectedExtension}/>
              )}

              {tab === 'Create Folder' && (
                <CreateFolderSection folderName={folderName} setFolderName={setFolderName} />
              )}

              {tab === 'Request File' && (
                <RequestFileSection request={request} setRequest={setRequest} requestType={requestType} setRequestType={setRequestType}/>
              )}
            </motion.div>
          </AnimatePresence>
        </AlertDialogDescription>
        <AlertDialogFooter className='flex justify-end'>
          {tab === 'Create File' && (
            <AlertDialogAction
              onClick={handleCreateFile} 
              disabled={!fileName || !selectedExtension}
              title="Fields might be missing"
              className='rounded-full text-white font-normal bg-primary_font_2 hover:text-primary_font_2 border-[1px] border-solid border-primary_font_2'
            >
              Create & Save
            </AlertDialogAction>
          )}

          {tab === 'Create Folder' && (
            <AlertDialogAction
              onClick={handleCreateFolder} 
              disabled={!folderName}
              title='Folder name might be missing'
              className='rounded-full text-white font-normal bg-primary_font_2 hover:text-primary_font_2 border-[1px] border-solid border-primary_font_2'
            >
              Create & Save
            </AlertDialogAction>
          )}

          {tab === 'Request File' && (
            <div className='w-full flex justify-between'>
              <AlertDialogAction
                onClick={handleRequestFiles}
                disabled={!request.email || (request.fileName.length < 0)}
                title="Fields might be missing or incorrect"
                className='rounded-full text-white font-normal bg-primary_font_2 hover:text-primary_font_2 border-[1px] border-solid border-primary_font_2'
              >
                Send requests
              </AlertDialogAction>

            </div>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CreateFileOrFolder
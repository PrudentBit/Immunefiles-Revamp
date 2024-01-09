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
import RequestFileSection from '@/components/Modals/CreateOrRequestFiles/RequestFile/RequestFileSection'
import { Button } from '@/components/ui/button';
import requestFiles from '@/utils/api/requestFilesAPI'
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore'
import {toast} from 'sonner'

type Request = {
  id: string;
  fileName: string[];
  email: string;
  requestType: string;
};

const RequestFilesModal = () => {
  const [toggleForceRefresh] = useFileAndFolderStore((state) => [state.toggleForceRefresh]);
  const [request, setRequest] = useState<Request>({id:'', fileName: [""], email: '', requestType : 'internal'});
  const [requestType, setRequestType] = useState<'internal' | 'external' | 'none'>('none');

  const handleRequestFiles = async () => {
    if(!(requestType === 'none')) {
      try {
        const result = await requestFiles(request, requestType);
        if (result.success){
          toast.success('Request sent successfully');
          toggleForceRefresh();
        }
        else{
          toast.error('Request failed');
        }
      } catch (error) {
        console.error(error);
        toast.error('Request failed');
      }
    }
  }  

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='rounded-full flex gap-2 h-9 bg-primary_font hover:bg-[#648FED]'>
          <Image src='/request-icon-white.svg' width={16} height={16} alt='request'/>
          <p>Request file</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[35rem]'>
        <AlertDialogHeader className='flex flex-row justify-between h-10'>
          <div className="flex gap-3 items-center">
            <div className='rounded-full w-10 h-10 flex items-center justify-center bg-primary_bg'>
              <Image src="request-icon.svg" width={20} height={20} alt='Request icon'/>
            </div>
            <AlertDialogTitle className='font-medium text-md text-[#7A7AFF]'>Request File</AlertDialogTitle>
          </div>
          <AlertDialogCancel className='w-9 h-9 p-[0.6rem] rounded-full bg-[#F0F0F0] mt-0' onClick={(e) => e.stopPropagation()}>
            <Image src="/cross-icon.svg" width={20} height={20} className='rounded-full ' alt='close icon'/>
          </AlertDialogCancel>
        </AlertDialogHeader>

        <AlertDialogDescription className={`text-[#7A7AFF] text-md p-2 relative h-[16rem] w-full`}>
          <RequestFileSection request={request} setRequest={setRequest} requestType={requestType} setRequestType={setRequestType}/>
        </AlertDialogDescription>
        
        <AlertDialogFooter className='flex justify-end'>
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RequestFilesModal
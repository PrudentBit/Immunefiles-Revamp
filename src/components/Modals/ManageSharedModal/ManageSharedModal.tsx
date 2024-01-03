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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ManageInternalShares from "./ManageInternalShares"
import ManageGroupShares from "./ManageGroupShares"
import ManageMailShares from "./ManageMailShares"
import ManageLinkShares from "./ManageLinkShares"

type Props = {
  file?: FileOrFolderType ;
  type: string;
}

const ManageShared = ({file, type}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild onClick={(e)=>e.stopPropagation()}>
        <p>Manage shared</p>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[45rem]'>
        <AlertDialogHeader className='flex flex-row justify-between h-10'>
          <div className="flex gap-3 items-center">
            <div className='rounded-full w-10 h-10 flex items-center justify-center bg-primary_bg'>
              <Image src="/shared-icon-2.svg" width={20} height={20} alt='shared icon'/>
            </div>
            <AlertDialogTitle className='font-medium text-md text-[#7A7AFF]'>Manage shared</AlertDialogTitle>
          </div>
          <AlertDialogCancel className='w-9 h-9 p-[0.6rem] rounded-full bg-[#F0F0F0] mt-0' onClick={(e) => e.stopPropagation()}>
            <Image src="/cross-icon.svg" width={20} height={20} className='rounded-full ' alt='close icon'/>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription className='h-[25rem] flex flex-col gap-4' onClick={(e)=>e.stopPropagation()}>
          <div className='flex h-[7rem] flex-col gap-2 rounded-xl bg-primary_bg text-[#7A7AFF] px-5 py-3'>
            <div className='flex gap-2'>
              <Image src={`${type ? "/File-icon.svg":"/Folder-icon.svg"}`} width={25} height={25}alt='file icon'/>
              <p className='text-primary_font text-lg font-semibold w-[30rem] truncate'>{file?.name}</p>
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

          <Tabs defaultValue="Links" className="w-full h-[17rem]">
            <TabsList className='bg-[#EAEAFF] w-full z-10 px-3 rounded-xl'>
              <TabsTrigger value="Links" className='bg-transparent w-[25%] text-base font-normal borderBottom border-transparent border-solid border-[1px] hover:border-button_hover data-[state=active]:border-[#7A7AFF] '>Links</TabsTrigger> 
              <TabsTrigger value="Mail" className='bg-transparent w-[25%] text-base font-normal borderBottom border-transparent border-solid border-[1px] hover:border-button_hover data-[state=active]:border-[#7A7AFF] '>Mail</TabsTrigger> 
              <TabsTrigger value="Groups" className='bg-transparent w-[25%] text-base font-normal borderBottom border-transparent border-solid border-[1px] hover:border-button_hover data-[state=active]:border-[#7A7AFF] '>Groups</TabsTrigger> 
              <TabsTrigger value="Internal" className='bg-transparent w-[25%] text-base font-normal borderBottom border-transparent border-solid border-[1px] hover:border-button_hover data-[state=active]:border-[#7A7AFF] '>Internal</TabsTrigger> 
            </TabsList>
            <hr className='w-full relative translate-y-[-2.5px] z-[-10]'/>
            <TabsContent value="Links">
              <ManageLinkShares/>
            </TabsContent>
            <TabsContent value="Mail" className='w-full'>
              <ManageMailShares/>
            </TabsContent>
            <TabsContent value="Groups">
              <ManageGroupShares/>
            </TabsContent>
            <TabsContent value="Internal">
              <ManageInternalShares/>
            </TabsContent>
          </Tabs>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ManageShared
"use client"

import { useState, useEffect } from 'react';
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
import GroupName from './GroupName';
import GroupDescription from './GroupDescription';
import GroupMembers from './GroupMembers';
import AddMemberGroupsModal from './AddMemberGroupsModal';
import editGroup from '@/utils/api/editGroupAPI';
import { decryptData } from '@/utils/helper/decryptFiles';
import { GroupStore} from '@/utils/store/groupDetailsStore';

type Props = {
  group: GroupDetailsType
}

const GroupDetailsModal = ({ group }: Props) => {
  const { toggleForceRefresh } = GroupStore();

  const handleDelete = async () => {
    const response = await editGroup({action: "delete", group_hash: group.group_hash});
    if (response.status === 200) {
      toggleForceRefresh();
    }
    else{
      console.log(decryptData(response.data.ciphertext));
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <div title='Menu' className='text-secondary_font font-medium text-2xl leading-[0px] pb-[1.3rem] p-[0.3rem] px-1 text-center rounded-full bg-primary_bg hover:bg-button_hover cursor-pointer'>...</div>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[50rem]'>
        <AlertDialogHeader className='flex flex-row justify-between h-10'>
          <div className="flex gap-3">
            <div className='flex justify-center items-center rounded-full w-10 h-10 bg-primary_bg'>
              <Image src="/details-icon-2.svg" width={20} height={20}  alt='details icon'/>
            </div>
            <AlertDialogTitle className='font-semibold text-lg text-black pt-[0.3rem]'>Group details</AlertDialogTitle>
          </div>
          <AlertDialogCancel className='w-9 h-9 p-[0.6rem] rounded-full bg-[#F0F0F0] mt-0' onClick={(e) => {e.stopPropagation(); toggleForceRefresh()}}>
            <Image src="/cross-icon.svg" width={20} height={20} className='rounded-full ' alt='close icon'/>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription className='h-[28rem] flex flex-col gap-4 px-2'>

          <GroupName group={group}/>

          <GroupDescription group={group}/>

          <GroupMembers group={group}/>

        </AlertDialogDescription>
        <AlertDialogFooter className='flex items-center justify-between'>

          <div className='flex justify-between w-[60%]'>
            <AlertDialogAction 
              className='p-2 h-8 flex items-center gap-1 font-normal bg-transparent rounded-lg text-red-400 hover:bg-[#FFE3E5]'
              onClick={handleDelete}
            >
              <Image src="/delete-icon-2.svg" width={18} height={18} alt='delete'/>
              Delete Group
            </AlertDialogAction>

            <button className='p-2 h-8 flex items-center gap-1 font-normal bg-transparent rounded-lg text-[#3ABA6E] hover:bg-[#D0FFE3]'>
              <Image src="/logs-icon-2.svg" width={18} height={18} alt='logs'/>
              Download logs
            </button>

            <AlertDialogAction className='flex gap-1 font-normal p-2 h-8 bg-transparent text-primary_font hover:bg-[#E5EDFF] rounded-lg'>
              <Image src="/copy-icon-3.svg" width={18} height={18} alt='view'/>
              View files
            </AlertDialogAction>
          </div>

          <div className='flex gap-5 items-center'>
            <button title='Pin' className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#ABC5FF] bg-white hover:bg-[#DEE8FF]'>
              <Image src='/pin-icon.svg' width={15} height={15} alt='Pin icon'/>
            </button>
            <AddMemberGroupsModal group={group}/>
          </div>
          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default GroupDetailsModal
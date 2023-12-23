"use client"

import Image from 'next/image'
import React from 'react'
import { UserDetailsStore } from '@/utils/store/userDetailsStore'
import ChangeAvatar from './ChangeAvatar'
import ChangeUsernameModal from '../Modals/ChangeUsernameModal'
import ChangeUserPassModal from '../Modals/ChangeUserPassModal'
import { Switch } from '@/components/ui/switch'
import Enable2FAModal from '../Modals/Enale2FAModal/Enable2FAModal'

const General = () => {
  const userDetails = UserDetailsStore((state) => state.userDetails)

  return (
    <div className='h-full flex flex-col gap-4 justify-between items-center'>
      <div className='w-full h-[8rem] px-6 flex items-center gap-6 border-2 border-solid border-button_hover rounded-2xl'>
        <div className='h-[5rem] w-[5rem] rounded-xl'>
          <Image src="/user.svg" alt='profile' width={90} height={90}/>
        </div>

        <div className='h-[5.5rem] flex flex-col justify-between'>
          <div className='flex flex-col'>
            <div className='flex gap-2 items-center'>
              <p className='text-primary_font text-xl font-semibold leading-5'>{userDetails?.name}</p>
              <ChangeUsernameModal/>
            </div>
            <p className='text-gray-700 text-sm font-semibold'>@{userDetails?.username}</p>
          </div>
          <ChangeUserPassModal/>
        </div>

        <div className='w-[0.1rem] h-[70%] bg-gray-200'></div>

        <div className="flex gap-3 flex-wrap w-[35rem]">
          <div className="pl-2 pr-4 h-7 w-max rounded-full flex items-center  gap-2 bg-[#E5EDFF]">
            <Image src="/suitcase-icon.svg" alt='company' width={20} height={20}/>
            <p className='text-primary_font text-sm font-normal leading-4'>{userDetails?.domain}</p>
          </div>

          <div className="pl-2 pr-4 h-7 rounded-full flex items-center  gap-2 bg-bg_hover">
            <Image src="/employee-icon.svg" alt='company' width={20} height={20}/>
            <p className='text-primary_font_2 text-sm font-normal leading-4'>Employee</p>
          </div>

          <div className="pl-2 pr-4 h-7 rounded-full flex items-center  gap-2 bg-[#E5EDFF]">
            <Image src="/mail-icon.svg" alt='company' width={20} height={20}/>
            <p className='text-primary_font text-sm font-normal leading-4'>{userDetails?.email}</p>
          </div>

          <div className="pl-2 pr-4 h-7 rounded-full flex items-center  gap-2 bg-bg_hover">
            <Image src="/phone-icon.svg" alt='company' width={16} height={16}/>
            <p className='text-primary_font_2 text-sm font-normal leading-4'>{userDetails?.phone_number}</p>
          </div>

          <div className="pl-2 pr-4 h-7 rounded-full flex items-center  gap-2 bg-[#D0FFE3]">
            <Image src="/admin-icon-3.svg" alt='company' width={20} height={20}/>
            <p className='text-[#3ABA6E] text-sm font-normal leading-4'>Admin</p>
          </div>
        </div>
      </div>

      <div className='h-[4rem] w-full flex justify-between items-center pr-3'>
        <div className='flex gap-3'>
          <Image src="/2fa-icon.svg" alt='2fa' width={24} height={24}/>
          <div className='flex flex-col'>
            <p className='text-[#7A7AFF] text-lg'>Enable Two-factor Authentication</p>
            <p className='text-gray-400 text-sm'>Adds extra layer of security, requiring two forms for account access verification.</p>
          </div>
        </div>

        <Enable2FAModal/>
      </div>

      <ChangeAvatar userDetails={userDetails}/>
    </div>
  )
}

export default General
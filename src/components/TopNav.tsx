"use client"

import React from 'react'
import SearchBar from '@/components/SearchBar'
import { ModeToggle } from './ui/toggle-mode'
import Image from 'next/image'
import { tabStore } from '@/utils/store/leftNavTabStore'

type Props = {
  currentTab: string;
}

const TopNav = ({currentTab}: Props) => {
  const user = {
    name: 'John Doe'
  }

  const [setTab] = tabStore((state) => [state.changeTab]);
  React.useEffect(() => {
    setTab(currentTab);
  }, []);

  return (
    <nav className='flex w-full gap-6'>
      <SearchBar/>

      <div className='flex w-[16rem] justify-between items-center'>
        <ModeToggle/>

        <button className='rounded-full bg-primary_bg h-12 w-12 p-3'>
          <Image src="/notification-icon.svg" alt='notification' width={30} height={30}/>
        </button>

        <div className='flex gap-2 cursor-pointer'>
          <div className='text-right'>
            <p className='text-black font-normal text-sm h-4'>Hello</p>
            <p className='text-primary_font_2 text-lg font-semibold whitespace-nowrap'>{user.name}</p>
          </div>

          <Image src="/user.svg" alt='profile' width={45} height={45} className='rounded-lg'/>
        </div>
      </div>
    </nav>
  )
}

export default TopNav
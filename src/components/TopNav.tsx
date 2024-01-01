"use client"

import React from 'react'
import { ModeToggle } from './ui/toggle-mode'
import Image from 'next/image'
import { tabStore } from '@/utils/store/leftNavTabStore'
import { UserDetailsStore } from '@/utils/store/userDetailsStore'
import getUserDetails from '@/utils/api/getUserDetailsAPI'
import SearchBox from './SearchFiles/SearchBox'

import UserProfileCard from './UserProfileCard'


type Props = {
  currentTab: string;
}

const TopNav = ({currentTab}: Props) => {

  const [userDetails, setUserDetails ] = UserDetailsStore((state) => [state.userDetails, state.setUserDetails]);
  const fetchUserDetails = async () => {
    try {
        const userDetails = await getUserDetails();
        setUserDetails(userDetails);
        console.log(userDetails);
    } catch (error) {
        console.error(error);
    }
  };

  const [setTab] = tabStore((state) => [state.changeTab]);
  React.useEffect(() => {
    setTab(currentTab);
    fetchUserDetails();
  }, []);

  return (
    <nav className='flex w-full gap-6 h-12'>
      <SearchBox/>

      <div className='flex w-[21rem] min-w-[18rem] justify-between items-center'>
        <ModeToggle/>

        <button className='rounded-full bg-primary_bg h-12 w-12 p-3'>
          <Image src="/notification-icon.svg" alt='notification' width={30} height={30}/>
        </button>

        <UserProfileCard userDetails={userDetails}/>
      </div>
    </nav>
  )
}

export default TopNav
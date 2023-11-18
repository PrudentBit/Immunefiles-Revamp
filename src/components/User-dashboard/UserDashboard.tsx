"use client"

import React,{useEffect, useState} from 'react'
import UserLinkAnalytics from '@/components/User-dashboard/UserDashLink'
import UserDashStorage from './UserDashStorage'
import UserDashFavGroups from './UserDashFavGroups'
import UserDashCritLinks from './UserDashCritLinks'
import getUserDetails from '@/utils/api/getUserDashInfoAPI'

type Props = {}

const UserDashboard = (props: Props) => {
  const [userDetails, setUserDetails] = useState<UserDashDetails>();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await getUserDetails();
        setUserDetails(result);
        console.log(result)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
    const intervalId = setInterval(fetchUserDetails, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='flex gap-9 flex-col w-full h-full'>
      <div className='flex gap-10 h-[55%]'>
        <UserLinkAnalytics linkDetails={userDetails?.links}/>

        <UserDashStorage storageDetails={userDetails?.storage}/>
      </div>

      <div className='flex gap-10 h-[45%]'>
        <UserDashFavGroups/>

        <UserDashCritLinks critLinks={userDetails?.critical_links}/>
      </div>
    </div>
  )
}

export default UserDashboard
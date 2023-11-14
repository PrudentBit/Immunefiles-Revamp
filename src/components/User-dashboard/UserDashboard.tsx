import React from 'react'
import ShadowedCard from '@/components/ShadowedCard'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import UserLinkAnalytics from '@/components/User-dashboard/UserDashLink'
import UserDashStorage from './UserDashStorage'
import UserDashFavGroups from './UserDashFavGroups'
import UserDashCritLinks from './UserDashCritLinks'

type Props = {}

const UserDashboard = (props: Props) => {
  return (
    <div className='flex gap-9 flex-col w-full h-full'>
      <div className='flex gap-10 h-[55%]'>
        <UserLinkAnalytics/>

        <UserDashStorage/>
      </div>

      <div className='flex gap-10 h-[45%]'>
        <UserDashFavGroups/>

        <UserDashCritLinks/>
      </div>
    </div>
  )
}

export default UserDashboard
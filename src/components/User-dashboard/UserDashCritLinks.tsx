import React from 'react'
import ShadowedCard from '@/components/ShadowedCard'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import UserGroupAndLinksRow from './UserGroupAndLinksRow'

type Props = {
  critLinks?: UserDashDetails['critical_links']
}

const UserDashCritLinks = ({critLinks}: Props) => {
  return (
    <ShadowedCard className='w-[50%] h-full gap-3'>
      <div className='flex h-[15%] justify-between items-start'>
        <div className='flex items-center gap-3 h-5'>
          <Image src='/link-icon-4.svg' width={25} height={25} alt="groups"/>
          <p className='text-[#7A7AFF] text-base font-medium leading-4'>Critical Links</p>
        </div>

        <Button className='text-primary_font h-8 px-2 text-sm font-medium leading-4 bg-white border-solid border-[1px] border-primary_font rounded-full'>Manage Links</Button>
      </div>

      <div className='flex flex-col gap-3 h-[30vh] overflow-y-auto pr-5 pl-3'>
        {critLinks && critLinks.map((link, index) => (
          <UserGroupAndLinksRow key={index} link={link}/>
        ))}
      </div>
    </ShadowedCard>
  )
}

export default UserDashCritLinks

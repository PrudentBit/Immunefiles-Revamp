import React from 'react'
import Image from 'next/image'

type Props = {
  link: UserDashDetails['critical_links'][0]
}

const UserGroupAndLinksRow = ({link}: Props) => {
  return (
    <div className='flex gap-4 justify-between items-center p-[0.6rem] px-5 rounded-lg bg-primary_bg'>
      <Image src='/groups-icon.svg' width={20} height={20} alt="group"/>
      <p className='w-full text-[#7A7AFF] text-base font-normal'>{link.name}</p>
      <button>
        <Image src='/remove-star-icon.svg' width={22} height={22} alt="storage"/>
      </button>
    </div>
  )
}

export default UserGroupAndLinksRow
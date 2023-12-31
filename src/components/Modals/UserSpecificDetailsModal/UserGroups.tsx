import React from 'react'
import Image from 'next/image'

type GroupType = {
  is_admin: boolean;
  name: string;
  member_count: number;
};

type Props = {
  userDetailsGroups?: GroupType[];
}

const UserGroups = ({userDetailsGroups}: Props) => {
  return (
    <div className='flex flex-col gap-3 w-full h-[12rem] bg-primary_bg rounded-2xl px-6 pt-4 pb-2'>
      <div className='flex w-full h-5 justify-between pr-4'>
        <div className='flex gap-2 h-5'>
          <Image src='/groups-icon-2.svg' width={18} height={18} alt="groups"/>
          <p className='text-[#7A7AFF] text-[1.1rem] font-medium leading-4'>Groups</p>
        </div>
        <p className=''>Total <span className='text-primary_font text-md font-medium leading-4'>{userDetailsGroups?.length || "--"} Groups</span></p>
      </div>

      <div className='w-full pr-4 flex flex-col gap-3 overflow-y-auto'>
        {userDetailsGroups?.map((group, index) => (
          <div key={index} className='w-full min-h-[2.5rem] bg-white rounded-sm flex items-center justify-between px-4'>
            <div className='flex gap-2 w-[40%] truncate'>
              <Image src='/groups-icon-3.svg' width={18} height={18} alt="groups"/>
              <p className='text-primary_font text-md font-normal leading-4'>{group.name}</p>
            </div>

            {group.is_admin && (
              <div className='flex gap-2'>
                <Image src='/crown-icon-green.svg' width={18} height={18} alt="admin"/>
                <p className='text-green-500 text-md font-normal leading-5'>Admin</p>
              </div>
            )}

            <p className='text-[#7A7AFF] w-[40%] text-right text-md font-normal leading-4'>{group.member_count} members</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserGroups

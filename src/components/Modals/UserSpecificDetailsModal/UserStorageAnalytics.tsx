import React from 'react'
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button'

type Props = {
  userDetailsStorage?: AdminSpecificUserType['storage']
}

const UserStorageAnalytics = ({userDetailsStorage}: Props) => {
  return (
    <div className='w-[45%] flex flex-col gap-3 bg-[#E5EDFF] rounded-xl px-4 p-3'>
      <div className='flex gap-2 h-5'>
        <Image src='/cloud-storage.svg' width={18} height={18} alt="storage"/>
        <p className='text-primary_font text-md font-medium leading-4'>Storage Analysis</p>
      </div>
      
      <div>
        <div className='flex justify-between items-end'>
          <p className='text-primary_font text-[0.8rem]'><span className='font-medium'>{userDetailsStorage?.storage_used || 0}</span>/{userDetailsStorage?.total_storage || 0} GB</p>
          <p className='text-green-500 text-xs'>{(parseInt(userDetailsStorage?.total_storage || "1")) - (parseInt(userDetailsStorage?.storage_used || "1"))} GB left</p>
        </div>
        <Progress 
          value={(parseInt(userDetailsStorage?.storage_used || "1") / parseInt(userDetailsStorage?.total_storage || "1")) * 100}
          className='rounded-full h-2 bg-white mt-1'
        />
      </div>

      <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-3">
        <div className="col-span-1 row-span-1 px-2 rounded-lg bg-white flex justify-between items-center">
          <div className='flex gap-1'>
            <Image src='/media-icon.svg' height={14} width={14} alt='media'/>
            <p className='text-[0.7rem] text-[#7A7AFF] font-normal'>Media</p>
          </div>
          <p className='text-primary_font font-medium text-[0.8rem]'>
            {userDetailsStorage?.perecentage?.media || 0}%
          </p>
        </div>
        <div className="col-span-1 row-span-1 px-2 rounded-lg bg-white flex justify-between items-center">
          <div className='flex gap-1'>
            <Image src='/docs-icon.svg' height={12} width={12} alt='docs'/>
            <p className='text-[0.7rem] text-[#7A7AFF] font-normal'>Docs</p>
          </div>
          <p className='text-primary_font font-medium text-[0.8rem]'>
            {userDetailsStorage?.perecentage?.docs || 0}%
          </p>
        </div>
        <div className="col-span-1 row-span-1 px-2 rounded-lg bg-white flex justify-between items-center">
          <div className='flex gap-1'>
            <Image src='/others-icon.svg' height={14} width={14} alt='others'/>
            <p className='text-[0.7rem] text-[#7A7AFF] font-normal'>Other</p>
          </div>
          <p className='text-primary_font font-medium text-[0.8rem]'>
            {userDetailsStorage?.perecentage?.others || 0}%
          </p>
        </div>
        <Button className="col-span-1 row-span-1 text-[0.8rem] w-min px-3 flex gap-2 h-8 truncate font-normal rounded-lg hover:bg-[#628CE9]">
          Add Storage
        </Button>
      </div>
    </div>
  )
}

export default UserStorageAnalytics
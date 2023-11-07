import React from 'react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'

type Props = {}

const UserDrives = (props: Props) => {
  return (
    <div className='flex flex-col gap-3 w-full h-[12rem] bg-[#E5EDFF] rounded-2xl px-6 pt-4 pb-2'>
      <div className='flex w-full h-5 justify-between pr-4'>
        <div className='flex gap-2 h-5'>
          <Image src='/groups-icon-2.svg' width={18} height={18} alt="groups"/>
          <p className='text-primary_font text-[1.1rem] font-medium leading-4'>Servers</p>
        </div>
        
        <p className=''>Total <span className='text-primary_font text-md font-medium leading-4'>-- Servers</span></p>
      </div>

      <div className='w-full flex flex-col pr-2 gap-3'>
        <div className='w-full min-h-[3.5rem] bg-white rounded-md flex items-center justify-between gap-2 px-4'>
          <div className="relative h-10 min-w-[2.5rem] p-1 rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-green-700 via-blue-600 to-yellow-400 opacity-[35%] rounded-lg"></div>
            <div className="relative h-full w-full flex items-center justify-center">
              <Image src='/google-drive.svg' width={22} height={22} alt="server"/>
            </div>
          </div>

          <div className='flex flex-col w-[12rem]'>
            <p className='text-primary_font text-sm font-medium leading-4'>Google Drive</p>
            <p className='text-gray-400'>-- servers created</p>
          </div>

          <div className='flex flex-col gap-2 w-full '>
            <div className='flex gap-8 justify-end'>
              <div className='flex gap-2 items-center'>
                <div className='h-2 w-2 rounded-full bg-green-500 mt-[0.1rem]'></div>
                <p className='text-green-500 text-[0.83rem] font-medium'>-- Active</p>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='h-2 w-2 rounded-full bg-gray-400 mt-[0.1rem]'></div>
                <p className='text-gray-400 text-[0.83rem] font-medium'>-- Inactive</p>
              </div>
            </div>

            <Progress value={50} className='bg-gray-300 h-[0.4rem]'/>
          </div>
        </div>

        <div className='w-full min-h-[3.5rem] bg-white rounded-md flex items-center justify-between gap-2 px-4'>
          <div className="relative h-10 min-w-[2.5rem] p-1 rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-400 via-blue-400 to-blue-500 opacity-[35%] rounded-lg"></div>
            <div className="relative h-full w-full flex items-center justify-center">
              <Image src='/one-drive.svg' width={23} height={23} alt="server"/>
            </div>
          </div>

          <div className='flex flex-col w-[12rem]'>
            <p className='text-primary_font text-sm font-medium leading-4'>One Drive</p>
            <p className='text-gray-400'>-- servers created</p>
          </div>

          <div className='flex flex-col gap-2 w-full '>
            <div className='flex gap-8 justify-end'>
              <div className='flex gap-2 items-center'>
                <div className='h-2 w-2 rounded-full bg-green-500 mt-[0.1rem]'></div>
                <p className='text-green-500 text-[0.83rem] font-medium'>-- Active</p>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='h-2 w-2 rounded-full bg-gray-400 mt-[0.1rem]'></div>
                <p className='text-gray-400 text-[0.83rem] font-medium'>-- Inactive</p>
              </div>
            </div>

            <Progress value={20} className='bg-gray-300 h-[0.4rem]'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDrives
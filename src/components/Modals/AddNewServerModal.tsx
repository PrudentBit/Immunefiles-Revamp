"use client"

import { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import createServer from '@/utils/api/createServerAPI'
import { UserDetailsStore } from '@/utils/store/userDetailsStore'
import { selectedServersStore } from '@/utils/store/integrationsStore'
import { toast } from 'sonner'

type Props = {
  drive: string
  navButton?: boolean
}

const AddNewServerModal = ({drive, navButton}: Props) => {
  const [value, setValue] = useState("");
  const {userDetails} = UserDetailsStore();
  const {toggleForceRefresh} = selectedServersStore();

  const handleCreate =async () => {
    if (userDetails) {
      const response = await createServer(value, drive, userDetails?.name)
      if (response.status === 200) {
        setValue('')
        toast.success('Server created successfully')
        toggleForceRefresh()
      }
      else{
        toast.error('Something went wrong', {
          description: response.data.message
        })
      }
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {navButton ? (
          <Button className='h-10 flex gap-2 px-6 hover:bg-[#6B97F8]'>
            <Image src='/server-icon.svg' width={18} height={18} alt="more"/>
            Add New
          </Button>
        ):(
          <Button className='h-10 flex gap-2 w-full hover:bg-[#6B97F8]'>
            Add New
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[35vw] translate-y-[-150%]'>
        <AlertDialogHeader className='flex flex-row justify-between h-10'>
          <div className="flex gap-3 items-center">
            <div className='rounded-full w-10 h-10 flex items-center justify-center bg-primary_bg'>
              <Image src="/server-icon-purple.svg" width={20} height={20} alt='details icon'/>
            </div>
            <AlertDialogTitle className='font-medium text-md text-[#7A7AFF]'>Add new server</AlertDialogTitle>
          </div>
          <AlertDialogCancel className='w-9 h-9 p-[0.6rem] rounded-full bg-[#F0F0F0] mt-0' onClick={(e) => e.stopPropagation()}>
            <Image src="/cross-icon.svg" width={20} height={20} className='rounded-full ' alt='close icon'/>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription className='text-[#7A7AFF] text-md p-2'>
          <div className='flex gap-4'>
            {drive == 'googledrive' ? (
              <div className="relative h-10 min-w-[2.5rem] p-1 rounded-sm">
                <div className={`absolute inset-0 bg-gradient-to-b from-green-700 via-blue-600 to-yellow-400 opacity-[35%] rounded-sm`}></div>
                <div className="relative h-full w-full flex items-center justify-center">
                  <Image src='/google-drive.svg' width={18} height={18} alt="server"/>
                </div>
              </div>
            ):(
              <div className="relative h-10 min-w-[2.5rem] p-1 rounded-sm">
                <div className={`absolute inset-0 bg-gradient-to-b from-gray-400 via-blue-400 to-blue-500 opacity-[35%] rounded-sm`}></div>
                <div className="relative h-full w-full flex items-center justify-center">
                  <Image src='/one-drive.svg' width={18} height={18} alt="server"/>
                </div>
              </div>
            )}
            <input 
              type="text"
              className='w-full h-10 rounded-sm bg-bg_hover px-4' 
              placeholder="Enter server name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter className='flex items-end justify-end'>
          <AlertDialogAction 
            className='rounded-full w-[10rem] text-white font-normal bg-primary_font_2 hover:text-primary_font_2 border-[1px] border-solid border-primary_font_2'
            onClick={handleCreate}
          >
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AddNewServerModal
"use client"
import React, { useState } from 'react'
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
import changeUsername from '@/utils/api/changeUsernameAPI'
import { UserDetailsStore } from '@/utils/store/userDetailsStore'

const ChangeUsernameModal = () => {
  const [passType, setPassType] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { userDetails } = UserDetailsStore();

  const handleCancel = () => {
    setName("");
    setPassword("");
  }

  const handleSave = async () => {
    try {
      const response = await changeUsername(name);
      console.log(response);

      setPassword("");
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className='cursor-pointer hover:bg-bg_hover p-[0.05rem] h-5 w-5 rounded-sm'>
        <Image src="/rename-icon-purple.svg" alt='rename' width={17} height={17} className='pt-1'/>
      </AlertDialogTrigger>
      <AlertDialogContent className="translate-y-[-100%] p-4">
        <AlertDialogHeader className='flex flex-row justify-between h-10'>
          <div className="flex gap-3">
            <Image src="/pen-icon.svg" width={20} height={20} className='rounded-full w-10 h-10 p-[0.6rem] bg-primary_bg' alt='pen'/>
            <div className="flex flex-col h-full">
              <AlertDialogTitle className="font-medium text-md">
                Change your user name
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs">
                Current user name : {userDetails?.name}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            <p className='text-sm text-primary_font_2'>Enter your new user name</p>
            <input type="text" className='w-full h-10 rounded-md px-3 bg-bg_hover text-gray-800 pb-1' value={name} onChange={(e) => setName(e.target.value)}/>
          </div>

          <div className='flex flex-col gap-2 pt-1'>
            <p className='text-sm text-primary_font_2'>Enter password</p>
            <div className='flex w-full h-10 rounded-md pr-3 bg-bg_hover text-gray-800 pb-1'>
              <input type={passType ? "password" : "text"} className='w-full h-10 rounded-md px-3 bg-bg_hover text-gray-800 pb-1' value={password} onChange={(e) => setPassword(e.target.value)}/>
              <button onClick={()=>setPassType(!passType)}>
                <Image src="/eye-icon.svg" width={20} height={20} className='pt-1' alt='eye'/>
              </button>
            </div>
          </div>

          <p className='text-sm text-red-400'>Incorrect password</p>

        </AlertDialogDescription>
        <AlertDialogFooter className="flex gap-4">
            <AlertDialogAction 
              className="w-[50%] rounded-full bg-primary_font_2 text-white hover:bg-[#9F9FFF]" 
              onClick={handleSave}
            >
              Save
            </AlertDialogAction>
            <AlertDialogCancel
              className="w-[50%] rounded-full hover:bg-[#D2D4DA] hover:text-black"
              onClick={handleCancel}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ChangeUsernameModal

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

const ChangeUserPassModal = () => {
  const [newPassType, setNewPassType] = useState(true);
  const [confirmPassType, setConfirmPassType] = useState(true);
  const [currentPassType, setCurrentPassType] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handleCancel = () => {
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex gap-2 items-center justify-center text-primary_font h-8 w-full px-2 mt-2 text-sm font-medium leading-4 bg-white border-solid border-[1px] border-primary_font rounded-xl">
        <Image src="/key-icon.svg" alt='key' width={16} height={16}/>
        <p className='text-xs font-normal leading-4'>Change Password</p>
      </AlertDialogTrigger>
      <AlertDialogContent className="translate-y-[-80%] p-4">
        <AlertDialogHeader className='flex flex-row justify-between h-10'>
          <div className="flex gap-3">
            <Image src="/pen-icon.svg" width={20} height={20} className='rounded-full w-10 h-10 p-[0.6rem] bg-primary_bg' alt='pen'/>
            <AlertDialogTitle className="font-medium text-md">
              Change your password
            </AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2 pt-1'>
            <p className='text-sm text-primary_font'>Enter new password</p>
            <div className='flex w-full h-10 rounded-md pr-3 bg-bg_hover text-gray-800 pb-1'>
              <input type={newPassType ? "password" : "text"} className='w-full bg-bg_hover h-10 rounded-md px-3 text-gray-800 pb-1' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
              <button onClick={()=>setNewPassType(!newPassType)}>
                <Image src="/eye-icon.svg" width={20} height={20} className='pt-1' alt='eye'/>
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-2 pt-1'>
            <p className='text-sm text-primary_font'>Confirm new password</p>
            <div className='flex w-full h-10 rounded-md pr-3 bg-bg_hover text-gray-800 pb-1'>
              <input type={confirmPassType ? "password" : "text"} className='w-full h-10 bg-bg_hover rounded-md px-3 text-gray-800 pb-1' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              <button onClick={()=>setConfirmPassType(!confirmPassType)}>
                <Image src="/eye-icon.svg" width={20} height={20} className='pt-1' alt='eye'/>
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-2 pt-1'>
            <p className='text-sm text-primary_font'>Enter current password</p>
            <div className='flex w-full h-10 rounded-md pr-3 bg-bg_hover text-gray-800 pb-1'>
              <input type={currentPassType ? "password" : "text"} className='w-full h-10 bg-bg_hover rounded-md px-3 text-gray-800 pb-1' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
              <button onClick={()=>setCurrentPassType(!currentPassType)}>
                <Image src="/eye-icon.svg" width={20} height={20} className='pt-1' alt='eye'/>
              </button>
            </div>
          </div>

          <p className='text-sm text-red-400'>Incorrect password</p>
        </AlertDialogDescription>
        <AlertDialogFooter className="flex gap-4">
            <AlertDialogAction className="w-[50%] rounded-full bg-primary_font_2 text-white hover:bg-[#9F9FFF]">
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

export default ChangeUserPassModal

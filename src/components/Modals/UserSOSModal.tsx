import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const UserSOSModal = () => {
  const [currentPassType, setCurrentPassType] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="w-[25%] h-10 rounded-full bg-transparent text-red-500 border-[1px] border-solid border-red-500 hover:text-white"
          >
            Apply SOS
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="translate-y-[-150%]">
          <AlertDialogHeader className="flex flex-row items-center justify-between">
            <div className="flex gap-3">
              <div className="rounded-full min-w-[2.5rem] h-[2.5rem] flex items-center justify-center bg-[#FFEBEB]">
                <Image
                  src="/warning-icon.svg"
                  width={20}
                  height={20}
                  alt="restrict"
                />
              </div>
              <div className="flex flex-col h-full">
                <AlertDialogTitle className="font-medium text-sm leading-5">
                  Apply SOS
                </AlertDialogTitle>
                <AlertDialogDescription className="text-xs leading-3">
                  This will immediately EXPIRE all the links generated from this account.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogDescription className="h-[4rem] flex flex-col gap-4">
            <div className='flex flex-col gap-2'>
              <p className='text-sm text-primary_font'>Enter current password</p>
              <div className='flex w-full h-10 rounded-md pr-3 bg-bg_hover text-gray-800 pb-1'>
                <input type={currentPassType ? "password" : "text"} className='w-full h-10 bg-bg_hover rounded-md px-3 text-gray-800 pb-1'/>
                <button onClick={()=>setCurrentPassType(!currentPassType)}>
                  <Image src="/eye-icon.svg" width={20} height={20} className='pt-1' alt='eye'/>
                </button>
              </div>
            </div>
            <p className='text-sm text-red-400'>{error}</p>
          </AlertDialogDescription>
          <AlertDialogFooter className='flex gap-4'>
            <AlertDialogAction className='w-[50%] rounded-full bg-[#FF6161] text-white hover:bg-[#FF7F7F]'>Apply SOS</AlertDialogAction>
            <AlertDialogCancel className='w-[50%] rounded-full hover:bg-[#D2D4DA] hover:text-black'>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserSOSModal;

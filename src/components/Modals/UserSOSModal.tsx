import React, { useState } from 'react';
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
import { UserDetailsStore } from '@/utils/store/userDetailsStore';
import applyUserSOS from '@/utils/api/applyUserSOSAPI';
import { toast } from 'sonner';

const UserSOSModal = () => {
  const [error, setError] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const { userDetails } = UserDetailsStore();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setEnteredUsername(newUsername);

    if (newUsername === userDetails?.username) {
      setError("");
    } else {
      setError("Username does not match");
    }
  };

  const handleApplySOS = async () => {
    if (enteredUsername === userDetails?.username) {
      try {
        const response = await applyUserSOS();
        setEnteredUsername("");
        if (response.status === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error calling API:", error);
        toast.error("Something went wrong");
      }
    } else {
      setError("Username does not match");
      toast.error("Username does not match");
    }
  };

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
        <AlertDialogContent className="translate-y-[-130%]">
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
          <AlertDialogDescription className="h-[5.4rem] flex flex-col gap-4">
            <div className='flex flex-col gap-2'>
              <p className='text-sm text-primary_font'>Enter your username</p>
              <input
                type="text"
                className='w-full h-10 bg-bg_hover rounded-md px-3 text-gray-800 pb-1'
                value={enteredUsername}
                onChange={handleUsernameChange}
              />
              <p className='text-sm text-red-400'>{error}</p>
            </div>
            
          </AlertDialogDescription>
          <AlertDialogFooter className='flex gap-4'>
            <AlertDialogAction 
              className='w-[50%] rounded-full bg-[#FF6161] text-white hover:bg-[#FF7F7F]'
              disabled={enteredUsername !== userDetails?.username}
              onClick={handleApplySOS}
            >
              Apply SOS
            </AlertDialogAction>
            <AlertDialogCancel className='w-[50%] rounded-full hover:bg-[#D2D4DA] hover:text-black'>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserSOSModal;

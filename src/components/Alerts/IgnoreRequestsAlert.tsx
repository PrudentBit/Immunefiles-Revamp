'use client';
import React, { useState } from 'react';
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
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import BotLeftAlert from '@/components/BotLeftAlert';

type Props = {};

const IgnoreRequestedAlert = (props: Props) => {
  const [deletedSuccessfully, setDeletedSuccessfully] = useState<boolean>();
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className='rounded-full flex justify-between items-center px-3 gap-2 text-white h-9 bg-[#FF6161] hover:bg-[#FF7474]'>
            <Image src='/close-icon-2.svg' width={16} height={16} alt='ignore'/>
            <p className='text-white'>Ignore all</p>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="translate-y-[-210%]">
          <AlertDialogHeader className="flex flex-row items-center gap-3">
            <div className="rounded-full w-10 h-10 flex justify-center items-center bg-[#FFEBEB]">
              <Image
                src="/warning-icon.svg"
                width={20}
                height={20}
                alt="delete icon"
              />
            </div>
            <div className="flex flex-col h-full">
              <AlertDialogTitle className="font-medium text-md">
                Ignore all requests
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs">
                *This will remove all the pending file requests.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-4">
            <AlertDialogAction
              className="w-[50%] rounded-full bg-[#FF6161] text-white hover:bg-[#FF7F7F]"
            >
              Yes! Ignore
            </AlertDialogAction>
            <AlertDialogCancel
              className="w-[50%] rounded-full hover:bg-[#D2D4DA] hover:text-black"
              onClick={(e) => e.stopPropagation()}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {deletedSuccessfully && (
        <BotLeftAlert image="/delete-icon.svg" imagebg="bg-[#FFE3E5]">
          <div className="flex flex-col items-start text-left leading-[0.2rem] gap-[0.35rem]">
            <p className="text-[#FF6161] font-semibold text-base leading-4  ">
              deleted
            </p>
            <p className="text-[#979797] font-[400] text-sm leading-[1.1rem]">
              you can restore the items from trash bin whenever needed.
            </p>
          </div>
          <button
            className="border-2 border-solid border-primary_font text-primary_font px-2 py-[0.1rem] rounded-lg"
          >
            undo
          </button>
        </BotLeftAlert>
      )}
    </>
  );
};

export default IgnoreRequestedAlert;

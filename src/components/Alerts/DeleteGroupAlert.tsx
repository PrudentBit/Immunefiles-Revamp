'use client';

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


const DeleteGroupAlert = () => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <Image
              src="/delete-icon.svg"
              onClick={(e) => e.stopPropagation()}
              width={20}
              height={20}
              alt="Delete icon"
            />
        </AlertDialogTrigger>
        <AlertDialogContent className="translate-y-[-210%]">
          <AlertDialogHeader className="flex flex-row items-center gap-3">
            <Image
              src="/trash-icon.svg"
              width={20}
              height={20}
              className="rounded-full w-10 h-10 p-2 bg-[#FFEBEB]"
              alt="delete icon"
            />
            <div className="flex flex-col h-full">
              <AlertDialogTitle className="font-medium text-md">
                Do you want to delete these groups?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs">
                You can restore deleted items from trash
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-4">
            <AlertDialogAction
              className="w-[50%] rounded-full bg-[#FF6161] text-white hover:bg-[#FF7F7F]"
            >
              Delete
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
    </>
  );
};

export default DeleteGroupAlert;

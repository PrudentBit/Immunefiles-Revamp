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
import { Delete } from 'lucide-react';
import deleteGroupFiles from '@/utils/api/deleteGroupFilesAPI';
import { group } from 'console';

type Props = {
  type: string;
  group_hash: string;
  file: groupFileandFolderType;
};

const DeleteGroupFilesAlert = ({ type, group_hash, file }: Props) => {
  const [deletedSuccessfully, setDeletedSuccessfully] = useState<boolean>();

  const deleteSelected = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let response;

    e.stopPropagation();
    if (type === 'file') {
      response = await deleteGroupFiles(file.urlhash, null, group_hash);
    } else {
      response = await deleteGroupFiles(null, file.urlhash, group_hash);
    }

    if (response.status === 200) {
      setDeletedSuccessfully(true);
    } else {
      setDeletedSuccessfully(false);
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <p onClick={(e) => e.stopPropagation()} className="w-full">
            Delete
          </p>
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
                Do you want to delete this item?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs">
                You can restore deleted items from trash
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-4">
            <AlertDialogAction
              className="w-[50%] rounded-full bg-[#FF6161] text-white hover:bg-[#FF7F7F]"
              onClick={(e) => deleteSelected(e)}
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

export default DeleteGroupFilesAlert;

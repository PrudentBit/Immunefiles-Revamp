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
import {toast} from 'sonner';
import deleteFiles from '@/utils/api/deleteFileAPI';
import recoverDeletedFiles from '@/utils/api/recoverDeletedFilesAPI';
import { selectedFilesStore } from '@/utils/store/selectFilesStore';
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore';

type Props = {
  multiplefiles: boolean;
};

const DeleteFileAlert = ({ multiplefiles}: Props) => {
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);
  const [deletedFolders, setDeletedFolders] = useState<string[]>([]);
  const [file, removeAllFiles, removeFile, addFile] = selectedFilesStore(
    (state) => [
      state.files,
      state.removeAllFiles,
      state.removeFile,
      state.addFile,
    ]
  );
  const [toggleForceRefresh] = useFileAndFolderStore((state) => [
    state.toggleForceRefresh,
  ]);

  const deleteSelected = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const files = file.filter((item) =>  item.is_file);
    const folders = file.filter((item) => !item.is_file);

    const fileUrls = files.map((item) => item.urlhash);
    const folderUrls = folders.map((item) => item.urlhash);

    const result = await deleteFiles(fileUrls, folderUrls);

    if (result.status === 200) {
      toast.error('Your file is deleted successfully', {
        action: {
          label: 'Undo',
          onClick: () => recoverDeleted(),
        },
        description: 'Click undo to recover your files'
      })
      setDeletedFiles(fileUrls);
      setDeletedFolders(folderUrls);
      for (let i = 0; i < fileUrls.length; i++) {
        removeFile(fileUrls[i]);
      }
      addFile({
        name: 'Trash',
        urlhash: 'trash',
        is_file: false,
        owner: '',
        date_created: '',
        shared_with: [],
      });
      toggleForceRefresh();
      setTimeout(() => {
        removeAllFiles();
      }, 5000);
    }
    else {
      toast.error(result.data.message)
      toggleForceRefresh();
    }
  };

  const recoverDeleted = async () => {
    toast.warning('File recovery is under process.')
    const result = await recoverDeletedFiles(deletedFiles, deletedFolders);
    if (result.message === 'successfully recovered') {
      toast.success('Files recovered successfully.')
      removeAllFiles();
      toggleForceRefresh();
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {multiplefiles ? (
            <Image
              src="/delete-icon.svg"
              onClick={(e) => e.stopPropagation()}
              width={16}
              height={16}
              alt="Delete icon"
            />
          ) : (
            <p onClick={(e) => e.stopPropagation()} className="w-full">
              Delete
            </p>
          )}
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
                {multiplefiles
                  ? 'Do you want to delete these items?'
                  : 'Do you want to delete this item?'}
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

export default DeleteFileAlert;

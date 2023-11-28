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
import { selectedFilesStore } from '@/utils/store/selectFilesStore';
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore';
import { zippingFiles } from '@/utils/api/zippingFilesAPI';

const ZipFilesAlert = () => {
  const [files, removeAllFiles] = selectedFilesStore((state) => [
    state.files,
    state.removeAllFiles,
  ]);
  const [toggleForceRefresh] = useFileAndFolderStore((state) => [
    state.toggleForceRefresh,
  ]);
  const [fileName, setFileName] = useState<string>('');

  const handleZipFiles = async () => {
    const filesToZip = files.map((file) => file.urlhash);
    console.log(files);
    const response = await zippingFiles(filesToZip, fileName);
    if (response.message === 'zip created') {
      toggleForceRefresh();
      removeAllFiles();
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Image
            src="/zip-icon.svg"
            onClick={(e) => e.stopPropagation()}
            width={16}
            height={16}
            alt="Delete icon"
          />
        </AlertDialogTrigger>
        <AlertDialogContent className="translate-y-[-165%] gap-5">
          <AlertDialogHeader className="flex flex-row items-center gap-3">
            <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary_bg">
              <Image
                src="/zip-folder-icon.svg"
                width={20}
                height={20}
                alt="zip icon"
              />
            </div>
            <AlertDialogTitle className="font-medium text-md pb-1">
              <div className="flex flex-col">
                Do you want to archive {files.length} items?
                <p className="text-xs text-[#87898E] font-normal">
                  You can unzip the files anytime you want.
                </p>
              </div>
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="flex gap-4 pl-2">
            <Image
              src="/FileIcons/zip.svg"
              width={30}
              height={30}
              alt="zip icon"
            />
            <input
              type="text"
              title="Enter zipped file name"
              className="w-full h-10 px-5 rounded-md bg-[#F0F0F0]"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </AlertDialogDescription>
          <AlertDialogFooter className="flex gap-4">
            <AlertDialogAction
              className="w-[50%] rounded-full bg-primary_font text-white hover:bg-bg_hover"
              onClick={handleZipFiles}
            >
              Yes! Archive
            </AlertDialogAction>
            <AlertDialogCancel
              className="w-[50%] rounded-full bg-[#F1F1F1] hover:bg-[#D2D4DA] hover:text-black"
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

export default ZipFilesAlert;

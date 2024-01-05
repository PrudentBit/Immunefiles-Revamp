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

import uploadFiles from '@/utils/api/uploadFilesAPI';
import uploadFolders from '@/utils/api/uploadFoldersAPI';
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

const UploadFileModal = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>([]);
  const [uploadedFolders, setUploadedFolders] = useState<FileWithPath[]>([]);
  const [toggleForceRefresh] = useFileAndFolderStore((state) => [
    state.toggleForceRefresh,
  ]);

  const handleFileRemove = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((file, i) => i !== index));
  };

  const handleFolderRemove = (index: number) => {
    setUploadedFolders(uploadedFolders.filter((folder, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: FileWithPath[]) => {
      acceptedFiles.forEach((file: FileWithPath) => {
        if (file.path && file.path.includes('/')) {
          setUploadedFolders((prevFolders) => [...prevFolders, file]);
        } else {
          setUploadedFiles((prevFiles) => [...prevFiles, file]);
        }
      });
    },
  });

  const [fileProgress, setFileProgress] = useState<{
    batch: string[];
    progress: number[];
  }>({ batch: [], progress: [] });
  //workaround
  console.log(fileProgress);

  const startUpload = async () => {
    let fileProgress;
    if (uploadedFiles.length > 0) {
      fileProgress = await uploadFiles(
        uploadedFiles,
        'root',
        (progress) => {
          return progress;
        }
      );
    }

    // Upload folders
    let folderProgress;
    if (uploadedFolders.length > 0) {
      folderProgress = await uploadFolders(
        uploadedFolders,
        (progress) => {
          return progress;
        }
      );
    }

    if (fileProgress?.status === 200){
      toast.success('Files uploaded successfully');
      setUploadedFiles([]);
      toggleForceRefresh();
    }
    else if(fileProgress?.status && !(fileProgress?.status === 200)){
      toast.error('Files upload failed');
    }

    if (folderProgress?.status === 200){
      toast.success('Folders uploaded successfully');
      setUploadedFolders([]);
      toggleForceRefresh();
    }
    else if(folderProgress?.status && !(folderProgress?.status === 200)){
      toast.error('Folders upload failed');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        className="rounded-full bg-primary_bg p-2 hover:bg-button_hover"
      >
        <button className="h-10 w-10">
          <Image
            title="Upload Files"
            src="/upload-icon.svg"
            width={42}
            height={42}
            alt="File icon"
          />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-row h-10 justify-end gap-[6.5rem]">
          <AlertDialogTitle className="font-bold text-xl text-black mt-1 pt-[0.3rem]">
            Upload Here
          </AlertDialogTitle>
          <AlertDialogCancel
            className="w-9 h-9 p-[0.6rem] rounded-full bg-[#F0F0F0] mt-0"
            onClick={(e) => {
              e.stopPropagation();
              setUploadedFiles([]);
              setUploadedFolders([]);
            }}
          >
            <Image
              src="/cross-icon.svg"
              width={20}
              height={20}
              className="rounded-full"
              alt="close icon"
            />
          </AlertDialogCancel>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-[#7A7AFF] text-md p-2 pr-0 flex flex-col justify-center h-[25rem] gap-2">
          <div
            {...getRootProps()}
            className={`w-[24rem] cursor-pointer ${
              uploadedFiles.length > 0 || uploadedFolders.length > 0
                ? 'h-[40%]'
                : 'h-[100%]'
            } mr-2 bg-primary_bg rounded-md flex justify-center items-center border-dashed border-[2px] border-[#c7c7c7]`}
          >
            <input
              {...getInputProps()}
              type="file"
              name="UploadFiles"
              id="UploadFiles"
              className="hidden"
            />
            <div className="flex flex-col justify-center items-center gap-3">
              <Image
                src="/upload-icon-2.svg"
                width={48}
                height={48}
                alt="upload icon"
              />
              <p className="text-black text-sm font-semibold">
                Drag & drop files or{' '}
                <span className="text-primary_font underline">Browse</span>
              </p>
              <p className="text-[#676767] text-xs font-normal">
                Upload your files/folders from you local machine
              </p>
            </div>
          </div>

          {(uploadedFiles.length > 0 || uploadedFolders.length > 0) && (
            <div className="w-full h-[60%] rounded-md py-2 overflow-y-auto">
              <div className="flex flex-col gap-2 pr-2">
                <p className="text-[#676767] font-semibold">
                  Uploaded - ({uploadedFiles.length + uploadedFolders.length})
                </p>

                <div className="flex flex-col gap-2">
                  {uploadedFolders.map((uploadedFolder, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-[1px] border-solid border-[#048739] rounded-sm text-sm px-2 py-[0.3rem] items-center"
                    >
                      <p className="text-[#0F0F0F] w-[90%] truncate">
                        {uploadedFolder.name}
                      </p>
                      <Image
                        src="/delete-icon.svg"
                        width={1}
                        height={1}
                        className="rounded-full w-4 h-4 p-[0.1rem] bg-[#FFE3E5] cursor-pointer"
                        alt="close icon"
                        onClick={() => handleFolderRemove(index)}
                      />
                    </div>
                  ))}
                  {uploadedFiles.map((uploadedFile, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-[1px] border-solid border-[#048739] rounded-sm text-sm px-2 py-[0.3rem] items-center"
                    >
                      <p className="text-[#0F0F0F] w-[90%] truncate">
                        {uploadedFile.name}
                      </p>
                      <Image
                        src="/delete-icon.svg"
                        width={1}
                        height={1}
                        className="rounded-full w-4 h-4 p-[0.1rem] bg-[#FFE3E5] cursor-pointer"
                        alt="close icon"
                        onClick={() => handleFileRemove(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={startUpload}
            className="rounded-full w-full text-white font-semibold bg-primary_font hover:text-primary_font border-2 border-solid border-primary_font"
          >
            UPLOAD
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UploadFileModal;

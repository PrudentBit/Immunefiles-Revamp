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
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import uploadFiles from '@/utils/api/uploadFilesAPI'
import uploadFolders from '@/utils/api/uploadFoldersAPI'
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore'
import BotLeftAlert from '../BotLeftAlert'

type Props = {}

const UploadFileModal = (props: Props) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedFolders, setUploadedFolders] = useState<{name: string, files: {file: File, filePath: string}[]}[]>([]);
  const [toggleForceRefresh] = useFileAndFolderStore((state) => [state.toggleForceRefresh]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUploadedFiles([...uploadedFiles, ...files]);
    }
  }

  const handleFileRemove = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((file, i) => i !== index));
  }

  const handleFolderRemove = (index: number) => {
    setUploadedFolders(uploadedFolders.filter((folder, i) => i !== index));
  }

  const handleFileDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  
    if (event.dataTransfer.items) {
      let items = event.dataTransfer.items;
  
      for (let i = 0; i < items.length; i++) {
        let entry = items[i].webkitGetAsEntry();
  
        if (entry) {
          traverseFileTree(entry);
        }
      }
    }
    event.dataTransfer.clearData();
  }
  
  const traverseFileTree = (entry: any, path = '') => {
    if (entry.isFile) {
      entry.file((file: File) => {
        if (file.name !== 'desktop.ini') {
          setUploadedFiles(prevFiles => [...prevFiles, file]);
        }
      });
    } else if (entry.isDirectory) {
      let dirReader = entry.createReader();
      let folderFiles: {file: File, filePath: string}[] = [];
  
      dirReader.readEntries((entries: any[]) => {
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].isFile) {
            entries[i].file((file: File) => {
              if (file.name !== 'desktop.ini') {
                folderFiles.push({file, filePath: path + entry.name + '/' + file.name});
              }
            });
          } else if (entries[i].isDirectory) {
            traverseFileTree(entries[i], path + entry.name + '/');
          }
        }
  
        setUploadedFolders(prevFolders => [...prevFolders, {name: entry.name, files: folderFiles}]);
      });
    }
  }
  

  const [fileProgress, setFileProgress] = useState<{batch : string[], progress: number[]}>({batch: [], progress: []});
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const startUpload = async () => {
    // Upload individual files
    const fileProgress = await uploadFiles(uploadedFiles, 'root', (progress) => {
      console.log(`File upload progress: ${progress}%`);
      return progress;
    });

    setFileProgress(prevState => ({
      ...prevState,
      batch: [...prevState.batch, 'files'],
      progress: [...prevState.progress, fileProgress.progress]
    }));

    // Upload folders
    for (let i = 0; i < uploadedFolders.length; i++) {
      const {name, files} = uploadedFolders[i];
      const result = await uploadFolders(files, name, 'root', (progress) => {
        console.log(`Upload progress for folder ${name}: ${progress}%`);
        return progress;
      });

      if (result.success) {
        console.log(`Folder ${name} uploaded successfully`);
        setFileProgress(prevState => ({
          ...prevState,
          batch: [...prevState.batch, name],
          progress: [...prevState.progress, result.progress]
        }));
      } else {
        console.error(`Error uploading folder ${name}`, result.error);
      }
    }

    toggleForceRefresh();
    setIsUploaded(true);
    setUploadedFiles([]);
    setUploadedFolders([]);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className='rounded-full bg-primary_bg p-2 hover:bg-button_hover'>
        <Image title='Upload Files' src='/upload-icon.svg' width={42} height={42} alt='File icon'/>
      </AlertDialogTrigger>
      <AlertDialogContent>

        <AlertDialogHeader className='flex flex-row h-10 justify-end gap-[6.5rem]'>
          <AlertDialogTitle className='font-bold text-xl text-black mt-1 pt-[0.3rem]'>Upload Here</AlertDialogTitle>
          <AlertDialogCancel className='w-9 h-9 p-[0.6rem] rounded-full bg-[#F0F0F0] mt-0' onClick={(e) => e.stopPropagation()}>
            <Image src="/cross-icon.svg" width={20} height={20} className='rounded-full' alt='close icon'/>
          </AlertDialogCancel>
        </AlertDialogHeader>

        <AlertDialogDescription className='text-[#7A7AFF] text-md p-2 pr-0 flex flex-col justify-center h-[25rem] gap-2'>
          <label 
            htmlFor="UploadFiles" 
            className={`w-[24rem] cursor-pointer ${(uploadedFiles.length > 0 || uploadedFolders.length > 0 ) ? "h-[40%]" : "h-[100%]"} mr-2 bg-primary_bg rounded-md flex justify-center items-center border-dashed border-[2px] border-[#c7c7c7]`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleFileDrop}
          >
            <div className='flex flex-col justify-center items-center gap-3'>
              <Image src="/upload-icon-2.svg" width={48} height={48} alt='upload icon'/>
              <p className='text-black text-sm font-semibold'>Drag & drop files or <span className='text-primary_font underline'>Browse</span></p>
              <p className='text-[#676767] text-xs font-normal'>Upload your files/folders from you local machine</p>
            </div>
          </label>
          <input type="file" name="UploadFiles" id="UploadFiles" className='hidden' multiple onChange={handleFileUpload}/>

          {(uploadedFiles.length > 0 || uploadedFolders.length > 0) &&
            <div className='w-full h-[60%] rounded-md py-2 overflow-y-auto'>
              {/* <div className='flex flex-col gap-2 pr-2'>
                <p className='text-[#676767] font-semibold'>Uploading - {}/{uploadedFiles.length + uploadedFolders.length} files</p>

                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between border-[1px] border-solid border-[#048739] rounded-sm text-sm px-2 py-[0.3rem] items-center'>
                    <p className='text-[#0F0F0F]'></p>
                    <Image src="/cross-icon-white.svg" width={10} height={10} className='rounded-full w-4 h-4 ' alt='close icon'/>
                  </div>
                </div>
              </div> */}

              <div className='flex flex-col gap-2 pr-2'>
                <p className='text-[#676767] font-semibold'>Uploaded - ({uploadedFiles.length + uploadedFolders.length})</p>

                <div className='flex flex-col gap-2'>
                  {uploadedFolders.map((uploadedFolder, index) => (
                    <div key={index} className='flex justify-between border-[1px] border-solid border-[#048739] rounded-sm text-sm px-2 py-[0.3rem] items-center'>
                      <p className='text-[#0F0F0F] w-[90%] truncate'>{uploadedFolder.name} ({`${uploadedFolder.files.length}`} files)</p>
                      <Image src="/delete-icon.svg" width={1} height={1} className='rounded-full w-4 h-4 p-[0.1rem] bg-[#FFE3E5] cursor-pointer' alt='close icon' onClick={() => handleFolderRemove(index)}/>
                    </div>
                  ))}
                  {uploadedFiles.map((uploadedFile, index) => (
                    <div key={index} className='flex justify-between border-[1px] border-solid border-[#048739] rounded-sm text-sm px-2 py-[0.3rem] items-center'>
                      <p className='text-[#0F0F0F] w-[90%] truncate'>{uploadedFile.name}</p>
                      <Image src="/delete-icon.svg" width={1} height={1} className='rounded-full w-4 h-4 p-[0.1rem] bg-[#FFE3E5] cursor-pointer' alt='close icon' onClick={() => handleFileRemove(index)}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogAction onClick={startUpload} className='rounded-full w-full text-white font-semibold bg-primary_font hover:text-primary_font border-2 border-solid border-primary_font'>UPLOAD</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

      {isUploaded && (
        <BotLeftAlert image='/task-completed-icon.svg' imagebg='bg-[#E5EDFF]'>
          <div className='flex flex-col items-start text-left leading-[0.2rem] gap-[0.35rem]'>
            <p className='text-primary_font font-semibold text-base leading-4  '>Files/Folders uploaded successfully</p>
            <p className='text-[#979797] font-[400] text-sm leading-[1.1rem]'>you can now view your uploaded items in file system.</p>
          </div>
          <button onClick={()=>setIsUploaded(false)} className='text-primary_font px-2 mb-8 text-lg'>x</button>
        </BotLeftAlert>
      )}

    </AlertDialog>
  )
}

export default UploadFileModal

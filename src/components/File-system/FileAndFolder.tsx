'use client';

import React, { useState } from 'react';
import FileSection from '@/components/File-system/FileSection';
import FileSectionSkeleton from '@/components/Skeletons/FileSectionSkeleton';
import getFiles from '@/utils/api/getFilesAPI';
import { decryptData } from '@/utils/helper/decryptFiles';
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore';
import { useDropzone } from 'react-dropzone';
import uploadFiles from '@/utils/api/uploadFilesAPI';
import uploadFolders from '@/utils/api/uploadFoldersAPI';
import { FileWithPath } from 'react-dropzone';
import { toast } from 'sonner';

type Props = {
  root: string;
};

const FileAndFolder = ({ root }: Props) => {
  const {
    files,
    folders,
    setFiles,
    setFolders,
    forceRefresh,
    toggleForceRefresh,
    sortBy,
    order,
  } = useFileAndFolderStore();
  const [loading, setLoading] = React.useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>([]);
  const [uploadedFolders, setUploadedFolders] = useState<FileWithPath[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    onDrop: (acceptedFiles: FileWithPath[]) => {
      acceptedFiles.forEach((file) => {
        if (file.path && file.path.includes('/')) {
          setUploadedFolders((prevFolders) => [...prevFolders, file]);
        } else {
          setUploadedFiles((prevFiles) => [...prevFiles, file]);
        }
      });
    },
  });

  React.useEffect(() => {
    const startUpload = async () => {
      let fileProgress;
      if (uploadedFiles.length > 0) {
        fileProgress = await uploadFiles(
          uploadedFiles,
          'root',
          (progress) => {
            console.log(`File upload progress: ${progress}%`);
            return progress;
          }
        );
      }
      let folderProgress;
      if (uploadedFolders.length > 0) {
        folderProgress = await uploadFolders(
          uploadedFolders,
          (progress) => {
            console.log(`Folder upload progress: ${progress}%`);
            return progress;
          }
        );
      }
      
      if (fileProgress) {
        if (fileProgress.status === 200){
          setUploadedFiles([]);
        toggleForceRefresh();
          toast.success('Files uploaded successfully');
        } else {
          toast.error('Error uploading files');
        }
      }
      if (folderProgress) {
        if (folderProgress.status === 200){
          setUploadedFolders([]);
        toggleForceRefresh();
          toast.success('Folders uploaded successfully');
        } else {
          toast.error('Error uploading folders');
        }
      }
    };

    if (uploadedFiles.length > 0 || uploadedFolders.length > 0) {
      startUpload();
    }
  }, [uploadedFiles, uploadedFolders]);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fileData = await getFiles(root, sortBy, order);
      try{
        const decryptedData = decryptData(fileData.ciphertext);

        setFolders(decryptedData.children);
        setFiles(decryptedData.files);

        setLoading(false);
      }
      catch(err){
        toast.error('Error fetching files');
      }
    };

    fetchData();
  }, [root, forceRefresh, sortBy, order]);

  return (
    <div
      {...getRootProps()}
      className={`mb-4 bg-[#fcfcfc] relative h-full rounded-2xl focus:outline-none border-dashed border-[2px] ${
        isDragActive
          ? 'border-primary_border border-dashed border-[2px]'
          : 'border-[#fcfcfc] border-dotted border-[2px]'
      }`}
      tabIndex={-1}
    >
      <input
        {...getInputProps()}
        type="file"
        name="UploadFiles"
        id="UploadFiles"
        tabIndex={-1}
        className="hidden"
      />
      {isDragActive && (
        <div className="absolute flex items-center justify-center w-full h-full rounded-2xl bg-[#4B7BEF20] z-10 backdrop-blur-sm text-[#28358B] font-bold text-2xl">
          Drag & Drop files here
        </div>
      )}
      <div className="pr-1 p-3">
        <div className="fileAndFolder absolute flex flex-col gap-8 h-[64vh] overflow-auto pr-1">
          {loading ? (
            <FileSectionSkeleton />
          ) : (
            <>
              {folders && folders.length > 0 && (
                <FileSection subFiles={folders} type='folder' />
              )}

              {files && files.length > 0 && (
                <FileSection subFiles={files} type='file' />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileAndFolder;
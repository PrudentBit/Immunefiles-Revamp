'use client';

import React, { useEffect, useState } from 'react';
import FileSection from '@/components/File-system/fileSection/FileSection';
import FileSectionSkeleton from '@/components/File-system/fileSection/FileSectionSkeleton';
import getFiles from '@/utils/api/getFilesAPI';
import { decryptData } from '@/utils/helper/decryptFiles';
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore';
import fetchGroupDetails from '@/utils/api/getGroupDetailsAPI';
import { GroupStore } from '@/utils/store/groupDetailsStore';
import { useDropzone } from 'react-dropzone';
import uploadFiles from '@/utils/api/uploadFilesAPI';
import uploadFolders from '@/utils/api/uploadFoldersAPI';
import { FileWithPath } from 'react-dropzone';

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
    sortFiles,
    sortFolders,
  } = useFileAndFolderStore();
  const { setGroups } = GroupStore();
  const [loading, setLoading] = React.useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>([]);
  const [uploadedFolders, setUploadedFolders] = useState<FileWithPath[]>([]);

  useEffect(() => {
    sortFiles();
    sortFolders();
  }, []);

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
      try {
        const fileProgress = await uploadFiles(
          uploadedFiles,
          'root',
          (progress) => {
            console.log(`File upload progress: ${progress}%`);
            return progress;
          }
        );

        const folderProgress = await uploadFolders(
          uploadedFolders,
          (progress) => {
            console.log(`Folder upload progress: ${progress}%`);
            return progress;
          }
        );

        console.log(fileProgress, folderProgress);

        toggleForceRefresh();
      } catch (error) {
        console.error(error);
      } finally {
        setUploadedFiles([]);
        setUploadedFolders([]);
        toggleForceRefresh();
      }
    };

    if (uploadedFiles.length > 0 || uploadedFolders.length > 0) {
      startUpload();
    }
  }, [uploadedFiles, uploadedFolders]);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fileData = await getFiles(root);
      if (fileData){
        const decryptedData = decryptData(fileData.ciphertext);

        setFolders(decryptedData.children);
        setFiles(decryptedData.files);

        const groupData = await fetchGroupDetails();
        if (groupData) {
          const decryptedGroupData = decryptData(groupData.ciphertext);
          setGroups(decryptedGroupData.groups);
        }

        setLoading(false);
      }
    };

    fetchData();
  }, [root, forceRefresh]);

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
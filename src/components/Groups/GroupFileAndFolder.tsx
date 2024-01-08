"use client";

import { useState, useEffect } from 'react';
import { useGroupFilesAndFoldersStore } from '@/utils/store/groupFilesAndFoldersStore';
import getGroupFiles from '@/utils/api/getGroupFilesAPI';
import { decryptData } from '@/utils/helper/decryptFiles';
import FileSectionSkeleton from '@/components/File-system/fileSection/FileSectionSkeleton';
import GroupFileSection from './GroupFileSection';

type Props = {
  group_hash: string,
  folder_hash: string
}

const GroupFileAndFolder = ({ group_hash, folder_hash }: Props) => {
  
  const { files,
    folders, 
    forceRefresh, 
    setFiles, 
    setFolders, 
  } = useGroupFilesAndFoldersStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFiles = async () => {
      setLoading(true);
      const response = await getGroupFiles(group_hash, folder_hash);
      const decryptedData = decryptData(response.data.ciphertext);
      if (response.status === 200) {
        setFiles(decryptedData.files);
        setFolders(decryptedData.folders);
        setLoading(false);
      }
      else{
        console.log(decryptData(response.data.ciphertext));
      }
    }
    getFiles();
  }, [group_hash, folder_hash, forceRefresh]);

  return (
    <div className="pr-1 p-3">
      <div className="fileAndFolder absolute flex flex-col gap-8 h-[64vh] overflow-auto pr-1">
        {loading ? (
          <FileSectionSkeleton />
        ) : (
          <>
            {folders && folders.length > 0 && (
              <GroupFileSection subFiles={folders} type='folder' group_hash={group_hash}/>
            )}

            {files && files.length > 0 && (
              <GroupFileSection subFiles={files} type='file' group_hash={group_hash}/>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default GroupFileAndFolder
"use client"

import React from 'react'
import FileSection from '@/components/File-system/fileSection/FileSection'
import FileSectionSkeleton from '@/components/File-system/fileSection/FileSectionSkeleton'
import getFiles from '@/utils/api/getFilesAPI'
import { decryptData } from '@/utils/helper/decryptFiles'
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore'
import fetchGroupDetails from '@/utils/api/getGroupDetailsAPI'
import { GroupStore } from '@/utils/store/groupDetailsStore'

type Props = {
  root: string;
}

const FileAndFolder = ({root}:Props) => {
  const { files, folders, setFiles, setFolders, forceRefresh } = useFileAndFolderStore();
  const { setGroups } = GroupStore();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fileData = await getFiles(root);
      const decryptedData = decryptData(fileData.ciphertext);

      setFolders(decryptedData.children);
      setFiles(decryptedData.files);

      const groupData = await fetchGroupDetails();
      setGroups(groupData);

      setLoading(false);
    };
  
    fetchData();
  }, [root, forceRefresh]);

  return (
    <div className='pr-1 p-3 bg-[#fcfcfc] rounded-2xl'>
      <div className="fileAndFolder flex flex-col gap-8 h-[64vh] overflow-auto pr-3">
        {loading ? (
          <FileSectionSkeleton />
        ) : (
          <>
            {folders && folders.length > 0 && (
              <FileSection subFiles={folders} type={'folder'}/>
            )}

            {files && files.length > 0 && (
              <FileSection subFiles={files} type={'file'}/>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default FileAndFolder
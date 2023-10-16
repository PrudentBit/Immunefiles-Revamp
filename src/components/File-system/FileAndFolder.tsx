"use client"

import React from 'react'
import FileSection from '@/components/File-system/fileSection/FileSection'
import FileSectionSkeleton from '@/components/File-system/fileSection/FileSectionSkeleton'
import getFiles from '@/utils/api/getFilesAPI'
import { decryptData } from '@/utils/helper/decryptFiles'
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore'

type Props = {
  root: string;
}

const FileAndFolder = ({root}:Props) => {
  const { files, folders, setFiles, setFolders, forceRefresh } = useFileAndFolderStore();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getFiles(root);
      const decryptedData = decryptData(data.ciphertext);

      setFolders(decryptedData.children);
      setFiles(decryptedData.files);
      setLoading(false);
    };
  
    fetchData();
  }, [root, forceRefresh]);

  return (
    <div className="flex flex-col gap-8">
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
  )
}

export default FileAndFolder
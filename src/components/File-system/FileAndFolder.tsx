"use client"

import React from 'react'
import FileSection from '@/components/File-system/fileSection/FileSection'
import FileSectionSkeleton from '@/components/File-system/fileSection/FileSectionSkeleton'
import getFiles from '@/utils/api/getFiles'
import { decryptData } from '@/utils/helper/decryptFiles'

type Props = {
  root: string;
}

const FileAndFolder = ({root}:Props) => {
  const [folderChildren, setFolderChildren] = React.useState([]);
  const [fileChildren, setFileChildren] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getFiles(root);
      const decryptedData = decryptData(data.ciphertext);

      setFolderChildren(decryptedData.children);
      setFileChildren(decryptedData.files);
      setLoading(false);
    };
  
    fetchData();
  }, [root]);

  return (
    <div className="flex flex-col gap-8">
      {loading ? (
        <FileSectionSkeleton />
      ) : (
        <>
          {folderChildren && folderChildren.length > 0 && (
            <FileSection subFiles={folderChildren} type={'folder'}/>
          )}

          {fileChildren && fileChildren.length > 0 && (
            <FileSection subFiles={fileChildren} type={'file'}/>
          )}
        </>
      )}
    </div>
  )
}

export default FileAndFolder
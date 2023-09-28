"use client"

import React from 'react'
import FileSection from '@/components/File-system/FileSection'
import getFiles from '@/utils/api/getFiles'
import { decryptData } from '@/utils/helper/decryptFiles'

const FileAndFolder = () => {
  const [folderChildren, setFolderChildren] = React.useState([]);
  const [fileChildren, setFileChildren] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const hash = 'root';
      const data = await getFiles(hash);
      const decryptedData = decryptData(data.ciphertext);

      setFolderChildren(decryptedData.children);
      setFileChildren(decryptedData.files);
      console.log(decryptedData);
      console.log(folderChildren);
      console.log(fileChildren);
    };
  
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-8">
        <FileSection subFiles={folderChildren} type={'folder'}/>

        <FileSection subFiles={fileChildren} type={'file'}/>
      </div>
  )
}

export default FileAndFolder
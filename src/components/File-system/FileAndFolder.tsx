"use client"

import React from 'react'
import FileSection from '@/components/File-system/FileSection'
import getFiles from '@/utils/api/getFiles'
import { decryptData } from '@/utils/helper/decryptFiles'

type Props = {
  root: string;
}

const FileAndFolder = (props:Props) => {
  const [folderChildren, setFolderChildren] = React.useState([]);
  const [fileChildren, setFileChildren] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getFiles(props.root);
      const decryptedData = decryptData(data.ciphertext);

      setFolderChildren(decryptedData.children);
      setFileChildren(decryptedData.files);
      console.log(decryptedData);
      console.log(folderChildren);
      console.log(fileChildren);
    };
  
    fetchData();
  }, [props.root]);

  return (
    <div className="flex flex-col gap-8">
      {folderChildren && folderChildren.length > 0 && (
        <FileSection subFiles={folderChildren} type={'folder'}/>
      )}

      {fileChildren && fileChildren.length > 0 && (
        <FileSection subFiles={fileChildren} type={'file'}/>
      )}

    </div>
  )
}

export default FileAndFolder

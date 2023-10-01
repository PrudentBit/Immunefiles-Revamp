"use client"

import React from 'react'
import getFiles from '@/utils/api/getFiles'
import { decryptData } from '@/utils/helper/decryptFiles'
import Link from 'next/link'

type Props = {
  root: string;
}

const FileNavigation = ({root}: Props) => {
  const [path, setPath] = React.useState([]);
  const [pathName, setPathName] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getFiles(root);
      const decryptedData = decryptData(data.ciphertext);

      setPath(decryptedData.hash_path);
      setPathName(decryptedData.path);
      console.log(decryptedData)
    };
  
    fetchData();
  }, [root]);

  return (
    <div className="w-full h-12 flex py-3 px-5 bg-[#F0F0F0] rounded-lg">
      {path?.map((item, index) => {
        return (
          <div key={index} className="flex gap-2 ml-2">
            <Link href={`/filesystem/${item}`}>
              <p className="text-gray-700 font-semibold hover:bg-gray-200 rounded-full px-2">{item==='root' ? 'My home' : `${pathName[index]}`}</p>
            </Link>
            <p className="text-gray-700 font-bold">{'>'}</p>
          </div>
        )}
      )}

      {!path && (<p className="text-gray-700 font-semibold">My home</p>)}
    </div>
  )
}

export default FileNavigation
"use client"

import React from 'react'
import getFiles from '@/utils/api/getFilesAPI'
import { decryptData } from '@/utils/helper/decryptFiles'
import Link from 'next/link'
import Image from 'next/image'
import { selectedFilesStore } from '@/utils/store/selectFilesStore'

type Props = {
  root: string;
}

const FileNavigation = ({root}: Props) => {
  const [path, setPath] = React.useState([]);
  const [pathName, setPathName] = React.useState([]);
  const [removeAllFiles] = selectedFilesStore((state) => [state.removeAllFiles]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getFiles(root, 'name', 'asc');
      if(data){
        const decryptedData = decryptData(data.ciphertext);

        setPath(decryptedData.hash_path);
        setPathName(decryptedData.path);
      }
    };
  
    fetchData();
  }, [root]);

  return (
    <div className=' h-12'>
      <div className="w-full h-12 flex items-center overflow-x-auto overflow-y-hidden p-2 pl-4 bg-[#F0F0F0] rounded-lg">
        {path?.map((item, index) => {
          return (
            <div key={index} className="flex gap-2 ml-2">
              <Link href={`/filesystem/${item}`}>
                <p onClick={removeAllFiles} className="text-gray-700 font-medium hover:bg-gray-200 rounded-lg max-w-[15rem] truncate whitespace-nowrap p-2">{item==='root' ? 'My home' : `${pathName[index]}`}</p>
              </Link>
              <Image src="/right-arrow.svg" className='pt-[0.2rem]' width={8} height={8} alt="arrow right"/>
            </div>
          )}
        )}

        {!path && (
          <div className='flex gap-2 h-8 items-center'>
            <p className="text-gray-700 font-medium">My Home </p>
            <Image src="/right-arrow.svg" className='pt-[0.2rem]' width={8} height={8} alt="arrow right"/>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileNavigation
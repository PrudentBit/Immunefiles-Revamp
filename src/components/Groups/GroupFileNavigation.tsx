"use client"

import {useState, useEffect} from 'react'
import getGroupFiles from '@/utils/api/getGroupFilesAPI'
import { decryptData } from '@/utils/helper/decryptFiles'
import Link from 'next/link'
import Image from 'next/image'
import { selectedFilesStore } from '@/utils/store/selectFilesStore'
import { GroupStore } from '@/utils/store/groupDetailsStore'

type Props = {
  folder_hash: string;
  group_hash: string;
}

const GroupFileNavigation = ({folder_hash, group_hash}: Props) => {
  const [path, setPath] = useState([]);
  const [pathName, setPathName] = useState([]);
  const [removeAllFiles] = selectedFilesStore((state) => [state.removeAllFiles]);
  const [groupName, setGroupName] = useState("root");
  const { groups } = GroupStore();

  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await getGroupFiles(group_hash, folder_hash);
        if (response.status === 200) {
          const decryptedData = decryptData(response.data.ciphertext);
  
          setPath(decryptedData.hash_path);
          setPathName(decryptedData.path);
  
          const matchingGroup = groups.find((group) => group.group_hash === group_hash);
          setGroupName(matchingGroup?.name || "root");
        }
      } catch (error) {
        console.error("Error fetching group files:", error);
      }
    };
    getFiles();
  }, [group_hash, folder_hash, groups]);

  return (
    <div className=' h-12'>
      <div className="w-full h-12 flex items-center p-2 pl-2 bg-[#F0F0F0] rounded-lg">
        {!(path.length === 0) && (
          <div className="flex gap-2">
            <Link href={`/groups`}>
              <p onClick={removeAllFiles} className="text-gray-700 font-medium hover:bg-gray-200 rounded-lg p-2">Groups</p>
            </Link>

            <Image src="/right-arrow.svg" className='pt-[0.2rem]' width={8} height={8} alt="arrow right"/>

            <Link href={`/groups/${group_hash}/root`}>
              <p onClick={removeAllFiles} className="text-gray-700 font-medium hover:bg-gray-200 rounded-lg p-2">{groupName}</p>
            </Link>

            </div>
        )}
        {!(path.length === 0) && path?.map((item, index) => {
          return (
            <div key={index} className="flex gap-2 ml-2">
              <Image src="/right-arrow.svg" className='pt-[0.2rem]' width={8} height={8} alt="arrow right"/>
              <Link href={`/groups/${group_hash}/${item}`}>
                <p onClick={removeAllFiles} className="text-gray-700 font-medium hover:bg-gray-200 rounded-lg p-2">{item==='root' ? `${groupName}` : `${pathName[index]}`}</p>
              </Link>
            </div>
          )}
        )}

        {path.length == 0  && (
          <div className="w-full h-12 flex items-center gap-2 p-2 pl-2 bg-[#F0F0F0] rounded-lg">
            <Link href={`/groups`}>
              <p onClick={removeAllFiles} className="text-gray-700 font-medium hover:bg-gray-200 rounded-lg p-2">Groups</p>
            </Link>

            <Image src="/right-arrow.svg" className='pt-[0.2rem]' width={8} height={8} alt="arrow right"/>

            <p className="text-gray-700 font-medium rounded-lg p-2">
              {groupName}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GroupFileNavigation
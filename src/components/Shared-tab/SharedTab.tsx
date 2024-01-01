'use client';

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import PendingRequests from '@/components/Shared-tab/PendingRequests'
import { AnimatePresence} from 'framer-motion';
import { selectedFilesStore } from '@/utils/store/selectFilesStore';
import FileSelectOptions from '@/components/File-system/menus/FileSelectOptions';
import IgnoreRequestedAlert from '@/components/Alerts/IgnoreRequestsAlert';
import getRequests from '@/utils/api/getRequestsAPI';
import PendingRequestsSkeleton from './PendingRequestsSkeleton';
import { decryptData } from '@/utils/helper/decryptFiles';
import getSharedFiles from '@/utils/api/getSharedFilesAPI';

type Props = {}

const sharedTab = (props: Props) => {
  const subFiles: FileOrFolderType[] = [
    {
      date_created: "2023-11-23T10:06:59.000Z",
      date_modified: "2023-11-23T10:06:59.000Z",
      is_file: true,
      name: "Placeholder File 1",
      owner: "testuser1@example.com",
      shared_with: [
        {
          can_add_delete_content: true,
          can_download_content: true,
          can_share_content: true,
          email: "testuser2@example.com",
          is_proctored: false,
          username: "Test User 2"
        }
      ],
      size: "1 MB",
      url: "https://example.com/placeholder-file-1",
      urlhash: "placeholderfile1"
    },
    {
      date_created: "2023-11-23T10:06:59.000Z",
      date_modified: "2023-11-23T10:06:59.000Z",
      is_file: true,
      name: "Placeholder File 2",
      owner: "testuser1@example.com",
      shared_with: [
        {
          can_add_delete_content: true,
          can_download_content: true,
          can_share_content: true,
          email: "testuser2@example.com",
          is_proctored: false,
          username: "Test User 2"
        }
      ],
      size: "2 MB",
      url: "https://example.com/placeholder-file-2",
      urlhash: "placeholderfile2"
    }
  ]  

  const [requests, setRequests] = useState<RequestsType>();
  const [reload, setReload] = useState(false);
  const [sharedFiles, setSharedFiles] = useState<SharedFilesType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRequests();
        const decryptedData = decryptData(data.ciphertext);
        setRequests(decryptedData.requests);
        console.log(decryptedData.requests);
      } catch (error) {
        console.error(error);
      }
    };

    const getFiles = async () => {
      try {
        const hash = 'root';
        const data = await getSharedFiles(hash);
        setSharedFiles(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    getFiles();
    fetchData();
  }, [reload]);

  const [files] = selectedFilesStore((state) => [state.files]);

  return (
    <div className='h-full w-full flex flex-col gap-6 pt-4'>
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          <Button className='rounded-full flex gap-2 h-9 bg-primary_font hover:bg-[#648FED]'>
            <Image src='/request-icon-white.svg' width={16} height={16} alt='request'/>
            <p>Request file</p>
          </Button>

          <IgnoreRequestedAlert setReload={setReload}/>
        </div>

        <AnimatePresence>
          {files.length > 0 && <FileSelectOptions />}
        </AnimatePresence>
      </div>

      <div className='bg-[#fcfcfc] px-4 py-2 relative h-full rounded-2xl flex flex-col gap-6 focus:outline-none'>
        {requests ?(
          <>
            <PendingRequests requests={requests} setReload={setReload}/>
          </>
        ):(
          <PendingRequestsSkeleton/>
        )}

        {sharedFiles &&
          <section className="flex flex-col">
            <div className="flex gap-2">
              <Image
                src={`/file-icon.svg`}
                width={20}
                height={20}
                alt="Files"
                className="ml-[2px]"
              />
              <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">Files shared with you</p>
            </div>
            <div className="container flex gap-3 flex-wrap pb-2 pl-2 pt-5">
              {sharedFiles.children.map((folder, index) => (
                <div
                  title={folder.name}
                  className={`w-[13.4rem] select-none h-12 border-primary_bg bg-primary_bg hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center border-solid border-[1px]`}
                >
                  <div className="flex gap-3">
                    <Image
                      src="/Folder-icon-filled.svg"
                      width={26}
                      height={26}
                      alt="File icon"
                      className="object-contain"
                    />
                    <p className="text-primary_font_2 pb-1 truncate w-[7.5rem] mt-1 font-[500]">
                      {folder.name}
                    </p>
                  </div>
          
                  <div title='Menu' className='text-secondary_font font-medium text-2xl leading-[0px] pb-[1.3rem] p-[0.3rem] px-1 text-center rounded-full hover:bg-button_hover cursor-pointer'>...</div>
                </div>
              ))}
              {sharedFiles.files.map((file, index) => (
                <div
                  title={file.name}
                  className={`w-[13.4rem] select-none h-12 border-primary_bg bg-primary_bg hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center border-solid border-[1px]`}
                >
                  <div className="flex gap-3">
                    <Image
                      src=""
                      width={26}
                      height={26}
                      alt="File icon"
                      className="object-contain"
                    />
                    <p className="text-primary_font_2 pb-1 truncate w-[7.5rem] mt-1 font-[500]">
                      {file.name}
                    </p>
                  </div>
          
                  <div title='Menu' className='text-secondary_font font-medium text-2xl leading-[0px] pb-[1.3rem] p-[0.3rem] px-1 text-center rounded-full hover:bg-button_hover cursor-pointer'>...</div>
                </div>
              ))}
            </div>
        </section>
        }
      </div>
    </div>
  );
}

export default sharedTab


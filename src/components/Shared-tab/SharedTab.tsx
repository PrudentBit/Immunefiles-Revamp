'use client';

import React from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import PendingRequests from '@/components/Shared-tab/PendingRequests'
import FileSection from '@/components/File-system/fileSection/FileSection';
import { AnimatePresence} from 'framer-motion';
import { selectedFilesStore } from '@/utils/store/selectFilesStore';
import FileSelectOptions from '@/components/File-system/menus/FileSelectOptions';
import IgnoreRequestedAlert from '@/components/Alerts/IgnoreRequestsAlert';

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

  const [files] = selectedFilesStore((state) => [state.files]);

  return (
    <div className='h-full w-full flex flex-col gap-6 pt-4'>
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          <Button className='rounded-full flex gap-2 h-9 bg-primary_font hover:bg-[#648FED]'>
            <Image src='/request-icon-white.svg' width={16} height={16} alt='request'/>
            <p>Request file</p>
          </Button>

          <IgnoreRequestedAlert/>
        </div>

        <AnimatePresence>
          {files.length > 0 && <FileSelectOptions />}
        </AnimatePresence>
      </div>

      <div className='bg-[#fcfcfc] px-4 py-2 relative h-full rounded-2xl flex flex-col gap-6 focus:outline-none'>
        <PendingRequests/>

        <FileSection subFiles={subFiles} type='Files shared with you'/>
      </div>
    </div>
  );
}

export default sharedTab


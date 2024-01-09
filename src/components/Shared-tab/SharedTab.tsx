'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import PendingRequests from '@/components/Shared-tab/PendingRequests'
import IgnoreRequestedAlert from '@/components/Alerts/IgnoreRequestsAlert';
import getRequests from '@/utils/api/getRequestsAPI';
import PendingRequestsSkeleton from './PendingRequestsSkeleton';
import { decryptData } from '@/utils/helper/decryptFiles';
import getSharedFiles from '@/utils/api/getSharedFilesAPI';
import SharedFile from './SharedFile';
import SortSharedBy from './SortSharedBy';
import RequestFilesModal from '@/components/Modals/RequestModalInShared/RequestFilesModal';

type sortBy = "name" | "size" | "shared";
type order = "asc" | "dsc";

const SharedTab = () => {
  const [requests, setRequests] = useState<RequestsType>();
  const [reload, setReload] = useState(false);
  const [sharedFiles, setSharedFiles] = useState<SharedFilesType>();
  const [sortBy, setSortBy] = useState<sortBy>('name');
  const [order, setOrder] = useState<order>('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRequests();
        const decryptedData = decryptData(data.ciphertext);
        setRequests(decryptedData.requests);
      } catch (error) {
        console.error(error);
      }
    };

    const getFiles = async () => {
      try {
        const hash = 'root';
        const data = await getSharedFiles(hash, sortBy, order);
        setSharedFiles(data);
      } catch (error) {
        console.error(error);
      }
    };

    getFiles();
    fetchData();
  }, [reload, sortBy, order]);

  return (
    <div className='h-full w-full flex flex-col gap-6 pt-4'>
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          <RequestFilesModal/>

          <IgnoreRequestedAlert setReload={setReload}/>
        </div>
        <SortSharedBy sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder}/>
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
                <SharedFile
                  file={folder}
                  type='folder'
                  className={`w-[13.4rem] select-none h-12 border-primary_bg bg-primary_bg hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center border-solid border-[1px]`}
                  key={index}
                />
              ))}
              {sharedFiles.files.map((file, index) => (
                <SharedFile
                  file={file}
                  type='file'
                  className={`w-[13.4rem] select-none h-12 border-primary_bg bg-primary_bg hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center border-solid border-[1px]`}
                  key={index}
                />
              ))}
            </div>
        </section>
        }
      </div>
    </div>
  );
}

export default SharedTab


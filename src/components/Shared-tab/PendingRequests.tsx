import React from 'react'
import RequestedFile from '@/components/Shared-tab/RequestedFile';
import Image from 'next/image';

type Props = {}

const PendingRequests = (props: Props) => {
  return (
    <div className='flex flex-col gap-5'>
        <div className='flex gap-2'>
          <Image src='/request-icon-blue.svg' width={20} height={20} alt='pending'/>
          <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">Pending requests</p>
        </div>

        <div className='flex gap-3 flex-wrap'>
          <RequestedFile/>
          <RequestedFile/>
          <RequestedFile/>
          <RequestedFile/>
          <RequestedFile/>
          <RequestedFile/>
          <RequestedFile/>
        </div>
      </div>
  )
}

export default PendingRequests
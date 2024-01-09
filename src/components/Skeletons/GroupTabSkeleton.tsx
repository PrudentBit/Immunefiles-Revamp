import React from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const GroupTabSkeleton = () => {
  return (
    <div className='flex flex-col gap-7'>
      <div className='flex flex-col gap-4'>
        <div className="flex gap-2">
          <Image
            src="/groups-icon-blue.svg"
            width={24}
            height={24}
            alt="groups"
            className="ml-[2px]"
          />
          <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">As admin</p>
        </div>

        <div className='flex flex-wrap gap-4 p-1'>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div className="flex gap-2">
          <Image
            src="/admin-icon-2.svg"
            width={24}
            height={24}
            alt="groups"
            className="ml-[2px]"
          />
          <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">As member</p>
        </div>

        
        <div className='flex flex-wrap gap-4 p-1'>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
          <Skeleton className='h-[3.8rem] w-[16rem]'/>
        </div>
      </div>
    </div>
  );
};

export default GroupTabSkeleton;

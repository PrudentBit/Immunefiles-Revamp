import React from 'react'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {

}

const FileSectionSkeleton = (props: Props) => {
  return (
    <>
      <section className="flex flex-col gap-6">
        <div className="flex gap-2">
          <Image
            src={`/folder-icon.svg`}
            width={20}
            height={20}
            alt={`folder icon`}
            className="ml-[-2px]"
          />
          <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">Folders</p>
        </div>

        <div className="flex gap-[0.7rem] flex-wrap">
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex gap-2">
          <Image
            src={`/file-icon.svg`}
            width={20}
            height={20}
            alt={`file icon`}
            className="ml-[-2px]"
          />
          <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">Files</p>
        </div>

        <div className="flex gap-[0.7rem] flex-wrap">
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
          <Skeleton className='w-[13.4rem] h-12'/>
        </div>
      </section>
    </>
  )
}

export default FileSectionSkeleton
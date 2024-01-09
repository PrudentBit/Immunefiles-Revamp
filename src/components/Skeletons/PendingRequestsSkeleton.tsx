import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const PendingRequestsSkeleton = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-5'>
        <div className='flex gap-2'>
          <Image src='/request-icon-blue.svg' width={20} height={20} alt='pending'/>
          <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">Pending requests</p>
        </div>

        <div className='flex gap-3 flex-wrap'>
          <Skeleton className='h-14 w-[13.6rem]'/>
          <Skeleton className='h-14 w-[13.6rem]'/>
          <Skeleton className='h-14 w-[13.6rem]'/>
          <Skeleton className='h-14 w-[13.6rem]'/>
          <Skeleton className='h-14 w-[13.6rem]'/>
          <Skeleton className='h-14 w-[13.6rem]'/>
          <Skeleton className='h-14 w-[13.6rem]'/>
        </div>
      </div>

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
          <Skeleton className='h-12 w-[13.4rem]'/>
          <Skeleton className='h-12 w-[13.4rem]'/>
          <Skeleton className='h-12 w-[13.4rem]'/>
          <Skeleton className='h-12 w-[13.4rem]'/>
          <Skeleton className='h-12 w-[13.4rem]'/>
          <Skeleton className='h-12 w-[13.4rem]'/>
          <Skeleton className='h-12 w-[13.4rem]'/>
          <Skeleton className='h-12 w-[13.4rem]'/>
          <Skeleton className='h-12 w-[13.4rem]'/>
        </div>
      </section>
    </div>
  )
}

export default PendingRequestsSkeleton
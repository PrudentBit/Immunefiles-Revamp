import {useState} from 'react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogAction,
    AlertDialogTrigger,
		AlertDialogOverlay,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress' 

type Props = {
  storage?: AnalyticsData['storage'];
}

const RequestStorageModal = ({storage}: Props) => {
  const [emailSent, setEmailSent] = useState(false);
  const [storageRequested, setStorageRequested] = useState(0);

  const handleStorageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStorageRequested(parseInt(e.target.value));
  }

  const getBarColor = (percentage: number): string => {
    if (percentage >= 0 && percentage <= 50){
      return 'bg-[#3ABA6E]';
    } 
    else if (percentage > 50 && percentage <= 85){
      return 'bg-[#FFBA00]';
    } 
    else{
      return 'bg-[#FF6161]';
    }
  };

  const barColor = getBarColor(storage?.percentage || 0);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild className='bg-transparent p-0'>
          <Button className='flex gap-3 h-5 items-center'>
            <p className='text-black text-[0.85rem] font-medium leading-3 h-3'>Request more</p>
            <Image src='/right-arrow.svg' width={7} height={7} alt="storage"/>
          </Button>
        </AlertDialogTrigger>
				<AlertDialogOverlay className='backdrop-blur-[0px]'/>
        <AlertDialogContent className='w-[30rem] pb-4'>
          <AlertDialogHeader className='flex flex-row justify-between gap-[6.5rem]'>
            <div className='flex gap-3 items-center'>
              <div className='rounded-full w-10 h-10 flex items-center justify-center bg-[#E5EDFF]'>
                <Image src="cloud-storage.svg" width={18} height={18}  alt='manage'/>
              </div>  
              <p className='text-black font-semibold text-base'>Request more storage</p>
            </div>

            <AlertDialogCancel className='w-9 h-9 p-[0.6rem] rounded-full bg-[#E5EDFF] mt-0' onClick={(e) => e.stopPropagation()}>
              <Image src="/cross-icon-blue.svg" width={20} height={20} className='rounded-full' alt='close icon'/>
            </AlertDialogCancel>
          </AlertDialogHeader>

          <AlertDialogDescription className='flex flex-col pl-2 '>
            <div className='mb-3 flex pr-4 items-center justify-between'>
              <p className='text-primary_font font-medium text-sm leading-6'>Current Consumption</p>

              <p className='text-primary_font font-light text-xs'><span className='text-[0.9rem] text-green-500 font-normal leading-4'>{Math.round(storage?.used || 0)}</span> / {storage?.total || 0} GB</p>
            </div>

            <div className='h-8 relative w-[97%] mb-2'>
              <Progress value={storage?.percentage || 0} className='absolute bg-[#E5EDFF] h-2' barColor={barColor}/>
            </div>

            <div className='flex gap-2 items-center pb-3'>
              <p className='text-[#7A7AFF] font-medium text-sm leading-6'>Enter required storage : </p>
              <input type='number-to-text' onChange={handleStorageInput} className='py-2 ml-1 w-[7rem] rounded-sm text-center bg-bg_hover text-[#7A7AFF] text-base font-semibold'/>
              <div className='flex flex-col items-center gap-0 pl-4'>
                <p className='text-[#7A7AFF] font-medium text-sm leading-4'> + {Math.ceil((storage?.total || 0) - (storage?.used || 0) + (storageRequested || 0))} GB</p>
                <p className='text-[#7A7AFF] font-light text-sm leading-3'>current storage</p>
              </div>
            </div>
          </AlertDialogDescription>

          <AlertDialogFooter className='flex justify-end'>
            <AlertDialogAction className='rounded-full px-10 text-white font-medium bg-primary_font hover:text-primary_font border-2 border-solid border-primary_font'>Send Request</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default RequestStorageModal
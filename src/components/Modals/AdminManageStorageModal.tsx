import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import RequestStorageModal from './RequestStorageModal'

type Props = {
  storage?: AnalyticsData['storage'];
};

const AdminManageStorage = ({ storage }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-[0.8rem] font-normal p-2 h-5 rounded-lg hover:bg-[#628CE9]">
          Manage
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[40rem] pb-4">
        <AlertDialogHeader className="flex flex-row justify-between gap-[6.5rem]">
          <div className="flex gap-3 items-center">
            <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#E5EDFF]">
              <Image src="lock-icon.svg" width={18} height={18} alt="manage" />
            </div>
            <p className="text-black font-semibold text-base">Manage Storage</p>
          </div>

          <AlertDialogCancel
            className="w-9 h-9 p-[0.6rem] rounded-full bg-[#E5EDFF] mt-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/cross-icon-blue.svg"
              width={20}
              height={20}
              className="rounded-full"
              alt="close icon"
            />
          </AlertDialogCancel>
        </AlertDialogHeader>

        <AlertDialogDescription className="h-[13vh] flex flex-col gap-4 pl-2 justify-between">
          <div className="h-8 flex gap-8 pl-1 items-center">
            <div className="flex gap-3 items-center">
              <div className="h-2 w-2 rounded-full bg-primary_font mt-[0.1rem]"></div>
              <p className="text-[#afafaf] text-[0.83rem] font-medium">
                <span className="text-gray-400 text-[0.88rem] font-semibold">
                  {Math.ceil((storage?.used || 0) * 100) / 100}GB{' '}
                </span>
                used
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <div className="h-2 w-2 rounded-full bg-[#D1DFFF] mt-[0.1rem]"></div>
              <p className="text-[#afafaf] text-[0.83rem] font-medium">
                <span className="text-gray-400 text-[0.88rem] font-semibold">
                  {storage?.alloted}GB{' '}
                </span>
                useable
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <div className="h-2 w-2 rounded-full bg-gray-200 mt-[0.1rem]"></div>
              <p className="text-[#afafaf] text-[0.83rem] font-medium">
                <span className="text-gray-400 text-[0.88rem] font-semibold">
                  {storage?.total || 0}GB{' '}
                </span>
                available
              </p>
            </div>

            <p className="text-[0.8rem] text-green-500 font-normal h-4 leading-4 pl-12">
              {(storage?.total || 0) -
                Math.ceil((storage?.used || 0) * 10) / 10}
              GB left
            </p>
          </div>

          <div className="h-8 relative w-[95%]">
            <Progress
              value={((storage?.alloted || 0) / (storage?.total || 100)) * 100}
              className="absolute bg-gray-100 h-3"
              barColor="bg-[#D1DFFF]"
            />
            <Progress
              value={storage?.percentage || 0}
              className="absolute bg-transparent h-3"
              barColor="bg-primary_font"
            />
          </div>

          <div className="h-8 flex gap-2">
            <p className="text-black font-medium text-xs leading-6">
              Current allotted storage :{' '}
            </p>
            <p className="h-7 w-16 rounded-md text-center leading-6 bg-[#D1DFFF] text-primary_font text-base font-semibold">
              {' '}
              {storage?.alloted}{' '}
            </p>
            <p className="text-black font-medium text-sm leading-6">
              / {storage?.total} GB
            </p>
          </div>
        </AlertDialogDescription>

        <AlertDialogFooter className='flex h-8 justify-between gap-4 items-end pl-2'>
          <p className='text-[#8f8f8f] text-[0.83rem] font-light'>*you can not reduce the allotted storage if it has been consumed totally.</p>
          <RequestStorageModal storage={storage}/>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminManageStorage;

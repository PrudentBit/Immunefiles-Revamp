'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import deleteRequestedFiles from '@/utils/api/deleteRequestedFilesAPI';

type Props = {
  setReload: (reload: boolean) => void;
};

const IgnoreRequestedAlert = ({setReload}: Props) => {

  const handleIgnore = async () => {
    try {
      const response = await deleteRequestedFiles();
      if (response?.status === 200) {
        console.log('File ignored successfully');
        setReload(true);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className='rounded-full flex justify-between items-center px-3 gap-2 text-white h-9 bg-[#FF6161] hover:bg-[#FF7474]'>
            <Image src='/close-icon-2.svg' width={16} height={16} alt='ignore'/>
            <p className='text-white'>Ignore all</p>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="translate-y-[-210%]">
          <AlertDialogHeader className="flex flex-row items-center gap-3">
            <div className="rounded-full w-10 h-10 flex justify-center items-center bg-[#FFEBEB]">
              <Image
                src="/warning-icon.svg"
                width={20}
                height={20}
                alt="delete icon"
              />
            </div>
            <div className="flex flex-col h-full">
              <AlertDialogTitle className="font-medium text-md">
                Ignore all requests
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs">
                *This will remove all the pending file requests.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-4">
            <AlertDialogAction
              className="w-[50%] rounded-full bg-[#FF6161] text-white hover:bg-[#FF7F7F]"
              onClick={(e) => {
                e.stopPropagation();
                handleIgnore();
              }}
            >
              Yes! Ignore
            </AlertDialogAction>
            <AlertDialogCancel
              className="w-[50%] rounded-full hover:bg-[#D2D4DA] hover:text-black"
              onClick={(e) => e.stopPropagation()}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default IgnoreRequestedAlert;

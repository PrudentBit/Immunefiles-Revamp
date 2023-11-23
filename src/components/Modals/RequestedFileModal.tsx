import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import BotLeftAlert from '@/components/BotLeftAlert';


type Props = {

}

const RequestedFileModal = (props: Props) => {
  const [failed, setFailed] = useState(false);
  const [requestedFile, setRequestedFile] = useState<File | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setRequestedFile(acceptedFiles[0]);
        setFailed(false);
      } else {
        setFailed(true);
      }
    },
  });

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className='h-14 w-[13.6rem] flex justify-center px-3 items-center rounded-lg gap-2 cursor-pointer border-2 border-dashed border-primary_border bg-bg_hover'>
            <Image src='/file-icon-2.svg' width={24} height={24} alt='file'/>
            <p className="text-primary_font_2 pb-1 text-left truncate w-full mt-1 font-normal">File name</p>
            <button className='flex items-center justify-center rounded-full h-6 min-w-[1.5rem] hover:bg-primary_bg'>
              <Image src='/close-icon.svg' width={12} height={12} alt='remove'/>
            </button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[40rem] pb-4">
          <AlertDialogHeader className="flex flex-row justify-between gap-[6.5rem]">
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#E5EDFF]">
                <Image
                  src="/file-icon-2.svg"
                  width={18}
                  height={18}
                  alt="manage"
                />
              </div>
              <p className="text-[#23262F] font-semibold text-base">Upload File Name</p>
            </div>

            <AlertDialogCancel
              className="w-9 h-9 p-[0.6rem] rounded-full bg-[#E5EDFF] mt-0"
              onClick={(e) => {
                e.stopPropagation();
                setRequestedFile(null);
              }}
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
          <AlertDialogDescription>
            <div
              {...getRootProps()}
              className={`w-[100%] cursor-pointer h-[12rem] mr-2 bg-primary_bg rounded-md flex justify-center items-center border-dashed border-[2px] border-[#c7c7c7]`}
            >
              <input
                {...getInputProps()}
                type="file"
                name="UploadFiles"
                id="UploadFiles"
                className="hidden"
              />
              <div className="flex flex-col justify-center items-center gap-3">
                <Image
                  src="/upload-icon-2.svg"
                  width={48}
                  height={48}
                  alt="upload icon"
                />
                <p className="text-black text-sm font-semibold">
                  Drag & drop files or{' '}
                  <span className="text-primary_font underline">Browse</span>
                </p>
                <p className="text-[#676767] text-xs font-normal">
                  Upload your files/folders from you local machine
                </p>
              </div>
            </div>
          </AlertDialogDescription>
          <AlertDialogFooter className="flex justify-between mt-4">
            <div className="bg-[#E5EDFF] rounded-full flex items-center justify-center gap-2 px-4">
              <Image src="/user-icon-2-blue.svg" width={20} height={20} alt="request"/>
              <p className="text-primary_font font-semibold text-sm">
                requestinguser@gmail.com
              </p>
            </div>

            <div className='flex gap-4'>
              <AlertDialogAction
                className="rounded-full px-4 text-white font-normal text-[1rem] bg-primary_font hover:text-primary_font border-2 border-solid border-primary_font"
              >
                Upload & Send
              </AlertDialogAction>
              <AlertDialogAction
                className="rounded-full px-4 text-white font-normal text-[1rem] bg-[#FF6161] hover:bg-[#FF7474] hover:text-white"
              >
                Ignore
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {false && (
        <BotLeftAlert
          className="w-[26rem]"
          image="/mail-sent-icon.svg"
          imagebg="bg-[#D0FFE3]"
        >
          <div className="flex flex-col items-start text-left leading-[0.2rem] gap-[0.35rem]">
            <p className="text-[#3ABA6E] font-semibold text-base leading-4  ">
              Request mail sent!
            </p>
            <p className="text-[#979797] font-[400] text-sm leading-[1.1rem]">
              Mail has been sent concerning your request. you&apos;ll get an
              update on your mail box.
            </p>
          </div>
          <button className="text-primary_font h-full flex items-start text-lg">
            <Image src="/close-icon.svg" height={35} width={35} alt="close" />
          </button>
        </BotLeftAlert>
      )}
    </>
  );
};
export default RequestedFileModal;

import React from 'react'
import Image from 'next/image';

type Props = {
  uploadedfile: File | undefined
  setUploadedfile: React.Dispatch<React.SetStateAction<File | undefined>>
}

const UploadedFileDisplay = ({uploadedfile, setUploadedfile}: Props) => {
  return (
    <div className="h-[12rem] w-full flex justify-center items-center">
      <div className="relative h-[8rem] w-[8rem]">
        <div className="absolute h-[8rem] w-[8rem] p-3 flex flex-col justify-center items-center gap-1 border-[1px] border-solid border-primary_font rounded-xl">
          <div className="h-[4.6rem] w-[4.6rem] bg-[#E5EDFF] flex items-center justify-center rounded-xl">
            <Image
              src="/user-File-icon.svg"
              width={35}
              height={35}
              alt="file icon"
            />
          </div>
          <p className="text-primary_font font-medium text-sm truncate w-full">
            {uploadedfile?.name}
          </p>
        </div>

        <button
          title="Remove"
          className="absolute rounded-full p-2 bg-[#FFE3E5]  hover:bg-[#FFCDD0] top-0 right-0 transform translate-x-[40%] -translate-y-[40%]"
        >
          <Image
            src="/delete-icon.svg"
            onClick={(e) => {
              e.stopPropagation();
              setUploadedfile(undefined);
            }}
            width={16}
            height={16}
            alt="Delete icon"
          />
        </button>
      </div>
    </div>
  )
}

export default UploadedFileDisplay
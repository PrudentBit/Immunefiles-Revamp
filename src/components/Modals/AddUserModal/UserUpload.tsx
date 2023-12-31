import { useState } from 'react';

import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

type Props = {
  setUploadedFile: (_file: File) => void;
};

const UserUpload = ({ setUploadedFile }: Props) => {
  const [failed, setFailed] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'text/csv': ['.csv'] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setUploadedFile(acceptedFiles[0]);
        setFailed(false);
      } else {
        setFailed(true);
      }
    },
  });

  return (
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
        {failed && (
          <p className="text-[#FF0000] text-xs font-normal">
            Please upload a .csv file
          </p>
        )}
      </div>
    </div>
  );
};

export default UserUpload;

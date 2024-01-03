import Image from "next/image";
import { useState } from "react";

type request = {
  id: string;
  fileName: string[];
  email: string;
  requestType: string;
};

type Props = {
  request: request;
  setRequest: React.Dispatch<React.SetStateAction<request>>;
  setRequestType: (value: 'internal' | 'external' | 'none') => void;
};

const ExternalRequest = ({
  request,
  setRequest,
  setRequestType,
}: Props) => {
  const [value, setValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(e.target.value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
    setValue(e.target.value);
    setRequest({ ...request, email: e.target.value });
  };

  const handleFileNameChange = (index: number, fileName: string) => {
    setRequest((prevRequest: request) => {
      const updatedFileNames = [...prevRequest.fileName];
      updatedFileNames[index] = fileName;
  
      if (fileName.trim() !== '' && index === updatedFileNames.length - 1) {
        updatedFileNames.push('');
      }
      console.log(request.fileName);
  
      return { ...prevRequest, fileName: updatedFileNames };
    });
  };
  

  const handleRemoveFileName = (index: number) => {
    const updatedFileNames = [...request.fileName];
    updatedFileNames.splice(index, 1);
    setRequest({ ...request, fileName: updatedFileNames });
    if (updatedFileNames.length === 0) {
      updatedFileNames.push('');
    }
  };

  return (
    <div className='h-[15rem] w-full flex flex-col gap-3'>
      <div className="flex gap-4 items-center h-[2rem]">
        <div 
          className="h-7 w-7 flex items-center justify-center cursor-pointer rounded-md border border-solid border-[#D5D5FB]"
          onClick={() => setRequestType('none')}
        >
          <Image src='/left-arrow-2.svg' width={18} height={18} alt='back' />
        </div>
        <div className="flex gap-2 items-center">
          <Image src='/exit-icon.svg' width={20} height={20} alt='External' />
          <p>External Request</p>
        </div>
      </div>

      <input
        type="text"
        className={`h-[2.5rem] p-2 px-5 w-full text-secondary_font bg-[#E5EDFF] placeholder:text-gray-400 rounded-sm border border-solid ${isEmailValid ? 'border-[#E5EDFF]' : 'border-red-500'}`}
        autoComplete="off"
        placeholder="Email ID"
        id='email'
        title='Enter email'
        onChange={(e) => handleChange(e)}
        value={value}
      />

      <div className="h-[10rem] w-full p-3 flex flex-col gap-4 overflow-auto border border-solid border-primary_border rounded-lg">
        {request.fileName.map((fileName, index) => (
          <div key={index} className="w-full min-h-[2.5rem] flex gap-4 items-center px-2 bg-[#E5EDFF] rounded-md">
            <Image src='/file-icon-3.svg' width={20} height={20} alt='file' />
            <input 
              type="text"
              className="px-1 w-full text-secondary_font bg-[#E5EDFF] placeholder:text-gray-400 rounded-sm border border-solid border-[#E5EDFF]"
              autoComplete="off"
              placeholder="File Name"
              id={`fileName_${index}`}
              title='Enter file name'
              onChange={(e) => handleFileNameChange(index, e.target.value)}
              value={fileName}
            />
            <button
              className="w-5 h-5 p-[0.3rem] rounded-full bg-red-100 mt-0"
              onClick={() => handleRemoveFileName(index)}
            >
              <Image src='/close-icon.svg' width={20} height={20} className="rounded-full" alt='close icon' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExternalRequest;

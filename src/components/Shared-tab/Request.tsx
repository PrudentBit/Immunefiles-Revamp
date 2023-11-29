import {useState} from 'react'
import Image from 'next/image';
import deleteRequestedFiles from '@/utils/api/deleteRequestedFilesAPI';
import RequestedFileModal from '@/components/Modals/RequestedFileModal';

type Props = {
  request: RequestType
  setReload: (reload: boolean) => void
}

const Request = ({request, setReload}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleIgnore = async() => {
    try {
      const response = await deleteRequestedFiles(request.request_hash);
      if(response?.status === 200) {
        console.log('File ignored successfully');
        setReload(true);
      }
    }
    catch(error) {
      console.error(error);
    }
  }
  
  return (
    <button 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} 
      className={`h-14 w-[13.6rem] relative flex flex-col px-3 justify-center rounded-lg gap-2 cursor-pointer  bg-bg_hover hover:bg-gray-100 border-2 border-dashed ${isHovered ? "border-gray-400" : "border-primary_font_2"}`}
    >
      <RequestedFileModal key={request.request_hash} request={request}/>
      <div className='flex gap-2 items-center absolute'>
        {isHovered ? (
          <Image src='/upload-icon-gray.svg' width={28} height={28} alt='upload'/>
        ):(
          <Image src='/file-icon-2.svg' width={24} height={24} alt='file'/>
        )}
        <p className={`${isHovered ? "text-gray-400" : "text-primary_font_2"} pb-1 text-left truncate w-full mt-1 font-normal`}>{isHovered ? 'Upload file' : request.file_name}</p>
      </div>
      <div 
        className='self-end flex items-center justify-center rounded-full h-6 min-w-[1.5rem] cursor-pointer hover:bg-primary_bg'
        onClick={handleIgnore}
      >
        <Image src='/close-icon.svg' width={12} height={12} alt='remove'/>
      </div>
    </button>
  )
}

export default Request
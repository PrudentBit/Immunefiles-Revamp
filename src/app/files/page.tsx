import React, {useState} from 'react'
// import SearchBar from '../components/SearchBar'
import SearchBar from '@/app/components/SearchBar'
import  File  from '@/app/components/File'
import Image from 'next/image'

const page = () => {
  
  const [folderChildren, setFolderChildren] = useState([]);
  const [fileChildren, setFileChilren] = useState([]);

  const fetchFolderDetails = () => {
    fetch(
      `https://api.immunefiles.com/api/api/content/folder_detail/root?tenant=${
        window.location.hostname.split(".")[0]
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpbGxvd2F0dHMiLCJlbWFpbCI6Imtlc2hhdi5tYWRoYXZAcHJ1ZGVudGJpdC5jb20iLCJleHAiOjE2OTU4OTI5NDB9.vLkDP5rXs73-oey7qAhTMSuLlcnHnfC6uZNsB7JTMPM`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFolderChildren(data.children);
        setFileChilren(data.files);
      });
  };

  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <SearchBar/>

      {/* folder navigation */}
      <div className="w-full flex py-3 px-5 bg-[#F0F0F0] rounded-lg">
        Navigation
      </div>

      {/* file/folder operations */}
      <div className='Operations flex justify-between'>
        <div>

        </div>
        <div className='flex gap-6'>
          <div className="bg-primary_bg px-[0.65rem] rounded-full hover:bg-[#DADAFF] cursor-pointer">
            <p className='leading-[0px] text-3xl pt-[1.1rem] text-secondary_font font'>+</p>
          </div>

          <div className="rounded-full bg-primary_bg p-2 hover:bg-[#DADAFF] cursor-pointer">
            <Image src='/upload-icon.svg' width={26} height={26} alt='File icon'/>
          </div>
        </div>
      </div>

      {/* file/folder grid */}
      <div className='flex flex-col gap-8'>
        {/* Folders */}
        <div className="Folders flex flex-col gap-6">
          <div className="flex gap-2">
            <Image src='/folder-icon.svg' width={20} height={20} alt='Folder icon'/>
            <p className='text-primary_font font-medium text-lg'>Folders</p>
          </div>

          <div className='flex gap-4 flex-wrap'>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
          </div>
        </div> 

        {/* Files */}
        <div className="Files flex flex-col gap-6">
          <div className="flex gap-2">
            <Image src='/file-icon.svg' width={20} height={20} alt='File icon'/>
            <p className='text-primary_font font-medium text-lg'>Files</p>
          </div>

          <div className='flex gap-4 flex-wrap'>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
          </div>

        </div>
      </div>
    </div>
  )
}

export default page
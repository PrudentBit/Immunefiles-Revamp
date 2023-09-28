import React from 'react'
import SearchBar from '@/app/components/SearchBar'
import File from '@/app/components/File'
import FileOperations from '@/app/components/File-system/FileOperations'
import Image from 'next/image'

const page = () => {

  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <SearchBar/>

      {/* folder navigation */}
      <div className="w-full flex py-3 px-5 bg-[#F0F0F0] rounded-lg">
        Navigation
      </div>

      <FileOperations/>

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
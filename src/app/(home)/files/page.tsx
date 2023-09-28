import React from 'react'
import SearchBar from '@/components/SearchBar'
import FileOperations from '@/components/File-system/FileOperations'
import FileAndFolder from '@/components/File-system/FileAndFolder';

const FileSystem = () => {
  return (
    <div className="w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto">
      <SearchBar />

      <div className="w-full flex py-3 px-5 bg-[#F0F0F0] rounded-lg">
        Navigation
      </div>

      <FileOperations/>

      <FileAndFolder/>
    </div>
  );
};

export default FileSystem;

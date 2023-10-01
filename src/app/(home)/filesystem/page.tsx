import React from 'react'
import SearchBar from '@/components/SearchBar'
import FileOperations from '@/components/File-system/FileOperations'
import FileAndFolder from '@/components/File-system/FileAndFolder';
import FileNavigation from '@/components/File-system/FileNavigation';

const FileSystem = () => {
  return (
    <div className="w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto">
      <SearchBar />

      <FileNavigation root={'My home'}/>

      <FileOperations/>

      <FileAndFolder root='root'/>
    </div>
  );
};

export default FileSystem;

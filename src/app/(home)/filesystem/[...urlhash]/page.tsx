import React from 'react'
import TopNav from '@/components/TopNav'
import FileOperations from '@/components/File-system/menus/FileOperations'
import FileAndFolder from '@/components/File-system/FileAndFolder';
import FileNavigation from '@/components/File-system/FileNavigation';

interface FileSystemProps {
  params: {urlhash: string}
}

const FileSystem: React.FC<FileSystemProps> = ({ params: { urlhash } }) => {
  return (
    <div className="w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto">
      <TopNav />

      <FileNavigation root={urlhash}/>

      <FileOperations/>

      <FileAndFolder root={urlhash}/>
    </div>
  );
};

export default FileSystem;

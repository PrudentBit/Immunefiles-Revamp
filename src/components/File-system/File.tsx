'use client';

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import ThreeDotsMenu from './menus/ThreeDotsMenu';
import { selectedFilesStore } from '@/utils/store/selectFilesStore';
import { useRouter } from 'next/navigation';
import { lowerCaseExtensions } from '../../../public/FileIcons/fileExtensions';

type Props = {
  file: FileOrFolderType;
  type: string;
  className?: string;
  dataKey: number;
};
const File = ({ file, className, dataKey }: Props) => {
  const router = useRouter();
  const [files, removeAllFiles] = selectedFilesStore(
    (state) => [
      state.files,
      state.removeAllFiles,
    ]
  );
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (files.includes(file)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [files]);

  const handleDoubleClick = () => {
    if (!file.is_file) {
      removeAllFiles();
      router.push(`/filesystem/${file.urlhash}`);
    }
  };

  const extension = file.is_file ? file.name.split('.').pop() || '' : '';
  const iconSrc = file.is_file
    ? lowerCaseExtensions.includes(extension)
      ? `/FileIcons/${extension}.svg`
      : '/FileIcons/unknown.png'
    : '/folder-icon-filled.svg';

  return (
    <>
      <div
        title={file.name}
        onDoubleClick={handleDoubleClick}
        data-key={dataKey}
        className={`${className} w-[13.4rem] select-none h-12 hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center border-solid border-[1px] ${
          (isSelected)
            ? 'border-primary bg-[#EFEFFD]'
            : 'border-primary_bg bg-primary_bg'
        }`}
      >
        <div className="flex gap-3">
          <Image
            src={iconSrc}
            width={26}
            height={26}
            alt="File icon"
            className="object-contain"
          />
          <p className="text-primary_font_2 pb-1 truncate w-[7.5rem] mt-1 font-[500]">
            {file.name}
          </p>
        </div>

        <ThreeDotsMenu file={file} />
      </div>
    </>
  );
};

export default File;

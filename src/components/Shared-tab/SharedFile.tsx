'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { lowerCaseExtensions } from '../../../public/FileIcons/fileExtensions';
import SharedThreeDotsMenu from './menus/SharedThreeDotsMenu';

type Props = {
  file: SharedFilesType["files"][0] | SharedFilesType["children"][0];
  type: string;
  className?: string;
};

const SharedFile = ({ file, className, type}: Props) => {
  const router = useRouter();

  const handleDoubleClick = () => {
    if (type==='folder') {
      router.push(`/groups/${file.urlhash}`);
    }
    else {
      window.open(`https://${window.location.hostname.split(".")[0]}.immunefiles.com/file/view/${file.urlhash}`, '_blank');
    }
  };

  const extension = type==='file' ? file.name.split('.').pop() || '' : '';
  const iconSrc = type==='file'
    ? lowerCaseExtensions.includes(extension)
      ? `/FileIcons/${extension}.svg`
      : '/FileIcons/unknown.png'
    : '/folder-icon-filled.svg';

  return (
    <div
      title={file.name}
      onDoubleClick={handleDoubleClick}
      className={`${className} w-[13.4rem] select-none h-12 hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center bg-primary_bg`}
    >
      <div className="flex gap-3">
        <Image
          src={iconSrc}
          width={26}
          height={26}
          alt="File icon"
          className="object-contain pointer-events-none"
        />
        <p className="text-primary_font_2 pb-1 truncate w-[7.5rem] mt-1 font-[500]">
          {file.name}
        </p>
      </div>
      <SharedThreeDotsMenu file={file} type={type}/>
    </div>
  );
};

export default SharedFile;

'use client';

import React, { useState, useEffect} from 'react';
import Image from 'next/image';
import { selectedFilesStore } from '@/utils/store/selectFilesStore';
import { useRouter } from 'next/navigation';
import { lowerCaseExtensions } from '../../../public/FileIcons/fileExtensions';
import ThreeDotsMenu from '@/components/File-system/menus/ThreeDotsMenu';
import GroupThreeDotsMenu from './menus/GroupThreeDotsMenu';
import GroupRightClickMenu from './menus/GroupRightClickMenu';

type Props = {
  file: groupFileandFolderType;
  type: string;
  className?: string;
  dataKey: number;
  group_hash: string;
};

const GroupFile = ({ file, className, dataKey, type, group_hash }: Props) => {
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
    if (type==='folder') {
      removeAllFiles();
      router.push(`/groups/${group_hash}/${file.urlhash}`);
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
    <GroupRightClickMenu file={file} type={type} group_hash={group_hash}>
      <div
        title={file.name}
        onDoubleClick={handleDoubleClick}
        data-key={dataKey}
        className={`${className} w-[13.4rem] select-none h-12 hover:bg-bg_hover cursor-pointer rounded-md flex justify-between p-3 items-center border-solid border-[1px] ${
          (isSelected)
            ? 'border-primary_font bg-[#EFEFFD]'
            : 'border-primary_bg bg-primary_bg'
        }`}
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
        <GroupThreeDotsMenu file={file} type={type} group_hash={group_hash}/>
      </div>
    </GroupRightClickMenu>
  );
};

export default GroupFile;

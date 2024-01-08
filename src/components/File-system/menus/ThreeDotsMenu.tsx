"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import DeleteFileAlert from '@/components/Alerts/DeleteFileAlert';
import FileDetailsModal from '@/components/Modals/FileDetailsModal';
import MoveOrCopyFilesModal from '@/components/Modals/Move&CopyFilesModal';
import ShareContentModal from '@/components/Modals/ShareContent/ShareContentModal';
import UnzipFilesAlert from '@/components/Modals/Zip-UnizipModals/UnzipFilesAlert';
import UnziptoFilesAlert from '@/components/Modals/Zip-UnizipModals/UnzipToFilesModal';
import DownloadFile from '../../DownloadFile';
import { useRouter } from 'next/navigation';

type Props = {
  file: FileOrFolderType;
}

const ThreeDotsMenu = ({file}: Props) => {
  const isZip = file.name.endsWith('.zip');
  const type = file.is_file ? 'file' : 'folder';
  const router = useRouter();

  const handleOpen = () => {
    if (type==='folder') {
      router.push(`/filesystem/${file.urlhash}`);
    }
    else {
      window.open(`https://${window.location.hostname.split(".")[0]}.immunefiles.com/file/view/${file.urlhash}`, '_blank');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger title='Menu' className='text-secondary_font font-medium text-2xl leading-[0px] pb-[1.3rem] p-[0.3rem] px-1 text-center rounded-full hover:bg-button_hover cursor-pointer'>...</DropdownMenuTrigger>
      <DropdownMenuContent>
        {isZip && (
          <>
            <DropdownMenuItem>
              <Image src='/extract-icon.svg' width={16} height={16} alt='extract icon'/>
              <UnzipFilesAlert files={[file]} multipleFiles={false}/>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Image src='/extract-icon.svg' width={16} height={16} alt='extract icon'/>
              <UnziptoFilesAlert files={[file]} multiplefiles={false}/>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem onClick={handleOpen}>
          <Image src='/open-icon.svg' width={16} height={16} alt='Open icon'/>
          Open
        </DropdownMenuItem>
        {file.is_file && (
          <DropdownMenuItem>
            <Image src='/download-icon.svg' width={16} height={16} alt='Download icon'/>
            <DownloadFile file={file}/>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Image src='/details-icon.svg' width={16} height={16} alt='Details icon'/>
          <FileDetailsModal file={file} type={type}/>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Image src='/move-icon.svg' width={16} height={16} alt='Move icon'/>
          <MoveOrCopyFilesModal multiplefiles={false} moveORcopy='Move' currFile={file}/>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Image src='/copy-icon.svg' width={16} height={16} alt='Copy icon'/>
          <MoveOrCopyFilesModal multiplefiles={false} moveORcopy='Copy' currFile={file}/>
        </DropdownMenuItem>
        <DropdownMenuItem className='text-[#FF6161] focus:text-[#FF6161]' onClick={(e) => e.stopPropagation()}>
          <Image src='/delete-icon.svg' width={16} height={16} alt='Delete icon'/>
          <DeleteFileAlert multiplefiles={false}/>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Image src='/share-icon.svg' width={16} height={16} alt='Rename icon'/>
          <ShareContentModal multiplefiles={false} currFile={file}/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThreeDotsMenu

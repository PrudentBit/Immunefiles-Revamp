"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import Image from 'next/image'
import DeleteFileAlert from '@/components/Alerts/DeleteFileAlert';
import FileDetailsModal from '@/components/Modals/FileDetailsModal';
import MoveOrCopyFilesModal from '@/components/Modals/Move&CopyFilesModal';
import ShareContentModal from '@/components/Modals/ShareContent/ShareContentModal';
import UnzipFilesAlert from '@/components/Modals/Zip-UnizipModals/UnzipFilesAlert';
import UnziptoFilesAlert from '@/components/Modals/Zip-UnizipModals/UnzipToFilesModal';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  file: FileOrFolderType;
}

const RightClickContextMenu = ({children, file}: Props) => {
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
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {isZip && (
          <>
            <ContextMenuItem className="flex gap-2 items-center">
              <Image src='/extract-icon.svg' width={16} height={16} alt='extract icon'/>
              <UnzipFilesAlert files={[file]} multipleFiles={false}/>
            </ContextMenuItem>
            <ContextMenuItem className="flex gap-2 items-center">
              <Image src='/extract-icon.svg' width={16} height={16} alt='extract icon'/>
              <UnziptoFilesAlert files={[file]} multiplefiles={false}/>
            </ContextMenuItem>
          </>
        )}
        <ContextMenuItem className="flex gap-2 items-center" onClick={handleOpen}>
          <Image src='/open-icon.svg' width={16} height={16} alt='Open icon'/>
          Open
        </ContextMenuItem>
        <ContextMenuItem className="flex gap-2 items-center">
          <Image src='/download-icon.svg' width={16} height={16} alt='Download icon'/>
          Download
        </ContextMenuItem>
        <ContextMenuItem className="flex gap-2 items-center">
          <Image src='/details-icon.svg' width={16} height={16} alt='Details icon'/>
          <FileDetailsModal file={file} type={type}/>
        </ContextMenuItem>
        <ContextMenuItem className="flex gap-2 items-center">
          <Image src='/move-icon.svg' width={16} height={16} alt='Move icon'/>
          <MoveOrCopyFilesModal multiplefiles={false} moveORcopy='Move' currFile={file}/>
        </ContextMenuItem>
        <ContextMenuItem className="flex gap-2 items-center">
          <Image src='/copy-icon.svg' width={16} height={16} alt='Copy icon'/>
          <MoveOrCopyFilesModal multiplefiles={false} moveORcopy='Copy' currFile={file}/>
        </ContextMenuItem>
        <ContextMenuItem className='flex gap-2 text-[#FF6161] focus:text-[#FF6161]' onClick={(e) => e.stopPropagation()}>
          <Image src='/delete-icon.svg' width={16} height={16} alt='Delete icon'/>
          <DeleteFileAlert multiplefiles={false} type={type}/>
        </ContextMenuItem>
        <ContextMenuItem className="flex gap-2 items-center">
          <Image src='/share-icon.svg' width={16} height={16} alt='Rename icon'/>
          <ShareContentModal multiplefiles={false} currFile={file} type={type}/>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default RightClickContextMenu

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

type Props = {
  children: React.ReactNode;
  file: FileOrFolderType;
}

const RightClickContextMenu = ({children, file}: Props) => {
  const isZip = file.name.endsWith('.zip');

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
        <ContextMenuItem className="flex gap-2 items-center">
          <Image src='/open-icon.svg' width={16} height={16} alt='Open icon'/>
          Open
        </ContextMenuItem>
        <ContextMenuItem className="flex gap-2 items-center">
          <Image src='/download-icon.svg' width={16} height={16} alt='Download icon'/>
          Download
        </ContextMenuItem>
        <ContextMenuItem className="flex gap-2 items-center">
          <Image src='/details-icon.svg' width={16} height={16} alt='Details icon'/>
          <FileDetailsModal file={file}/>
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
          <DeleteFileAlert multiplefiles={false}/>
        </ContextMenuItem>
        <ContextMenuItem className="flex gap-2 items-center">
          <Image src='/share-icon.svg' width={16} height={16} alt='Rename icon'/>
          <ShareContentModal multiplefiles={false}/>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default RightClickContextMenu

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import Image from 'next/image'
import DeleteGroupFilesAlert from "@/components/Alerts/DeleteGroupFilesAlert";
import FileDetailsModal from '@/components/Modals/FileDetailsModal';
import ShareGroupContentModal from '@/components/Modals/ShareContent/ShareGroupContentModal';
import DownloadFile from '@/components/DownloadFile';
import { useRouter } from 'next/navigation';

type Props = {
  file: groupFileandFolderType;
  type: string;
  group_hash: string;
  children: React.ReactNode;
}

const SharedRightClickMenu = ({file, type, group_hash, children}: Props) => {
  const router = useRouter();

  const handleOpen = () => {
    if (type==='folder') {
      router.push(`/groups/${group_hash}/${file.urlhash}`);
    }
    else {
      window.open(`https://${window.location.hostname.split(".")[0]}.immunefiles.com/file/view/${file.urlhash}`, '_blank');
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleOpen}>
          <Image src='/open-icon.svg' width={16} height={16} alt='Open icon'/>
            Open
        </ContextMenuItem>
        <ContextMenuItem
          disabled={!file.permissions.can_download}
        >
          <Image src='/download-icon.svg' width={16} height={16} alt='Download icon'/>
          <DownloadFile file={file}/>
        </ContextMenuItem>
        <ContextMenuItem>
          <Image src='/details-icon.svg' width={16} height={16} alt='Details icon'/>
          <FileDetailsModal groupFile={file} type={type}/>
        </ContextMenuItem>
        <ContextMenuItem 
          className='text-[#FF6161] focus:text-[#FF6161]' 
          onClick={(e) => e.stopPropagation()}
          disabled={!file.permissions.can_delete}
        >
          <Image src='/delete-icon.svg' width={16} height={16} alt='Delete icon'/>
          <DeleteGroupFilesAlert file={file} type={type} group_hash={group_hash}/>
        </ContextMenuItem>
        <ContextMenuItem
          disabled={!file.permissions.can_share}
        >
          <Image src='/share-icon.svg' width={16} height={16} alt='Rename icon'/>
          <ShareGroupContentModal currFile={file} type={type}/>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default SharedRightClickMenu

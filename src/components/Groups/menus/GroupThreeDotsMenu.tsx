"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import DeleteFileAlert from '@/components/Alerts/DeleteFileAlert';
import FileDetailsModal from '@/components/Modals/FileDetailsModal';
import ShareContentModal from '@/components/Modals/ShareContent/ShareContentModal';
import DownloadFile from '@/components/DownloadFile';
import { useRouter } from 'next/navigation';
import DeleteGroupFilesAlert from "@/components/Alerts/DeleteGroupFilesAlert";

type Props = {
  file: groupFileandFolderType;
  type: string;
  group_hash: string;
}

const GroupThreeDotsMenu = ({file, type, group_hash}: Props) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger title='Menu' className='text-secondary_font font-medium text-2xl leading-[0px] pb-[1.3rem] p-[0.3rem] px-1 text-center rounded-full hover:bg-button_hover cursor-pointer'>...</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleOpen}>
          <Image src='/open-icon.svg' width={16} height={16} alt='Open icon'/>
            Open
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!file.permissions.can_download}
        >
          <Image src='/download-icon.svg' width={16} height={16} alt='Download icon'/>
          <DownloadFile file={file}/>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Image src='/details-icon.svg' width={16} height={16} alt='Details icon'/>
          <FileDetailsModal groupFile={file} type={type}/>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className='text-[#FF6161] focus:text-[#FF6161]' 
          onClick={(e) => e.stopPropagation()}
          disabled={!file.permissions.can_delete}
        >
          <Image src='/delete-icon.svg' width={16} height={16} alt='Delete icon'/>
          <DeleteGroupFilesAlert file={file} multiplefiles={false} type={type} group_hash={group_hash}/>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!file.permissions.can_share}
        >
          <Image src='/share-icon.svg' width={16} height={16} alt='Rename icon'/>
          <ShareContentModal multiplefiles={false} currFile={file} type={type}/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default GroupThreeDotsMenu

"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import DownloadFile from '@/components/DownloadFile';
import { useRouter } from 'next/navigation';
import SharedFileDetails from "@/components/Modals/SharedFileDetails";
import DeleteSharedFilesAlert from "@/components/Alerts/DeleteSharedFilesAlert ";

type Props = {
  file: SharedFilesType["files"][0] | SharedFilesType["children"][0];
  type: string;
}

const SharedThreeDotsMenu = ({file, type}: Props) => {
  const router = useRouter();

  const handleOpen = () => {
    if (type==='folder') {
      router.push(`/shared/${file.urlhash}`);
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
          disabled={!file.can_download_content || type==='folder'}
        >
          <Image src='/download-icon.svg' width={16} height={16} alt='Download icon'/>
          <DownloadFile file={file}/>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Image src='/details-icon.svg' width={16} height={16} alt='Details icon'/>
          <SharedFileDetails file={file} type={type}/>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className='text-[#FF6161] focus:text-[#FF6161]' 
          onClick={(e) => e.stopPropagation()}
          disabled={!file.can_add_delete_content}
        >
          <Image src='/delete-icon.svg' width={16} height={16} alt='Delete icon'/>
          <DeleteSharedFilesAlert file={file} type={type}/>
        </DropdownMenuItem>
        {/* <DropdownMenuItem
          disabled={!file.can_share_content}
        >
          <Image src='/share-icon.svg' width={16} height={16} alt='Rename icon'/>
          <ShareGroupContentModal currFile={file} type={type}/>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SharedThreeDotsMenu

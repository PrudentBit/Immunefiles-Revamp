import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore';
import { useEffect } from 'react';

const FilesSortBy = () => {
  const {sortBy, setSortBy, sortFiles, sortFolders } = useFileAndFolderStore();

  useEffect(() => {
    sortFiles();
    sortFolders();
  }, [sortBy])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-[7rem] h-8 flex justify-between items-center gap-2 px-4 bg-bg_hover rounded-lg'>
        <p className='text-[#7A7AFF]'>Sort by</p>
        <Image src="/down-arrow-2.svg" width={20} height={20} alt='Select' className="pt-1"/>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-[7rem]'>
        <DropdownMenuItem onClick={() => setSortBy('alphabetical')}>
          Name
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortBy('extension')}>
          Type
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortBy('dateAsc')}>
          Date (Asc)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortBy('dateDesc')}>
          Date (Desc)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortBy('sizeAsc')}>
          Size (Asc)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortBy('sizeDesc')}>
          Size (Desc)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilesSortBy

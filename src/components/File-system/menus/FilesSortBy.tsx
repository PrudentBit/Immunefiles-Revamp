import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { useFileAndFolderStore } from '@/utils/store/filesAndFoldersStore';

const FilesSortBy = () => {
  const {sortBy, setSortBy, order, setOrder} = useFileAndFolderStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-[7rem] h-8 flex justify-between items-center gap-2 px-4 bg-bg_hover rounded-lg'>
        <p className='text-[#7A7AFF]'>Sort by</p>
        <Image src="/down-arrow-2.svg" width={20} height={20} alt='Select' className="pt-1"/>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-[9rem]'>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setSortBy('name')} className="flex justify-between">
            <p>Name</p> <p>{sortBy === 'name' && '✔'}</p>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy('created')} className="flex justify-between">
            <p>Created on</p> <p>{sortBy === 'created' && '✔'}</p>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy('modified')} className="flex justify-between">
            <p>Modified on</p> <p>{sortBy === 'modified' && '✔'}</p>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy('size')} className="flex justify-between">
            <p>Size</p> <p>{sortBy === 'size' && '✔'}</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setOrder('asc')} className="flex justify-between">
            <p>Ascending</p> <p>{order === 'asc' && '✔'}</p>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOrder('dsc')} className="flex justify-between">
            <p>Descending</p> <p>{order === 'dsc' && '✔'}</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilesSortBy

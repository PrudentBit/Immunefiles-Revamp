import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

type sortBy = "name" | "size" | "shared";
type order = "asc" | "dsc";

type Props = {
  sortBy: sortBy,
  setSortBy: React.Dispatch<React.SetStateAction<sortBy>>,
  order: order,
  setOrder: React.Dispatch<React.SetStateAction<order>>,
}

const SortSharedBy = ({sortBy, setSortBy, order, setOrder}: Props) => {
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
          <DropdownMenuItem onClick={() => setSortBy('shared')} className="flex justify-between">
            <p>Shared on</p> <p>{sortBy === 'shared' && '✔'}</p>
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

export default SortSharedBy
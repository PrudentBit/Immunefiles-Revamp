import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image'

const ServerSortBy = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-[7rem] h-10 flex justify-between items-center gap-2 px-4 bg-bg_hover rounded-lg'>
        <p className='text-[#7A7AFF]'>Sort by</p>
        <Image src="/down-arrow-2.svg" width={20} height={20} alt='Select' className="pt-1"/>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-[7rem]'>
        <DropdownMenuItem>
          item1
        </DropdownMenuItem>
        <DropdownMenuItem>
          item2
        </DropdownMenuItem>
        <DropdownMenuItem>
          item3
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerSortBy
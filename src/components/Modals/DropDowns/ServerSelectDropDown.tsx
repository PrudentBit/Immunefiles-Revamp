import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image'

const ServerSelectDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-[40rem] h-12 flex justify-between items-center px-6 bg-bg_hover rounded-lg'>
        <p className='text-[#7A7AFF]'>Server name</p>
        <Image src="/down-arrow-2.svg" width={20} height={20} alt='Select'/>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-[39rem]'>
        <DropdownMenuItem>
          item1
        </DropdownMenuItem>
        <DropdownMenuItem>
          item1
        </DropdownMenuItem>
        <DropdownMenuItem>
          item1
        </DropdownMenuItem>
        <DropdownMenuItem>
          item1
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerSelectDropDown
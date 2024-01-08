import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image'

type Props = {
  servers: serverType[]
  selectedServer: serverType | null
  setSelectedServer: React.Dispatch<React.SetStateAction<serverType | null>>
}

const ServerSelectDropDown = ({servers, selectedServer, setSelectedServer}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-[40rem] h-12 flex justify-between items-center px-6 bg-bg_hover rounded-lg'>
        <p className='text-[#7A7AFF]'>{selectedServer?.server_name || "Select a server"}</p>
        <Image src="/down-arrow-2.svg" width={20} height={20} alt='Select'/>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-[39rem]'>
        <div className='flex flex-col gap-2'>
          {servers.map((server, index) => (
            <DropdownMenuItem key={index} onClick={() => setSelectedServer(server)} className='flex justify-between'>
              <p className='text-primary_font'>{server.server_name}</p>
              {selectedServer?.server_name == server.server_name && (
                '✔'
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerSelectDropDown
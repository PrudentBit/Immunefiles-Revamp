"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { selectedServersStore } from '@/utils/store/integrationsStore'
import deleteServer from '@/utils/api/deleteServerAPI'
import { toast } from 'sonner'

type Props = {
  server: serverType
}

const ServerRow = ({server}: Props) => {
  const [deleteHovered, setDeleteHovered] = useState<boolean>(false);
  const {selectedServers, setSelectedServers, toggleForceRefresh} = selectedServersStore();

  const handleCheckboxClick = () => {
    if(selectedServers.includes(server.id)) {
      setSelectedServers(selectedServers.filter(id => id !== server.id))
    }
    else {
      setSelectedServers([...selectedServers, server.id])
    }
  }

  const handleDelete = async () => {
    const response = await deleteServer(server.server_name)
    if (response.status === 200) {
      toggleForceRefresh()
      toast.success('Server deleted successfully')
    }
    else{
      toast.error('Something went wrong', {
        description: response.data.message
      })
    }
  }

  return (
    <div className='w-full h-14 bg-[#E5EDFF] rounded-lg flex justify-between items-center p-3 px-5'>
      <div className='flex gap-4 items-center'>
        <button onClick={handleCheckboxClick} className='w-6 h-[1.43rem] bg-[#FFFFFF] rounded-sm'>
          { selectedServers.includes(server.id) ? (
            <Image src="/checked-icon-white.svg" alt='check' width={28} height={28}/>
          ):(
            <Image src="/not-checked-icon-white.svg" alt='uncheck' width={28} height={28}/>
          )}
        </button>

        <div className='flex gap-2 items-center'>
          <Image src="/server-icon-2.svg" width={30} height={30} alt='server'/>
          <p className='text-primary_font text-[1.1rem] w-[10rem] truncate'>{server.server_name}</p>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className={`h-1 w-1 rounded-full ${server.syncs.length > 0 ? "bg-green-500" : "bg-red-400"} mt-[0.1rem]`}></div>
        <p className={`${server.syncs.length > 0 ? "text-green-500" : "text-red-400"} text-[0.83rem] font-medium`}>
          {server.syncs.length > 0 ? 'Active' : 'Disconnected'}
        </p>
      </div>

      <div className='w-20 flex justify-end'>
        <Button
          onMouseEnter={()=>setDeleteHovered(true)}
          onMouseLeave={()=>setDeleteHovered(false)}
          onClick={handleDelete}
          className='h-6 w-6 p-0 bg-white hover:bg-[#FFEBEC] hover:w-20 hover:scale-[1.1] gap-2 flex items-center justify-center rounded-sm border-[1px] border-solid border-red-400'>
            <Image src="/delete-icon.svg" width={15} height={15} alt='delete' />
            {deleteHovered && <p className='text-red-400 text-[0.82rem]'>Delete</p>}
        </Button>
      </div>
    </div>
  )
}

export default ServerRow
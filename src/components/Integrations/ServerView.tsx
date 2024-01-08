"use client"

import {useEffect, useState} from 'react'
import Image from 'next/image'
import AddNewServerModal from '../Modals/AddNewServerModal'
import ServerRow from './ServerRow'
import getUserServers from '@/utils/api/getUserServersAPI'
import { toast } from 'sonner'
import { selectedServersStore } from '@/utils/store/integrationsStore'

type Props = {
  drive: string
}

const ServerView = ({drive}: Props) => {
  const [servers, setServers] = useState<serverType[]>([])
  const {setTotalServers, forceRefresh} = selectedServersStore();

  useEffect(() => {
    const getServer = async () => {
      const response = await getUserServers(drive)
      if(response.status === 200) {
        setServers(response.data)
        setTotalServers(response.data.length)
      }
      else{
        toast.error('Something went wrong')
      }
    }
    getServer()
  }, [forceRefresh])

  return (
    <>
      {servers.length > 0 ? (
        <div className='w-full h-[93%] max-h-[75vh] flex flex-col gap-5 pr-6 pt-2 overflow-auto'>
          {servers.map((server: serverType) => (
            <ServerRow key={server.id} server={server}/>
          ))}
        </div>
      ) : (
        <div className='w-full h-[93%] flex justify-center items-center'>
          <div className='w-[14rem] flex flex-col gap-4 items-center justify-center'>
            <Image src='/no-server-illustration.svg' width={170} height={170} alt="no-integrations"/>
    
            <p className='text-primary_font font-semibold text-[1rem] text-justify w-full'>
              No Remote Servers Connected
            </p>
    
            <AddNewServerModal drive='googledrive' navButton={false}/>
          </div>
        </div>
      ) }
    </>
  )
}

export default ServerView
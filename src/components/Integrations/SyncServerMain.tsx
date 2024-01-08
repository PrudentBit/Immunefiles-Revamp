"use client"

import {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ServerSelectDropDown from '@/components/Modals/DropDowns/ServerSelectDropDown'
import { Button } from '@/components/ui/button'
import getUserServers from '@/utils/api/getUserServersAPI'
import { toast } from 'sonner'
import { selectedServersStore } from '@/utils/store/integrationsStore'

type Props = {
  drive: string
}

const SyncServerMain = ({drive}: Props) => {
  const {setTotalServers, forceRefresh} = selectedServersStore();
  const [servers, setServers] = useState<serverType[]>([])
  const [selectedServer, setSelectedServer] = useState<serverType | null>(null)

  useEffect(() => {
    const getServer = async () => {
      const response = await getUserServers(drive)
      if(response.status === 200) {
        const data = response.data
        setServers(data.filter((server: serverType) => server.syncs.length == 0))
        setTotalServers(data.length)
      }
      else{
        toast.error('Something went wrong')
      }
    }
    getServer()
  }, [forceRefresh])

  return (
    <div className='w-full h-full flex flex-col gap-7'>
        <div className='flex gap-4'>
          <Link href={`/integrations/${drive}`} className='h-10 w-10 bg-[#E5EDFF] flex justify-center items-center rounded-sm hover:bg-bg_hover'>
            <Image src='/left-arrow-blue.svg' width={20} height={20} alt="back"/>
          </Link>

          {drive == 'googledrive' ? (
            <div className="relative h-10 w-10 p-1 rounded-sm">
              <div className={`absolute inset-0 bg-gradient-to-b from-green-700 via-blue-600 to-yellow-400 opacity-[35%] rounded-sm`}></div>
              <div className="relative h-full w-full flex items-center justify-center">
                <Image src='/google-drive.svg' width={18} height={18} alt="server"/>
              </div>
            </div>
          ):(
            <div className="relative h-10 w-10 p-1 rounded-sm">
              <div className={`absolute inset-0 bg-gradient-to-b from-gray-400 via-blue-400 to-blue-500 opacity-[35%] rounded-sm`}></div>
              <div className="relative h-full w-full flex items-center justify-center">
                <Image src='/one-drive.svg' width={18} height={18} alt="server"/>
              </div>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-10 pt-2'>
          <div className='flex flex-col gap-5'>
            <label htmlFor='server' className='flex gap-3'>
              <Image src="/server-icon-black.svg" width={20} height={20} alt='choose server'/>
              <p className='font-semibold text-md'>Choose server</p>
            </label>
            <ServerSelectDropDown servers={servers} selectedServer={selectedServer} setSelectedServer={setSelectedServer}/>
          </div>

          <div className='flex flex-col gap-5'>
            <label htmlFor='server' className='flex gap-2'>
              <Image src="/share-icon-2.svg" width={26} height={26} alt='choose server'/>
              <p className='font-semibold text-md'>Choose content to sync from remote server</p>
            </label>
            <div className='flex gap-6 items-center'>
              <p className='text-primary_font w-[50rem] h-12 flex justify-between items-center px-6 bg-[#E5EDFF] rounded-lg'>Select a folder</p>
              <Button className='w-[10rem] h-12 flex gap-2 items-center  bg-[#E5EDFF] rounded-lg'>
                <Image src="/folder-icon-2.svg" width={20} height={20} alt='upload folder'/>
                <p className='text-primary_font font-normal text-base'>Select folder</p>
              </Button>
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <label htmlFor='server' className='flex gap-2'>
              <Image src="/share-icon-2-mirrored.svg" width={26} height={26} alt='choose server'/>
              <p className='font-semibold text-md'>Choose content to sync in your file system</p>
            </label>
            <div className='flex gap-6 items-center'>
              <p className='text-primary_font w-[50rem] h-12 flex justify-between items-center px-6 bg-[#E5EDFF] rounded-lg'>Select a folder</p>
              <Button className='w-[10rem] h-12 flex gap-2 items-center  bg-[#E5EDFF] rounded-lg'>
                <Image src="/folder-icon-2.svg" width={20} height={20} alt='upload folder'/>
                <p className='text-primary_font font-normal text-base'>Select folder</p>
              </Button>
            </div>
          </div>

          <Button className='w-[12rem] rounded-full hover:bg-[#6B97F8] mt-4'>
            Start Syncing
          </Button>
        </div>
      </div>
  )
}

export default SyncServerMain
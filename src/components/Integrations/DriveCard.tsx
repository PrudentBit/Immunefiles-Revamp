"use client"

import {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import getUserServers from '@/utils/api/getUserServersAPI'
import { toast } from 'sonner'

type Props = {
  image: string
  name: string
  gradient: string
}

const DriveCard = ({image, name, gradient}: Props) => {
  const link=name.toLowerCase().replace(/\s/g, '');
  const [isConnected, setIsConnected] = useState<boolean>(false)

  useEffect(() => {
    const getServer = async () => {
      const response = await getUserServers(link)
      if(response.status === 200) {
        if (response.data.length > 0) {
          setIsConnected(true)
        }
      }
      else{
        toast.error('Something went wrong')
      }
    }
    getServer()
  }, [])

  return (
    <div 
      className={`h-[16rem] w-[16rem] flex flex-col gap-[0.9rem] rounded-3xl p-5 
        ${isConnected ? (
          "shadow-[0px_4px_30px_0px_rgba(58,186,110,0.25)]"
        ) : (
          "shadow-[0px_4px_30px_0px_rgba(75,123,229,0.25)]"
        )}`
      }
    >
      <div className='flex gap-3'>
        <div className="relative h-[3.9rem] w-[3.9rem] p-1 rounded-lg">
          <div className={`absolute inset-0 ${gradient} opacity-[35%] rounded-lg`}></div>
          <div className="relative h-full w-full flex items-center justify-center">
            <Image src={image} width={30} height={30} alt="server"/>
          </div>
        </div>

        <div className='h-[3.9rem] flex flex-col justify-center gap-1'>
          <p className='text-primary_font text-lg font-medium leading-4'>{name}</p>
          <div className="flex gap-2 items-center">
            <div className={`h-1 w-1 rounded-full ${isConnected? "bg-green-500" : "bg-red-400"} mt-[0.1rem]`}></div>
            <p className={`${isConnected? "text-green-500" : "text-red-400"} text-[0.83rem] font-medium`}>
              {isConnected ? 'Active' : 'Disconnected'}
            </p>
          </div>
        </div>
      </div>

      <p className="text-[#979797] text-[0.85rem] font-normal text-justify leading-[0.9rem] px-1">
        Immunefiles users can now directly connect their {name} accounts to our platform, bringing together the power of two trusted platforms in one secure environment.
      </p>

      {isConnected ? (
        <Link href={`/integrations/${link}`} className='bg-white hover:bg-[#3ABA6E] border-solid border-[1px] border-[#3ABA6E] text-[#3ABA6E] hover:text-white text-sm font-medium py-[0.6rem] px-4 flex justify-center items-center rounded-2xl'>
          View
        </Link>
      ):(
        <Link href={`/integrations/${link}`} className='bg-white hover:bg-primary_font border-solid border-[1px] border-primary_font text-primary_font flex justify-center items-center hover:text-white text-sm font-medium py-[0.6rem] px-4 rounded-2xl'>
          Connect
        </Link>
      )}
    </div>
  )
}

export default DriveCard
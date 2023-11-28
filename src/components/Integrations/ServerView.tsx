"use client"

import { useState } from 'react'
import Image from 'next/image'
import AddNewServerModal from '../Modals/AddNewServerModal'
import ServerRow from './ServerRow'

type Props = {}

const ServerView = (props: Props) => {
  const [servers, setServers] = useState<boolean>(true);
  return (
    <>
      {servers? (
        <div className='w-full h-[93%] max-h-[75vh] flex flex-col gap-5 pr-6 pt-2 overflow-auto'>
          <ServerRow/>
          <ServerRow/>
          <ServerRow/>
          <ServerRow/>
          <ServerRow/>
          <ServerRow/>
          <ServerRow/>
          <ServerRow/>
          <ServerRow/>
          <ServerRow/>
          <ServerRow/>
          <ServerRow/>
        </div>
      ) : (
        <div className='w-full h-[93%] flex justify-center items-center'>
          <div className='w-[14rem] flex flex-col gap-4 items-center justify-center'>
            <Image src='/no-server-illustration.svg' width={170} height={170} alt="no-integrations"/>
    
            <p className='text-primary_font font-semibold text-[1rem] text-justify w-full'>
              No Remote Servers Connected
            </p>
    
            <AddNewServerModal urlhash='googledrive' navButton={false}/>
          </div>
        </div>
      ) }
    </>
  )
}

export default ServerView
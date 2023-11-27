import React from 'react'
import TopNav from '@/components/TopNav'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import IntegrationHeader from '@/components/Integrations/IntegrationHeader'

interface FileSystemProps {
  params: {urlhash: string}
}

const Integrations: React.FC<FileSystemProps> = ({ params: { urlhash } }) => {
  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <TopNav currentTab='integrations'/>

      <div className='w-full h-full'>
        <IntegrationHeader urlhash={urlhash}/>

        <div className='w-full h-[93%] flex justify-center items-center'>
          <div className='w-[14rem] flex flex-col gap-4 items-center justify-center'>
            <Image src='/no-server-illustration.svg' width={170} height={170} alt="no-integrations"/>

            <p className='text-primary_font font-semibold text-[1rem] text-justify w-full'>
              No Remote Servers Connected
            </p>

            <Button className='h-10 flex gap-2 w-full hover:bg-[#6B97F8]'>
              Add New
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Integrations
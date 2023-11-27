import React from 'react'
import TopNav from '@/components/TopNav'
import IntegrationHeader from '@/components/Integrations/IntegrationHeader'
import ServerView from '@/components/Integrations/ServerView'

interface FileSystemProps {
  params: {urlhash: string}
}

const Integrations: React.FC<FileSystemProps> = ({ params: { urlhash } }) => {
  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <TopNav currentTab='integrations'/>

      <div className='w-full h-full'>
        <IntegrationHeader urlhash={urlhash}/>

        <ServerView/>
      </div>
    </div>
  )
}

export default Integrations
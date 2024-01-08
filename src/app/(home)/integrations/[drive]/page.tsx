import React from 'react'
import TopNav from '@/components/TopNav'
import IntegrationHeader from '@/components/Integrations/IntegrationHeader'
import ServerView from '@/components/Integrations/ServerView'

interface IntegrationsProps {
  params: {drive: string}
}

const Integrations: React.FC<IntegrationsProps> = ({ params: { drive } }) => {
  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <TopNav currentTab='integrations'/>

      <div className='w-full h-full flex flex-col gap-7'>
        <IntegrationHeader drive={drive}/>

        <ServerView drive={drive}/>
      </div>
    </div>
  )
}

export default Integrations
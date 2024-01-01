import React from 'react'
import TopNav from '@/components/TopNav'
import IntegrationsMain from '@/components/Integrations/IntegrationsMain'

const Integrations = () => {
  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <TopNav currentTab='integrations'/>
      <IntegrationsMain/>
    </div>
  )
}

export default Integrations
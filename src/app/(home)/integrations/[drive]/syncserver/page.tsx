import React from 'react'
import TopNav from '@/components/TopNav'
import SyncServerMain from '@/components/Integrations/SyncServerMain'

interface SyncServerProps {
  params: {drive: string}
}

const SyncServer: React.FC<SyncServerProps> = ({ params: { drive } }) => {
  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <TopNav currentTab='integrations'/>

      <SyncServerMain drive={drive}/>
    </div>
  )
}

export default SyncServer
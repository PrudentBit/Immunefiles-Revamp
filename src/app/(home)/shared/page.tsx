import React from 'react'
import TopNav from '@/components/TopNav'
import SharedTab from '@/components/Shared-tab/SharedTab'

const Shared = () => {
  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <TopNav currentTab='shared'/>
      <SharedTab/>
    </div>
  )
}

export default Shared
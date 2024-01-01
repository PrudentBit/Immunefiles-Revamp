import React from 'react'
import TopNav from '@/components/TopNav'

const Trash = () => {
  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <TopNav currentTab='trash'/>

    </div>
  )
}

export default Trash
import React from 'react'
import TopNav from '@/components/TopNav'
import ManageAccount from '@/components/ManageAccount/ManageAccount'

const Manage = () => {
  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <TopNav currentTab=''/>
      <ManageAccount />
    </div>
  )
}

export default Manage
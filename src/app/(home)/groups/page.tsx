import React from 'react'
import TopNav from '@/components/TopNav'
import GroupsTab from '@/components/Groups/GroupsTab'

const Group = () => {
  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <TopNav currentTab='groups'/>
      <GroupsTab/>
    </div>
  )
}

export default Group
import React from 'react'
import TopNav from '@/components/TopNav'
import UserDashboard from '@/components/User-dashboard/UserDashboard'

const Dashboard = () => {
  return (
    <div className='w-full h-[100vh] p-6 flex flex-col gap-6 overflow-auto'>
      <TopNav currentTab='dashboard'/>

      <UserDashboard/>
    </div>
  )
}

export default Dashboard
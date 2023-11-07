import React from 'react'
import TopNav from '@/components/TopNav'
import Statistics from '@/components/Admin-dashboard/Statistics/Statistics'
import UserAnalytics from '@/components/Admin-dashboard/UserAnalytics/UserAnalytics'


const AdminDashboard = () => {
  return (
    <div className='w-full h-[100vh] p-6 pb-3 flex flex-col gap-6 overflow-auto'>
      <TopNav currentTab='admin'/>

      <div className='flex flex-col gap-10 h-[85vh] p-2'>
        <Statistics/>

        <UserAnalytics/>
      </div>
    </div>
  )
}

export default AdminDashboard
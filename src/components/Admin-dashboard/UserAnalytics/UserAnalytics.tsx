"use client"

import React, {useEffect} from 'react'
import ShadowedCard from '@/components/ShadowedCard'
import AnalyticsNav from './AnalyticsNav'
import UserAnalyticRows from './UserAnalyticsRows'
import getUsers from '@/utils/api/getAdminUsersAPI'

type Props = {}

const UserAnalytics = (props: Props) => {
	const [twoFAGlobal, setTwoFAGlobal] = React.useState(false)
	const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [users, setUsers] = React.useState<AdminUsersType[]>([]);
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await getUsers();
        console.log(users);
        setUsers(users.users);
      } 
      catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

	return (
    <ShadowedCard className='h-[65%] w-full justify-start gap-4'>
			<AnalyticsNav twoFAGlobal={twoFAGlobal} setTwoFAGlobal={setTwoFAGlobal} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

			<div className='h-7 flex w-[98%] py-1 px-4 gap-7 text-[#AFAFAF] font-base'>
        <p className='w-6'></p>
        <p className='w-[42%] pl-1'>User's info</p>
        <p className='w-[10%] flex justify-center'>Enforce 2FA</p>
        <p className='w-[10%] flex justify-center'>Status</p>
        <p className='w-[10%] flex justify-center'>Storage</p>
        <p className='w-[10%] flex justify-center'>Last active</p>
        <p className='w-7'></p>
			</div>

			<div className='h-[37vh] flex flex-col gap-4 overflow-y-auto pr-4'>
        {users?.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase())).map((user, index) => (
          <UserAnalyticRows key={index} user={user} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
        ))}
      </div>

		</ShadowedCard>
  )
}

export default UserAnalytics
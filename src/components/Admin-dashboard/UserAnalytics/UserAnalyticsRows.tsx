import React from 'react'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'
import UserSpecificDetails from '@/components/Modals/UserSpecificDetailsModal/UserSpecificDetailsModal'

type Props = {
	user: AdminUsersType
}

const UserAnalyticRows = ({user}: Props) => {
	
  const [checked, setChecked] = React.useState(false);
	
  return (
    <div className='h-[3.8rem] w-full rounded-xl flex items-center justify-left p-4 gap-7 bg-primary_bg'>
			<button onClick={()=>setChecked(!checked)} className='w-6 h-[1.43rem] bg-[#DADAFF] rounded-sm'>
				{checked ? (
					<Image src="/checked-icon.svg" alt='check' width={28} height={28}/>
				):(
					<Image src="/not-checked-icon.svg" alt='uncheck' width={28} height={28}/>
				)}
			</button>
			<div className='flex gap-2 w-[42%]'>
				<Image src="/user.svg" alt='profile' width={40} height={40} className='rounded-full'/>
				<div>
					<p className='text-[#7A7AFF] text-lg font-medium leading-5'>{user.name}</p>
					<p className='text-[#7A7AFF] text-sm font-normal leading-4'>{user.email}</p>
				</div>
			</div>

			<div className='w-[10%] flex items-center justify-center'>
				<Switch id={"user"} className='' checked={user.FA} /> {/* onCheckedChange={() => setTwoFA(!twoFA)} */}
			</div>

			<div className='w-[10%] flex gap-2 items-center justify-center'>
				<div className={`h-2 w-2 rounded-full ${user.status? "bg-green-500" : "bg-red-500"} mt-[0.1rem]`}></div>
				<p className='text-green-500 text-[0.83rem] font-medium'>{user.status?("Active"):("Restricted")}</p>
			</div>

			<div className='w-[10%] flex gap-2 items-center justify-center'>
				<p className='text-[0.9rem] font-medium text-primary_font'>{user.storage}</p>
			</div>

			<div className='w-[10%] flex gap-2 items-center justify-center'>
				<p className='text-[0.9rem] font-medium text-primary_font'>{user.last_active}</p>
			</div>

      <UserSpecificDetails user={user}/>
		</div>
  )
}

export default UserAnalyticRows
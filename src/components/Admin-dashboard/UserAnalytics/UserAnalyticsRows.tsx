import React from 'react'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'
import UserSpecificDetails from '@/components/Modals/UserSpecificDetailsModal/UserSpecificDetailsModal'
import set2FA from '@/utils/api/user2FASetAPI'
import BotLeftAlert from '@/components/BotLeftAlert'

type Props = {
	user: AdminUsersType
	setUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

const UserAnalyticRows = ({user, setUpdate}: Props) => {
  const [checked, setChecked] = React.useState(false);
	const [showAlert, setShowAlert] = React.useState(false);

	const handle2FASwitch = async () => {
    try {
      const result = await set2FA([user.username]);
      if (result.success) {
        setUpdate(prevState => !prevState);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      }
    } catch (error) {
      console.error(error);
    }
  }
	
  return (
    <>
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
					<Switch id={"user"} className='' checked={user.FA} onClick={handle2FASwitch}/>
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
			{showAlert &&
				<BotLeftAlert image='/delete-icon.svg' imagebg='bg-[#FFE3E5]'>
					<div className='flex flex-col items-start text-left leading-[0.2rem] gap-[0.35rem]'>
						<p className='text-[#FF6161] font-semibold text-base leading-4  '>2FA set successfully</p>
						<p className='text-[#979797] font-[400] text-sm leading-[1.1rem]'>The user will now be required to use two-factor authentication.</p>
					</div>
				</BotLeftAlert>
			}
		</>
  )
}

export default UserAnalyticRows
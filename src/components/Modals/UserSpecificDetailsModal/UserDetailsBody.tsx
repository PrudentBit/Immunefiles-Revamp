import React, {useState, useEffect} from 'react'
import getUser from '@/utils/api/getAdminSpecificUserAPI'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import UserLinkAnaltics from './UserLinkAnaltics'
import UserStorageAnalytics from './UserStorageAnalytics'
import UserGroups from './UserGroups'
import UserDrives from './UserDrives'
import RestrictUserModal from './ActionsModals/RestrictUserModal'
import DeleteUserModal from './ActionsModals/DeleteUserModal'

type Props = {
  username: AdminUsersType['username']
}

const UserDetailsBody = ({username}: Props) => {
  
  const [userDetails, setUserDetails] = useState<AdminSpecificUserType>();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await getUser(username);
        setUserDetails(result?.details);
        console.log(result)
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUserDetails();
    const intervalId = setInterval(fetchUserDetails, 10000);
    return () => clearInterval(intervalId);
  
  }, [username]);
  
  return (
    <div className='w-full flex flex-col gap-7 justify-start items-center pt-4 pl-1'>
      <div className='w-full flex gap-8 pl-3'>
        <div className='flex gap-2 items-center justify-center px-2 p-1 rounded-full bg-[#D0FFE3]'>
          <div className={`h-2 w-2 rounded-full ${userDetails?.status? "bg-green-500" : "bg-red-500"} mt-[0.1rem]`}></div>
          <p className='text-green-500 text-[0.83rem]'>{userDetails?.status?("Active"):("Restricted")}</p>
        </div>

        <div className='flex gap-2 items-center justify-center'>
          <p className='text-primary_font text-base'>Enforce FA</p>
          <Switch id={"user"} className='' checked={userDetails?.FA} />
        </div>

        <div className='flex gap-2 items-center justify-center'>
          <p className='text-[#AFAFAF] font-base text-base'>Last active</p>
          <p className='text-primary_font text-base'>{userDetails?.last_active}</p>
        </div>
      </div>

      <div className='w-full flex flex-col gap-4'>
        <div className='flex gap-3 h-5'>
          <Image src='/operations-icon.svg' width={20} height={20} alt="operation"/>
          <p className='text-[#7A7AFF] text-base font-medium leading-4'>General Operations</p>
        </div>

        <div className='flex gap-4 flex-wrap pl-1'>
          <Button className='button w-min px-5 flex gap-2 h-9 truncate font-normal rounded-lg hover:bg-[#628CE9]'>
            <Image src='/reset-pass-icon.svg' width={20} height={20} alt="edit" className="flip-image"/>
            Reset Password
          </Button>

          <DeleteUserModal user={userDetails}/>

          <RestrictUserModal user={userDetails}/>

          <Button className='button w-min px-5 flex gap-2 h-9 truncate font-normal rounded-lg bg-primary_font_2 hover:bg-[#A0A0FF]'>
            <Image src='/storage-icon.svg' width={20} height={20} alt="edit" className="flip-image"/>
            Manage Storage
          </Button>
          <Button className='button w-min px-5 flex gap-2 h-9 truncate font-normal rounded-lg bg-[#3ABA6E] hover:bg-[#51C580]'>
            <Image src='/download-icon-2-white.svg' width={16} height={16} alt="edit" className="flip-image"/>
            Download Logs
          </Button>
        </div>

        <div className='w-full flex flex-col gap-5 mt-3'>
          <div className='flex gap-3 h-5'>
            <Image src='/data-icon.svg' width={18} height={18} alt="operation"/>
            <p className='text-[#7A7AFF] text-base font-medium leading-4'>User Analytics</p>
          </div>

          <div className='flex w-full h-[11rem] gap-5'>
            <UserLinkAnaltics userDetailsLink={userDetails?.links} />

            <UserStorageAnalytics userDetailsStorage={userDetails?.storage} />
          </div>

          <UserGroups />

          <UserDrives />
        </div>
      </div>
    </div>
  )
}

export default UserDetailsBody
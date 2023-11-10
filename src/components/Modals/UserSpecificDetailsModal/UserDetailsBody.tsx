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
import AllowUserModal from './ActionsModals/AllowUserModal'
import UserMakeAdminModal from './ActionsModals/UserMakeAdminModal'
import BotLeftAlert from '@/components/BotLeftAlert'
import editUser from '@/utils/api/editUserAPI'
import { UserDetailsStore } from '@/utils/store/userDetailsStore'

type Props = {
  username: AdminUsersType['username']
}

const UserDetailsBody = ({username}: Props) => {
  const [userDetails, setUserDetails] = useState<AdminSpecificUserType>();
  const [update, setUpdate] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
  
  }, [username, update]);

  const handle2FASwitch = async () => {
      try {
        const result = await editUser(username, '2FA');
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
      <div className='w-full flex flex-col gap-7 justify-start items-center pt-4 pl-1'>
        <div className='w-full flex gap-8 pl-3'>
          <div className='flex gap-2 items-center justify-center px-2 p-1 rounded-full bg-[#D0FFE3]'>
            <div className={`h-2 w-2 rounded-full ${userDetails?.status? "bg-green-500" : "bg-red-500"} mt-[0.1rem]`}></div>
            <p className='text-green-500 text-[0.83rem]'>{userDetails?.status?("Active"):("Restricted")}</p>
          </div>

          <div className='flex gap-2 items-center justify-center'>
            <p className='text-primary_font text-base'>Enforce FA</p>
            <Switch id={"user"} className='' checked={userDetails?.FA} onClick={handle2FASwitch}/>
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

            {userDetails?.status ? (
              <RestrictUserModal user={userDetails}/>
            ) : (
              <AllowUserModal user={userDetails}/>
            )}

            {userDetails?.username !== UserDetailsStore.getState().userDetails?.username &&
              (
                <UserMakeAdminModal user={userDetails}/>
              )
            }

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
              <UserLinkAnaltics user={userDetails} />

              <UserStorageAnalytics user={userDetails} />
            </div>

            {(userDetails?.groups?.length || 0) > 0 && 
              <UserGroups userDetailsGroups={userDetails?.groups}/>
            }

            <UserDrives userDetailsServers={userDetails?.servers}/>
          </div>
        </div>
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

export default UserDetailsBody
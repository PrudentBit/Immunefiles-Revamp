import React from 'react'
import Image from 'next/image'
import set2FA from '@/utils/api/user2FASetAPI'
import AddUserModal from '@/components/Modals/AddUserModal/AddUserModal'
import { toast } from 'sonner'

type Props = {
	selectedUsers: string[]
	setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  users: AdminUsersType[];
}

const AnalyticsNav = ({users, selectedUsers, setSelectedUsers, searchTerm, setSearchTerm, setUpdate}: Props) => {
  const allUsers2FA = users?.every(user => user.FA);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

  const handle2FASwitch = async () => {
    try {
      const result = await set2FA(selectedUsers);
      if (result.success) {
        setUpdate(prevState => !prevState);
        toast.success(result.data.message);
        setSelectedUsers([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAll2FASwitch = async () => {
    try {
      const allUsernames = users.map(user => user.username);
      
      const result = await set2FA(allUsernames);
      if (result.success) {
        setUpdate(prevState => !prevState);
        toast.success(result.data.message);
        setSelectedUsers([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='flex justify-between'>
        <div className='flex gap-3 p-2'>
          <Image src="/analytics-icon.svg" alt='user icon' width={35} height={35}/>
          <p className='text-primary_font text-md font-medium leading-4'>User Analytics</p>
        </div>

        {selectedUsers.length > 0 ? (
          <div className='flex gap-6'>
            <div 
              className="h-9 p-3 rounded-md bg-primary_font text-white font-normal flex items-center justify-center gap-2 cursor-pointer" 
              onClick={handle2FASwitch}
              title='Enable 2FA for selected users'
            >
              <Image src="/double-lock.svg" alt='2fa' width={20} height={20}/>
              Enable 2FA
            </div>

            <div 
              className="h-9 p-3 rounded-md bg-[#3ABA6E] text-white font-normal flex items-center justify-center gap-2 cursor-pointer" 
              title='Download logs of selected users'
            >
              <Image src="/download-icon-2-white.svg" alt='2fa' width={14} height={14}/>
              Download logs
            </div>

            <div className='flex gap-3 items-center'>
              {selectedUsers.length} selected
              <button className='rounded-full bg-[#F0F0F0] hover:bg-[#DADADA] flex justify-center items-center h-8 w-8' onClick={()=>{setSelectedUsers([])}}>
                <Image src='/cross-icon.svg' width={12} height={12} alt='Cross icon'/>
              </button>
            </div>
          </div>
        ):(
          <>
            <div className='flex gap-4 '>
              <div 
                className={`h-9 w-9 rounded-md ${allUsers2FA ? ("bg-[#FFE3E5]") : ("bg-bg_hover")} flex items-center justify-center cursor-pointer ${allUsers2FA ? ("hover:bg-[#f7d7d9]") : ("hover:bg-[#D5D5FB]")}`} 
                onClick={handleAll2FASwitch}
              >
                {allUsers2FA ? (
                  <Image title='Turn off 2FA for all users' src="/2fa-text-red.svg" alt='2fa' width={32} height={32}/>
                ) : (
                  <Image title='Turn on 2FA for all users' src="/2fa-text.svg" alt='2fa' width={32} height={32}/>
                )}
              </div>

              <div title='Download logs of all users' className='h-9 w-9 rounded-md bg-[#D0FFE3] flex justify-center items-center cursor-pointer hover:bg-[#A8FFCB]'>
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="ic:outline-file-download">
                    <path  fill="#3ABA6E" id="Vector" d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z"/>
                  </g>
                </svg>
              </div>

              <AddUserModal />

              <form action="" className='flex items-center gap-4 h-full px-3 rounded-md justify-between bg-[#F0F0F0]'>
                <button>
                    <Image src="/search.png" alt='search' width={25} height={25}/>
                </button>
                <input 
                  type="text" 
                  placeholder='Search users..' 
                  className='h-full w-full bg-transparent' 
                  value={searchTerm} 
                  onChange={handleSearchChange}
                />
              </form>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default AnalyticsNav
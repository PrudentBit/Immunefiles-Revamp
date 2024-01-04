import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
		AlertDialogOverlay,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import editUser from '@/utils/api/editUserAPI'
import { toast } from 'sonner'

type Props = {
	user?: AdminSpecificUserType
}

const UserMakeAdminModal = ({user}: Props) => {
  const handleAdminCreation = async () => {
    if(user){
      try {
        const result = await editUser(user.username, 'admin');
        if (result.status === 200) {
          toast.success(result.data.message);
        }
        else {
          toast.error(result.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
					<Button className='button w-min px-5 flex gap-2 h-9 truncate font-normal rounded-lg bg-primary_font_2 hover:bg-[#A0A0FF]'>
            <Image src='/admin-icon.svg' width={18} height={18} alt="edit" className="flip-image"/>
            {user?.is_admin ? "Remove admin" : "Make admin"}
          </Button>
        </AlertDialogTrigger>
				<AlertDialogOverlay className='backdrop-blur-[0px]'/>
        <AlertDialogContent className='translate-y-[-160%]'>
          <AlertDialogHeader className='flex flex-row items-center gap-3'>
            <div className='rounded-full w-10 h-10 flex items-center justify-center bg-[#E5EDFF]'>
							<Image src='/admin-icon-2.svg' width={18} height={18}  alt='allow'/>
						</div>
            <div className="flex flex-col h-full">
              <AlertDialogTitle className='font-medium text-md'>{user?.is_admin ? "Do you want to remove this user as admin?":"Do you want to make this user an admin?"}</AlertDialogTitle>
              <AlertDialogDescription className='text-xs'>
								{user?.is_admin ? "This user will no longer have admin privileges.":"This user will have all the privileges of an admin."}
              </AlertDialogDescription>
            </div>  
          </AlertDialogHeader>
					<AlertDialogDescription className='text-xs text-[#979797]'>
						<div className='flex gap-4 pl-1 w-full h-[3.15rem]'>
							<Image src="/user.svg" alt='profile' width={50} height={50} className='rounded-full'/>
							<div className='w-full h-full flex flex-col gap-1 justify-center'>
								<p className='text-primary_font text-lg font-medium leading-5'>{user?.name}</p>
								<p className='text-black text-sm font-normal leading-4'>{user?.email}</p>
							</div>
						</div>
					</AlertDialogDescription>
          <AlertDialogFooter className='flex gap-4'>
            <AlertDialogAction className='w-[50%] rounded-full bg-primary_font text-white hover:bg-[#628CE9]' onClick={handleAdminCreation}>
              {user?.is_admin ? "Remove admin" : "Make admin"}
            </AlertDialogAction>
            <AlertDialogCancel className='w-[50%] rounded-full hover:bg-[#D2D4DA] hover:text-black'>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default UserMakeAdminModal
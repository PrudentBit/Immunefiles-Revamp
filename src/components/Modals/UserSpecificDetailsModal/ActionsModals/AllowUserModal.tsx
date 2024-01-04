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

const AllowUserModal = ({user}: Props) => {

  const handleUnRestrict = async () => {
    if(user){
      try {
        const result = await editUser(user.username, 'restrict');
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
					<Button className='button w-min px-5 flex gap-2 h-9 truncate font-normal rounded-lg bg-[#3ABA6E] hover:bg-[#51C580]'>
            <Image src='/allow-user-icon.svg' width={20} height={20} alt="edit" className="flip-image"/>
            Allow Sign-in
          </Button>
        </AlertDialogTrigger>
				<AlertDialogOverlay className='backdrop-blur-[0px]'/>
        <AlertDialogContent className='translate-y-[-160%]'>
          <AlertDialogHeader className='flex flex-row items-center gap-3'>
            <div className='rounded-full w-10 h-10 flex items-center justify-center bg-[#D5FFE6]'>
							<Image src='/open-lock.svg' width={18} height={18}  alt='allow'/>
						</div>
            <div className="flex flex-col h-full">
              <AlertDialogTitle className='font-medium text-md'>Do you want to allow this user to login?</AlertDialogTitle>
              <AlertDialogDescription className='text-xs'>
                User will now be able to login into immunefiles.
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
            <AlertDialogAction className='w-[50%] rounded-full text-white bg-primary_font hover:bg-[#628CE9]' onClick={handleUnRestrict}>Allow login</AlertDialogAction>
            <AlertDialogCancel className='w-[50%] rounded-full hover:bg-[#D2D4DA] hover:text-black'>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
	)
}
export default AllowUserModal
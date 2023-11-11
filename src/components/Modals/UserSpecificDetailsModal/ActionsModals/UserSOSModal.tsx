import React, {useState} from 'react'
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
import BotLeftAlert from '@/components/BotLeftAlert'
import editUser from '@/utils/api/editUserAPI'

type Props = {
	user?: AdminSpecificUserType
}

const UserSOSModal = ({user}: Props) => {
	
	const [sosAppliedSuccessfully, setSosAppliedSuccessfully] = useState(false);

  const handleSOS = async () => {
    if(user){
			try {
				const result = await editUser(user.username, 'sos');
				if (result.success) {
					setSosAppliedSuccessfully(true);
				}
			} catch (error) {
				console.error(error);
			}
		}
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
					<Button variant='destructive' className='w-full h-8 bg-transparent mt-3 z-[100] text-red-400 border-[1px] border-solid border-red-400 hover:text-white'>
						Apply SOS for user
					</Button>
        </AlertDialogTrigger>
				<AlertDialogOverlay className='backdrop-blur-[0px]'/>
        <AlertDialogContent className='translate-y-[-160%]'>
          <AlertDialogHeader className='flex flex-row items-center gap-3'>
            <div className='rounded-full w-10 h-10 flex items-center justify-center bg-[#FFEBEB]'>
							<Image src="/warning-icon.svg" width={18} height={18}  alt='restrict'/>
						</div>
            <div className="flex flex-col h-full">
              <AlertDialogTitle className='font-medium text-md'>Do you want to expire all links by this user?</AlertDialogTitle>
              <AlertDialogDescription className='text-xs'>
								Only apply SOS when you find suspicious activity. 
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
            <AlertDialogAction className='w-[50%] rounded-full bg-[#FF6161] text-white hover:bg-[#FF7F7F]' onClick={handleSOS}>Apply SOS</AlertDialogAction>
            <AlertDialogCancel className='w-[50%] rounded-full hover:bg-[#D2D4DA] hover:text-black'>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {sosAppliedSuccessfully &&
        <BotLeftAlert image='/delete-icon.svg' imagebg='bg-[#FFE3E5]'>
          <div className='flex flex-col items-start text-left leading-[0.2rem] gap-[0.35rem]'>
            <p className='text-[#FF6161] font-semibold text-base leading-4  '>SOS applied successfully</p>
            <p className='text-[#979797] font-[400] text-sm leading-[1.1rem]'>All links by this user have been expired.</p>
          </div>
        </BotLeftAlert>
      }
    </>
  )
}

export default UserSOSModal
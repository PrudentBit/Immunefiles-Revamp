import {useState, useEffect} from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
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

const AddUserStorageModal = ({user}: Props) => {
  const [visualTotalStorage, setVisualTotalStorage] = useState(parseInt(user?.storage.total_storage || "0"));
  const [storageIncreased, setStorageIncreased] = useState(false);

  const handleAddStorage = () => {
    setVisualTotalStorage(prevStorage => prevStorage + 1);
  };

  useEffect(() => {
    setVisualTotalStorage(parseInt(user?.storage.total_storage || "0"));
  }, [user]);

  const handleSave = async () => {
    if(user){
      try {
        const result = await editUser(user.username, 'add_extra', (visualTotalStorage - parseInt(user?.storage.total_storage || "0")));
        if (result.success) {
          setStorageIncreased(true);
          setTimeout(() => setStorageIncreased(false), 5000);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="col-span-1 row-span-1 text-[0.8rem] w-min px-3 flex gap-2 h-8 truncate font-normal rounded-lg hover:bg-[#628CE9]">
            Add Storage
          </Button>
        </AlertDialogTrigger>
				<AlertDialogOverlay className='backdrop-blur-[0px]'/>
        <AlertDialogContent className='translate-y-[-160%]'>
          <AlertDialogHeader className='flex flex-row justify-between gap-[6.5rem]'>
            <div className='flex gap-3 items-center'>
              <div className='rounded-full w-10 h-10 flex items-center justify-center bg-[#E5EDFF]'>
                <Image src="lock-icon.svg" width={18} height={18}  alt='manage'/>
              </div>  
              <p className='text-black font-semibold text-base'>Manage Storage</p>
            </div>
          </AlertDialogHeader>
					<AlertDialogDescription className='text-xs text-[#979797] flex flex-col gap-4 pl-2'>
            <div className='flex justify-between items-center'>
              <div className='h-8 flex gap-2 items-center'>
                <p className='text-black font-medium text-sm leading-6'>Storage details: </p>
                <p className='text-primary_font font-medium text-sm leading-6'> {user?.storage.storage_used} /</p>
                <p className='p-[0.15rem] px-3 rounded-md text-center leading-8 bg-[#D1DFFF] text-primary_font text-sm font-medium'>{visualTotalStorage} GB</p>
              </div>

              <button className='p-1 px-2 rounded-md text-center leading-6 bg-[#D1DFFF] text-primary_font_2 text-sm font-medium' onClick={handleAddStorage}>+1 GB</button>
            </div>

            <p>*you can only add storage upto <span className='text-xs font-medium'>-- GB</span></p>
					</AlertDialogDescription>
          <AlertDialogFooter className='flex gap-4'>
            <AlertDialogAction className='w-[50%] rounded-full text-white bg-primary_font hover:bg-[#628CE9]' onClick={handleSave}>Save</AlertDialogAction>
            <AlertDialogCancel className='w-[50%] rounded-full hover:bg-[#D2D4DA] hover:text-black'>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {storageIncreased &&
        <BotLeftAlert image='/delete-icon.svg' imagebg='bg-[#FFE3E5]'>
          <div className='flex flex-col items-start text-left leading-[0.2rem] gap-[0.35rem]'>
            <p className='text-[#FF6161] font-semibold text-base leading-4  '>User storage increased to {visualTotalStorage}</p>
            <p className='text-[#979797] font-[400] text-sm leading-[1.1rem]'>The user will now be able to utilize {visualTotalStorage}GB.</p>
          </div>
        </BotLeftAlert>
      }
    </>
  )
}

export default AddUserStorageModal
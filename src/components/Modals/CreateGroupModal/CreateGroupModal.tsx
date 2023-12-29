import {useState} from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogTrigger,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog"

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import GroupDetails from './GroupDetails'
import AddedMembers from './AddedMembers'
import createGroup from '@/utils/api/createGroupAPI'

const CreateGroupModal = () => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [members, setMembers] = useState<userSearchQueryType[]>([])

  const handleSaveAndCreate = async () => {
    try {
      const memberEmails = members.map(member => member.email);
      const response = await createGroup(name, description, memberEmails);
    } catch (error) {
      console.error('Error creating group:', error);
    }

    setName('');
    setDescription('');
    setMembers([]);
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setName('');
    setDescription('');
    setMembers([]);
    e.stopPropagation();
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-white text-primary_font rounded-md border border-solid border-primary_font flex gap-2 p-[1.1rem] h-8 font-normal text-xs">
            <Image src="/add-group-icon.svg" width={20} height={20} alt='add groups'/>
            <p className='text-sm'>Create Group</p>
          </Button>
        </AlertDialogTrigger>
				<AlertDialogOverlay className='backdrop-blur-[0px]'/>
        <AlertDialogContent className='w-[40rem] pb-4'>
          <AlertDialogHeader className='flex flex-row justify-between gap-[6.5rem]'>
            <div className='flex gap-3 items-center'>
              <div className='rounded-full w-10 h-10 flex items-center justify-center bg-[#E5EDFF]'>
                <Image src="groups-icon.svg" width={20} height={20}  alt='manage'/>
              </div>  
              <p className='text-black font-semibold text-base'>Create Group</p>
            </div>

            <AlertDialogCancel className='w-9 h-9 p-[0.6rem] rounded-full bg-[#E5EDFF] mt-0' onClick={(e)=>handleClose(e)}>
              <Image src="/cross-icon-blue.svg" width={20} height={20} className='rounded-full' alt='close icon'/>
            </AlertDialogCancel>
          </AlertDialogHeader>

          <AlertDialogDescription className='flex gap-6 h-[22rem]'>
            <GroupDetails name={name} setName={setName} description={description} setDescription={setDescription} members={members} setMembers={setMembers}/>

            <AddedMembers members={members} setMembers={setMembers}/>
          </AlertDialogDescription>

          <AlertDialogFooter className='flex justify-end'>
            <AlertDialogAction 
              className='rounded-full px-10 text-white font-medium bg-primary_font hover:text-primary_font border-2 border-solid border-primary_font'
              onClick={handleSaveAndCreate}
              disabled={name.length === 0 || description.length === 0 || members.length === 0}
            >
              Save and create
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default CreateGroupModal

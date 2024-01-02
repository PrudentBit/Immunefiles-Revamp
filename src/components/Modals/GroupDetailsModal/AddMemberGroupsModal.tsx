"use client"

import { useState, useEffect } from 'react';
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
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import getEmailSearchQuery from '@/utils/api/getEmailSearchQueryAPI';

type Props = {
  group: GroupDetailsType
}

const AddMemberGroupsModal = ({ group }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<userSearchQueryType[]>([]);
  const [value, setValue] = useState('');
  const [members, setMembers] = useState<userSearchQueryType[]>([]);

  const getUsers = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);

    if (query.length > 0) {
      try {
        const result = await getEmailSearchQuery(query);
        console.log(result);
        setSearchResults(result);
      } catch (error) {
        console.error('Error fetching user search:', error);
      }
    }
  };

  const addUserToMembers = (user: userSearchQueryType) => {
    const isUserInMembers = members.some((member) => member.email === user.email);

    if (!isUserInMembers) {
      setMembers((prevMembers) => [...prevMembers, user]);
    }

    setIsOpen(false);
    setValue('');
  };

  const removeMember = (index: number) => {
    setMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      updatedMembers.splice(index, 1);
      return updatedMembers;
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-white text-primary_font_2 rounded-md border-2 border-solid border-primary_font_2 flex gap-2 px-3 py-[1.1rem] h-8 font-normal text-xs hover:bg-[#D5D5FB]">
          <Image src="/add-user-2.svg" width={20} height={20} alt='add groups'/>
          <p className='text-sm font-medium'>Add members</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[40rem]'>
        <AlertDialogHeader className='flex flex-row justify-between h-10'>
          <div className="flex gap-3">
            <div className='flex justify-center items-center rounded-full w-10 h-10 bg-primary_bg'>
              <Image src="/details-icon-2.svg" width={20} height={20}  alt='details icon'/>
            </div>
            <AlertDialogTitle className='font-semibold text-lg text-black pt-[0.3rem]'>Add members</AlertDialogTitle>
          </div>
          <AlertDialogCancel className='w-9 h-9 p-[0.6rem] rounded-full bg-[#F0F0F0] mt-0' onClick={(e) => e.stopPropagation()}>
            <Image src="/cross-icon.svg" width={20} height={20} className='rounded-full ' alt='close icon'/>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription className='h-[22rem] flex flex-col gap-4 px-2'>
          <div className='max-h-[10rem] min-h-[7rem] w-full flex flex-wrap gap-2 overflow-auto p-4 rounded-xl border-2 border-solid border-[#D5D5FB]'>
            {members.map((member, index) => (
              <div key={index} className='w-[10rem] h-8 flex items-center gap-3 rounded-full px-3 bg-[#E5EDFF]'>
                <Image src='/user-icon.svg' width={14} height={14} alt="user"/>
                <p className='text-primary_font text-sm mb-1 w-[75%] truncate'>{member.name}</p>
                <button
                  title="Remove"
                  className="rounded-full p-[0.4rem] bg-[#FFE3E5]  hover:bg-[#FFCDD0]"
                  onClick={() => removeMember(index)}
                >
                  <Image
                    src="/close-icon-3.svg"
                    width={8}
                    height={8}
                    alt="Delete icon"
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="w-full flex gap-2 items-center pr-3 text-secondary_font bg-[#E5EDFF] rounded-sm border-solid border border-[#E5EDFF] focus:border-[#C8D9FF]">
            <input
              type="text"
              className="p-2 px-5 w-full text-secondary_font bg-[#E5EDFF] placeholder:text-gray-400 rounded-sm"
              autoComplete="off"
              id='email'
              title='Enter email'
              onFocus={()=> setIsOpen(true)}
              onChange={(e)=> getUsers(e)}
              value={isOpen ? value : ''}
            />
          </div>

          {isOpen && (
            <div className='w-full h-[34%] shadow-[0px_2px_15px_0px_rgba(75,123,229,0.20)] flex flex-col rounded-lg overflow-auto'>
              {searchResults.map((user, index) => (
                <div key={index}>
                  <div 
                    className='flex gap-3 items-center py-[0.4rem] px-3 hover:bg-[#E5EDFF] rounded-lg cursor-pointer'
                    onClick={() => addUserToMembers(user)}
                    
                  >
                    <Avatar className='h-7 w-7'>
                      <AvatarImage src="" alt=""/>
                      <AvatarFallback className='bg-primary_font text-white font-semibold text-xl pb-1'>{user.name.split('')[0]}</AvatarFallback>
                    </Avatar>
                    <p className=' truncate text-primary_font'>{user.email}</p>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </AlertDialogDescription>
        <AlertDialogFooter className='flex items-center justify-end'>
          <AlertDialogAction 
            className="w-[30%] rounded-full bg-primary_font text-white hover:bg-[#9F9FFF]" 
          >
            Save & continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AddMemberGroupsModal
import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import Image from 'next/image';
import getEmailSearchQuery from '@/utils/api/getEmailSearchQueryAPI';

type Props = {
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  description: string,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  members: userSearchQueryType[],
  setMembers: React.Dispatch<React.SetStateAction<userSearchQueryType[]>>,
}

const GroupDetails = ({name, setName, description, setDescription, members, setMembers}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<userSearchQueryType[]>([]);
  const [value, setValue] = React.useState('');

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

  return (
    <div className='h-full w-[50%] flex flex-col gap-4'>
      <input
        type="text"
        className="p-2 px-5 w-full text-secondary_font bg-[#E5EDFF] placeholder:text-gray-400 rounded-sm border-solid border border-[#E5EDFF] focus:border-[#C8D9FF]"
        placeholder="Enter group name"
        autoComplete="off"
        id='name'
        title='Group Name'
        onChange={(e)=> setName(e.target.value)}
      />

      <textarea
        className="p-2 px-5 min-h-[4.5rem] w-full text-secondary_font bg-[#E5EDFF] placeholder:text-gray-400 rounded-sm border-solid border border-[#E5EDFF] focus:border-[#C8D9FF] focus:outline-none"
        placeholder="Enter group description"
        autoComplete="off"
        id='description'
        title='Group Description'
        onChange={(e)=> setDescription(e.target.value)}
      />

      <div className='flex gap-3 h-5'>
        <Image src='/user-icon-2.svg' width={12} height={12} alt="user"/>
        <p className='text-[#7A7AFF] text-base  leading-5'>Add members</p>
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
    </div>
  )
}

export default GroupDetails
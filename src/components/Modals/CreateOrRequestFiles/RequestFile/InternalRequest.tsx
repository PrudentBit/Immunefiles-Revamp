import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getEmailSearchQuery from '@/utils/api/getEmailSearchQueryAPI';

type Request = {
  id: string;
  fileName: string[];
  email: string;
  requestType: string;
};

type Props = {
  request: Request;
  setRequest: (_value: Request) => void;
  setRequestType: (value: 'internal' | 'external' | 'none') => void;
};

const InternalRequest = ({
  request,
  setRequest,
  setRequestType,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<userSearchQueryType[]>([]);
  const [value, setValue] = useState('');
  const [fileName, setFileName] = useState('');

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

  const handleFileNameChange = (fileName: string) => {
    setRequest({...request, fileName: [fileName]});
  };

  return (
    <div className='h-full w-full flex flex-col gap-4'>
      <div className="flex gap-4 items-center">
        <div 
          className="h-7 w-7 flex items-center justify-center cursor-pointer rounded-md border border-solid border-[#D5D5FB]"
          onClick={()=> setRequestType('none')}
        >
          <Image src='/left-arrow-2.svg' width={18} height={18} alt='back' />
        </div>
        <div className="flex gap-2 items-center">
          <Image src='/exit-icon.svg' width={20} height={20} alt='Internal' />
          <p>Internal Request</p>
        </div>
      </div>

      <input
        type="text"
        className={`h-[2.5rem] p-2 px-5 w-full text-secondary_font bg-[#E5EDFF] placeholder:text-gray-400 rounded-sm border border-solid`}
        autoComplete="off"
        placeholder="Email ID"
        id='email'
        title='Enter email'
        onFocus={()=> setIsOpen(true)}
        onChange={(e)=> getUsers(e)}
        value={value}
      />
      {isOpen && (
        <div className='w-full h-[5rem] shadow-[0px_2px_15px_0px_rgba(75,123,229,0.20)] flex flex-col rounded-lg overflow-auto'>
          {searchResults.map((user, index) => (
            <div key={index}>
              <div 
                className='flex gap-3 items-center py-[0.4rem] px-3 hover:bg-[#E5EDFF] rounded-lg cursor-pointer'
                onClick={() => {setValue(user.email); setRequest({...request, email: user.email}); setIsOpen(false)}}
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

      <div className="w-full min-h-[2.5rem] flex gap-4 items-center px-2 bg-[#E5EDFF] rounded-md">
        <Image src='/file-icon-3.svg' width={20} height={20} alt='file' />
        <input 
          type="text"
          className="px-1 w-full text-secondary_font bg-[#E5EDFF] placeholder:text-gray-400 rounded-sm border border-solid border-[#E5EDFF]"
          autoComplete="off"
          placeholder="File Name"
          title='Enter file name'
          onChange={(e) => handleFileNameChange(e.target.value)}
          value={request.fileName[0]}
        />
      </div>

    </div>
  )
}

export default InternalRequest
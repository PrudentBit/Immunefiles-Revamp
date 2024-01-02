import React from 'react';
import Image from 'next/image';

type Props = {
  members: userSearchQueryType[],
  setMembers: React.Dispatch<React.SetStateAction<userSearchQueryType[]>>,
}

const AddedMembers = ({ members, setMembers }: Props) => {
  const removeMember = (index: number) => {
    setMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      updatedMembers.splice(index, 1);
      return updatedMembers;
    });
  };

  return (
    <div className='h-full w-[50%] flex flex-col gap-2'>
      <div className='flex gap-3 h-5'>
        <Image src='/user-icon-2.svg' width={14} height={14} alt="user"/>
        <p className='text-[#7A7AFF] text-base  leading-4'>View members</p>
      </div>  
      <div className='h-full w-full flex flex-col gap-2 overflow-auto p-4 rounded-xl border-2 border-solid border-[#D5D5FB]'>
        {members.map((member, index) => (
          <div key={index} className='w-full h-8 flex items-center gap-3 rounded-full px-3 bg-[#E5EDFF]'>
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
    </div>
  );
};

export default AddedMembers;

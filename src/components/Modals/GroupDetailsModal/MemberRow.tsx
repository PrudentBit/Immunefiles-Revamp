import React from 'react'
import Image from 'next/image'
import editGroup from '@/utils/api/editGroupAPI'
import { decryptData } from '@/utils/helper/decryptFiles'
import { GroupStore } from '@/utils/store/groupDetailsStore'

type Props = {
  member: MemberType
  group: GroupDetailsType
}

const MemberRow = ({ member, group }: Props) => {
  const { toggleForceRefresh } = GroupStore();

  const handleRemove = async () => {
    const response = await editGroup({action: "remove", group_hash: group.group_hash, email: member.email});
    if (response.status === 200) {
      console.log("Member removed");
      toggleForceRefresh();
    }
    else{
      console.log(decryptData(response.data.ciphertext));
    }
  }

  return (
    <div className="min-h-[3rem] w-full flex items-center px-3 gap-2 justify-between bg-[#E5EDFF] rounded-lg">
      <Image src='/user-icon-2-blue.svg' width={24} height={24} alt="user"/>
      <p className="w-[40%] truncate text-primary_font text-base font-normal leading-4 ">{member.name}</p>

      {member.is_admin  ? (
        <div className="flex items-center gap-2 w-[26%]">
          <Image src='/admin-icon-4.svg' width={16} height={16} alt="admin"/>
          <p className="text-[#3ABA6E] text-sm font-normal leading-4">Admin</p>
        </div>
      ) : (
        <div className=" w-[26%]"> </div>
      )}

      {!member.is_admin ? (
        <button 
          className="flex items-center justify-center gap-2 w-[12%] py-1 hover:bg-[#FFE3E5] rounded-lg"
          onClick={handleRemove}
        >
          <p className="text-red-400 text-sm font-normal leading-4">Remove</p>
        </button>
      ):(
        <div className='w-[12%]'></div>
      )}

      {member.is_admin ? (
        <div className="flex items-center justify-center gap-2 w-[12%] py-1 rounded-xl bg-[#D0FFE3] border border-solid border-[#3ABA6E]">
          <Image src='/admin-icon-4.svg' width={16} height={16} alt="owner"/>
          <p className="text-[#3ABA6E] text-sm font-normal leading-4">Owner</p>
        </div>
      ):(
        <div className='w-[12%] flex items-center justify-center gap-1'>
          <p className="text-primary_font_2 text-sm font-normal leading-4">Admin</p>
          <Image src='/down-arrow-2.svg' width={16} height={16} alt="down"/>
        </div>
      )}
    </div>
  )
}

export default MemberRow
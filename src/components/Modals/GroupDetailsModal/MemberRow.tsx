import React from 'react'
import Image from 'next/image'

type Props = {
  member: MemberType
}

const MemberRow = ({ member }: Props) => {
  return (
    <div className="min-h-[3rem] w-full flex items-center px-3 gap-2 justify-between bg-[#E5EDFF] rounded-lg">
      <Image src='/user-icon-2-blue.svg' width={24} height={24} alt="user"/>
      <p className="w-[40%] truncate text-primary_font text-base font-normal leading-4 ">{member.username}</p>

      {member.is_admin && !member.is_owner ? (
        <div className="flex items-center gap-2 w-[26%]">
          <Image src='/admin-icon-4.svg' width={16} height={16} alt="admin"/>
          <p className="text-[#3ABA6E] text-sm font-normal leading-4">Admin</p>
        </div>
      ) : (
        <div className=" w-[26%]"> </div>
      )}

      {!member.is_owner ? (
        <div className="flex items-center justify-center gap-2 w-[12%] py-1">
          <p className="text-red-400 text-sm font-normal leading-4">Remove</p>
        </div>
      ):(
        <div className='w-[12%]'></div>
      )}

      {member.is_owner ? (
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
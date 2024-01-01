import Image from "next/image";
import MemberRow from "./MemberRow";

type Props = {
  group: GroupDetailsType;
};

const GroupMembers = ({ group }: Props) => {
  return (
    <div className="flex flex-col gap-3 h-[50%] w-full">
      <div className="flex gap-4 justify-between items-center">
        <div className='flex gap-3 h-5'>
          <Image src='/groups-icon-5.svg' width={24} height={24} alt="group"/>
          <p className='text-[#7A7AFF] text-[1.05rem] leading-5'>Members</p>
        </div >  
        <div className='flex gap-1 h-5'>
          <p className='text-gray-900 text-base  leading-5'>{group.members.length} Members</p>
        </div>  
      </div>

      <div className="h-[11.2rem] w-full border border-solid border-primary_font_2 rounded-lg p-3">
        <div className="h-[9.7rem] pr-3 overflow-auto flex flex-col gap-4">
          {group.members.map((member, index) => (
            <MemberRow key={index} member={member} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GroupMembers
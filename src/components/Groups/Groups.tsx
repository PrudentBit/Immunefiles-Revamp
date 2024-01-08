import {useState} from 'react'
import Image from 'next/image'
import GroupDetailsModal from '../Modals/GroupDetailsModal/GroupDetailsModal'
import { useRouter } from 'next/navigation';
import { GroupStore } from '@/utils/store/groupDetailsStore';
import favouriteGroup from '@/utils/api/favouriteGroupsAPI';
import {toast} from 'sonner'

type Props = {
  group: GroupDetailsType
}

const Groups = ({group}:Props) => {
  const [isHovering, setIsHovering] = useState(false)
  const {toggleForceRefresh} = GroupStore()

  const router = useRouter();
  const handleOpenGroup = () => {
    router.push(`/groups/${group.group_hash}/root`);
  }

  const handleToggleFavorite = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const response = await favouriteGroup(group.group_hash);
    if (response.status === 200) {
      toggleForceRefresh();
      toast.success('Group unpinned successfully');
    }
    else {
      toast.error('Something went wrong');
    }
  }

  return (
    <div 
      className='h-[3.8rem] w-[16rem] flex justify-between items-center gap-2 p-3 rounded-lg bg-primary_bg hover:bg-[#E5E5FF] cursor-pointer'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleOpenGroup}
    >
      <Image src='/groups-icon-4.svg' width={30} height={30} alt='Groups'/>
      
      <div className='flex flex-col items-start justify-center w-[60%] h-[2.5rem]'>
        <p className='text-[#7A7AFF] font-semibold text-[1rem] leading-6 truncate w-[100%]'>{group.name}</p>
        {isHovering && <p className='text-[#7A7AFF] font-normal text-[0.9rem] leading-5'>{group.members.length} members</p>}
      </div>

      <GroupDetailsModal group={group}/>

      {group.is_favorite && (
        <div onClick={(e)=>handleToggleFavorite(e)} className='absolute translate-x-[14.3rem] translate-y-[-1.5rem] cursor-pointer rounded-full h-6 w-6 flex items-center justify-center hover:bg-[#4b8be5] bg-primary_font'>
          <Image src='/pin-icon-solid.svg' width={16} height={16} alt='pinned' className='mb-[0.2rem] ml-[0.2rem]'/>
        </div>
      )}
    </div>
  )
}

export default Groups
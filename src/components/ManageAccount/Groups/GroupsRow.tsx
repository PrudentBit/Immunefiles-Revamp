import Image from 'next/image'
import DeleteGroupAlert from '@/components/Alerts/DeleteGroupAlert';
import favouriteGroup from '@/utils/api/favouriteGroupsAPI';
import { toast } from 'sonner';
import { UserDetailsStore } from '@/utils/store/userDetailsStore';

type Props = {
  group: GroupDetailsType;
  selectedGroups: string[];
  setSelectedGroups: React.Dispatch<React.SetStateAction<string[]>>;
}

const GroupsRow = ({group, selectedGroups, setSelectedGroups}: Props) => {
  const { userDetails } = UserDetailsStore();

  const handleSelect = () => {
    if (selectedGroups.includes(group.group_hash)) {
      setSelectedGroups(selectedGroups.filter((item) => item !== group.group_hash));
    } else {
      setSelectedGroups([...selectedGroups, group.group_hash]);
    }
  }

  const handleFavorite = async () => {
    const response = await favouriteGroup(group.group_hash);
    if (response.status === 200) {
      toast.success('Group pinned/unpinned successfully');
    } else {
      toast.error('Failed to pin group',{
        description: response.data.message
      });
    }
  }

  return (
    <div className='h-[3.8rem] w-full rounded-xl flex items-center justify-between p-4 pr-8 pl-6 gap-7 bg-primary_bg'>
      <div className='flex gap-4 items-center w-[50%]'>
        <button onClick={handleSelect} className='w-6 h-[1.43rem] bg-[#DADAFF] rounded-sm'>
          {selectedGroups.includes(group.group_hash) ? (
            <Image src="/checked-icon-white.svg" alt='check' width={24} height={24}/>
          ):(
            <Image src="/not-checked-icon-white.svg" alt='uncheck' width={24} height={24}/>
          )}
        </button>
        <div className='flex gap-2'>
          <Image src="/groups-icon.svg" alt='group' width={22} height={22}/>
          <p className='text-[#7A7AFF] text-lg font-medium leading-5 truncate w-[30rem]'>{group.name}</p>
        </div>
      </div>

      <div className='flex gap-6 items-center'>
        <button title='Pin' onClick={handleFavorite} className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#ABC5FF] bg-white hover:bg-[#DEE8FF]'>
          <Image src='/pin-icon.svg' width={15} height={15} alt='Pin icon'/>
        </button>
        <button title='Download' className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#3ABA6E] bg-white hover:bg-[#E1FFED]'>
          <Image src='/download-icon-green.svg' width={18} height={18} alt='Download icon'/>
        </button>
        {group.owner === userDetails?.name && (
          <DeleteGroupAlert type='manageGroups' groupHash={group.group_hash}/>
        )}
        <button title='Manage' className='flex items-center justify-center rounded-lg h-8 w-20 border border-[#8E8EFF] bg-white hover:bg-[#EAEAFF]'>
          <p className='text-[#8E8EFF]'> Manage </p>
        </button>
      </div>
    </div>
  )
}

export default GroupsRow
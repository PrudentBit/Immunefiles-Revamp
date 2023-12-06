import ShadowedCard from '@/components/ShadowedCard'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import UserFavGroupsRow from './UserFavGroupsRow'

const UserDashFavGroups = () => {
  return (
    <ShadowedCard className="w-[50%] h-full gap-3">
      <div className="flex h-[15%] justify-between items-start">
        <div className="flex items-center gap-3 h-5">
          <Image src="/groups-icon-2.svg" width={20} height={20} alt="groups" />
          <p className="text-[#7A7AFF] text-base font-medium leading-4">
            Favourite Groups
          </p>
        </div>

        <Button className="text-primary_font h-8 px-2 text-sm font-medium leading-4 bg-white border-solid border-[1px] border-primary_font rounded-full">
          Manage Groups
        </Button>
      </div>

      <div className='flex flex-col gap-3 h-[30vh] overflow-y-auto pr-5 pl-3'>
        <UserFavGroupsRow/>
        <UserFavGroupsRow/>
        <UserFavGroupsRow/>
        <UserFavGroupsRow/>
        <UserFavGroupsRow/>
        <UserFavGroupsRow/>
      </div>
    </ShadowedCard>
  );
};

export default UserDashFavGroups;

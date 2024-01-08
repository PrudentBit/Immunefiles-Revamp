"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image'
import Groups from './Groups';
import fetchGroupDetails from '@/utils/api/getGroupDetailsAPI';
import { GroupStore } from '@/utils/store/groupDetailsStore';
import GroupsSortBy from './GroupsSortBy';
import CreateGroupModal from '../Modals/CreateGroupModal/CreateGroupModal';
import { decryptData } from '@/utils/helper/decryptFiles';

const GroupsTab = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ _loading, setLoading ] = useState(true);
  const { groups, setGroups, forceRefresh } = GroupStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetchGroupDetails();

        if(response.status === 200) {
          const decryptedGroupData = decryptData(response.data.ciphertext);
          setGroups(decryptedGroupData.groups);
          console.log(decryptedGroupData.groups);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }

      setLoading(false);
    };

    fetchData();
  }, [forceRefresh]);

  return (
    <div className='h-full w-full flex flex-col gap-7'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-4 pt-2'>
          <CreateGroupModal/>
        </div>

        <div className='flex gap-4 pt-2'>
          <GroupsSortBy/>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div className="flex gap-2">
          <Image
            src="/groups-icon-blue.svg"
            width={24}
            height={24}
            alt="groups"
            className="ml-[2px]"
          />
          <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">As admin</p>
        </div>

        {groups && (
          <div className='flex flex-wrap gap-4 p-1'>
            {groups?.filter(group => group.is_admin).map(group => (
              <Groups key={group.group_hash} group={group}/>
            ))}
          </div>
        )}
      </div>

      <div className='flex flex-col gap-4'>
        <div className="flex gap-2">
          <Image
            src="/admin-icon-2.svg"
            width={24}
            height={24}
            alt="groups"
            className="ml-[2px]"
          />
          <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">As member</p>
        </div>

        {groups && (
          <div className='flex flex-wrap gap-4 p-1'>
            {groups?.filter(group => !group.is_admin).map(group => (
              <Groups key={group.group_hash} group={group}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GroupsTab
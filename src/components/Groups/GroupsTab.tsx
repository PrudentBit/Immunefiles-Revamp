"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image'
import DeleteGroupAlert from '../Alerts/DeleteGroupAlert';
import Groups from './Groups';
import fetchGroupDetails from '@/utils/api/getGroupDetailsAPI';
import { GroupStore } from '@/utils/store/groupDetailsStore';
import GroupsSortBy from './GroupsSortBy';

type Props = {}

const GroupsTab = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const { groups, setGroups } = GroupStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetchGroupDetails();

        if (!response.ok) {
          console.log(response);
        }

        const groupData = await response.json();
        setGroups(groupData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className='h-full w-full flex flex-col gap-7'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-4 pt-2'>
          <button title='Share' className='rounded-full h-10 w-10 flex items-center justify-center p-2 bg-[#E5EDFF]  hover:bg-bg_hover'>
            <Image src='/new-groups-icon.svg' width={24} height={24} alt='Link icon'/>
          </button>
          <button title='Delete' className='rounded-full h-10 w-10 flex items-center justify-center p-2 bg-[#FFE3E5]  hover:bg-[#FFCDD0]'>
            <DeleteGroupAlert/>
          </button>
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

        {groups && Array.isArray(groups) && (
          <div className='flex flex-wrap gap-4 p-1'>
            {groups.filter(group => group.admin).map(group => (
              <Groups key={group.urlhash} group={group}/>
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

        {groups && Array.isArray(groups) && (
          <div className='flex flex-wrap gap-4 p-1'>
            {groups.filter(group => !group.admin).map(group => (
              <Groups key={group.urlhash} group={group}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GroupsTab
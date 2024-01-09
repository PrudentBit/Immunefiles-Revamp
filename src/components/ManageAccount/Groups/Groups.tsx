"use client";

import React, { useEffect, useState } from 'react'
import GroupsTopNav from './GroupsTopNav';
import GroupsRow from './GroupsRow';
import fetchGroupDetails from '@/utils/api/getGroupDetailsAPI';
import { toast } from 'sonner';
import { GroupStore } from '@/utils/store/groupDetailsStore';
import { decryptData } from '@/utils/helper/decryptFiles';

const Groups = () => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const { groups, setGroups } = GroupStore();

  useEffect(() => {
    const getGroups = async () => {
      const response = await fetchGroupDetails('name','asc');
      const decryptedGroupData = decryptData(response.data.ciphertext);
      if (response.status === 200) {
        setGroups(decryptedGroupData.groups);
      } else {
        toast.error('Failed to fetch groups',{
          description: decryptedGroupData.message
        });
      }
    }
    getGroups();
  }, []);

  return (
    <div className='h-full flex flex-col gap-4 justify-between items-center'>
      <GroupsTopNav selected={selectedGroups} setSelected={setSelectedGroups} allSelected={allSelected} setAllSelected={setAllSelected}/>
      
      <div className='w-full h-[27rem] flex flex-col gap-4 mt-3 pr-2 overflow-auto'>
        {groups.length > 0 && groups.map((group, index) => (
          <GroupsRow key={index} group={group} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
        ))}
      </div>
    </div>
  )
}

export default Groups
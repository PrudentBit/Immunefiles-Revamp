"use client";

import React, { useState } from 'react'
import GroupsTopNav from './GroupsTopNav';
import GroupsRow from './GroupsRow';

const Groups = () => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);

  return (
    <div className='h-full flex flex-col gap-4 justify-between items-center'>
      <GroupsTopNav selected={selectedGroups} allSelected={allSelected} setAllSelected={setAllSelected}/>
      
      <div className='w-full h-[27rem] flex flex-col gap-4 mt-3 pr-2 overflow-auto'>
        <GroupsRow/>
        <GroupsRow/>
        <GroupsRow/>
        <GroupsRow/>
        <GroupsRow/>
        <GroupsRow/>
        <GroupsRow/>
        <GroupsRow/>
        <GroupsRow/>
      </div>
    </div>
  )
}

export default Groups
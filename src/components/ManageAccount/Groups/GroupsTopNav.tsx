"use client";

import Image from 'next/image'
import { motion } from 'framer-motion'
import React from 'react'
import CreateGroupModal from '@/components/Modals/CreateGroupModal/CreateGroupModal';
import { GroupStore } from '@/utils/store/groupDetailsStore';

type Props = {
  allSelected: boolean,
  setAllSelected: React.Dispatch<React.SetStateAction<boolean>>,
  selected: string[]
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
}

const GroupsTopNav = ({allSelected, setAllSelected, selected, setSelected}: Props) => {
  const { groups } = GroupStore();

  const handleClick = () => {
    setAllSelected(!allSelected);
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(groups.map((group) => group.group_hash));
    }
  }

  const handleClear = () => {
    setAllSelected(false);
    setSelected([]);
  }

  return (
    <div className='flex w-full bg-gray-100 h-16 rounded-lg justify-between items-center pl-8 pr-6'>
      <div className='flex gap-4'>
        <button onClick={handleClick} className='w-6 h-[1.43rem] bg-[#FFFFFF] rounded-sm'>
          {allSelected ? (
            <Image src="/checked-icon-white.svg" alt='check' width={24} height={24}/>
          ):(
            <Image src="/not-checked-icon-white.svg" alt='uncheck' width={24} height={24}/>
          )}
        </button>
        <p>Select All</p>
      </div>

      <div className='flex gap-6'>
        {selected.length > 0 && (
          <motion.div
            className='flex items-center gap-4'
            initial={{ opacity: 0, scale: 0, x: 150 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 40}}
            transition={{ type: "spring", stiffness: 50 }}
          >
            
            <div className='flex gap-4 items-center'>
              <button title='Download' className='flex items-center justify-center rounded-full h-8 w-8 border border-[#3ABA6E]'>
                <Image src='/download-icon-green.svg' width={18} height={18} alt='Download icon'/>
              </button>
            </div>

            <p> {selected.length} Selected</p>

            <button className='rounded-full bg-gray-200 hover:bg-[#DADADA] flex justify-center items-center h-8 w-8' onClick={handleClear}>
              <Image src='/cross-icon.svg' width={12} height={12} alt='Cross icon'/>
            </button>
          </motion.div>
        )}

        <CreateGroupModal/>
      </div>
    </div>
  )
}

export default GroupsTopNav
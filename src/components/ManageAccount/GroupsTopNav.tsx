"use client";

import Image from 'next/image'
import { motion } from 'framer-motion'
import React from 'react'

type Props = {
  allSelected: boolean,
  setAllSelected: React.Dispatch<React.SetStateAction<boolean>>,
  selected: string[]
}

const GroupsTopNav = ({allSelected, setAllSelected, selected}: Props) => {

  return (
    <div className='flex w-full justify-between items-center pl-8'>
      <div className='flex gap-4'>
        <button onClick={()=>{setAllSelected(!allSelected)}} className='w-6 h-[1.43rem] bg-[#FFFFFF] rounded-sm'>
          {allSelected ? (
            <Image src="/checked-icon-white.svg" alt='check' width={24} height={24}/>
          ):(
            <Image src="/not-checked-icon-white.svg" alt='uncheck' width={24} height={24}/>
          )}
        </button>
        <p>Select All</p>
      </div>

      {selected.length > 0 && (
        <motion.div
          className='flex items-center gap-4'
          initial={{ opacity: 0, scale: 0, x: 150 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 40}}
          transition={{ type: "spring", stiffness: 50 }}
        >
          
          <div className='flex gap-4 items-center'>
            <button title='Favourite' className='flex items-center justify-center rounded-full h-8 w-8 border border-[#ABC5FF]'>
              <Image src='/favourite-icon-2.svg' width={15} height={15} alt='Fav icon'/>
            </button>
            <button title='Download' className='flex items-center justify-center rounded-full h-8 w-8 border border-[#3ABA6E]'>
              <Image src='/download-icon-green.svg' width={18} height={18} alt='Download icon'/>
            </button>
            <button title='Delete' className='flex items-center justify-center rounded-full h-8 w-8 border border-[#FF6161]'>
              <Image src='/delete-icon-2.svg' width={16} height={16} alt='Fav icon'/>
            </button>
          </div>

          <p> {selected.length} Selected</p>

          <button className='rounded-full bg-[#F0F0F0] hover:bg-[#DADADA] flex justify-center items-center h-8 w-8' onClick={()=>{setAllSelected(false)}}>
            <Image src='/cross-icon.svg' width={12} height={12} alt='Cross icon'/>
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default GroupsTopNav
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const AddFile = () => {
  return (
    <motion.div
      className='flex gap-5 '
      initial={{ opacity: 0, scale: 0, x: -300 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: -100 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <button className='flex gap-2 items-center'>
        <Image src='/add_file-icon.svg' width={18} height={18} alt='Add file icon'/>
        <p className=' text-secondary_font font-medium text-sm'>Add File</p>
      </button>
      <button className='flex gap-2 items-center'>
        <Image src='/add_folder-icon.svg' width={18} height={18} alt='Add folder icon'/>
        <p className=' text-secondary_font font-medium text-sm'>Add Folder</p>
      </button>
      <button className='flex gap-2 items-center'>
        <Image src='/request-icon.svg' width={18} height={18} alt='Request icon'/>
        <p className=' text-secondary_font font-medium text-sm'>Request File</p>
      </button>
    </motion.div>
  )
}

export default AddFile

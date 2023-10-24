import React from 'react'
import { motion } from 'framer-motion'
import CreateFileOrFolder from '@/components/Modals/CreateOrRequestFiles/CreateFile&FolderModal'

const AddFile = () => {
  return (
    <motion.div
      className='flex gap-1 '
      initial={{ opacity: 0, scale: 0, x: -300 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: -100 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <CreateFileOrFolder propTab='Create File'/>
      <CreateFileOrFolder propTab='Create Folder'/>
      <CreateFileOrFolder propTab='Request File'/>
    </motion.div>
  )
}

export default AddFile

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { selectedFilesStore } from '@/utils/store/selectFilesStore';
<<<<<<< HEAD
=======
import DeleteFileAlert from '@/components/Alerts/DeleteFileAlert';
import MoveFilesModal from '@/components/Modals/Move&CopyFilesModal';
>>>>>>> bd658a3f3bd757392ffd48ab4f1d10d24548846f

const FileSelectOptions = () => {
  const [files, removeAllFiles] = selectedFilesStore((state) => [state.files, state.removeAllFiles]);

  const handleRemoveAll = () => {
    removeAllFiles();
  };

  return (
    <motion.div
      className='flex items-center gap-4'
      initial={{ opacity: 0, scale: 0, x: 150 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: 40}}
      transition={{ type: "spring", stiffness: 50 }}
    >
      
      <div className='flex gap-4 items-center'>
        <button title='Share' className='rounded-full p-2 bg-primary_bg  hover:bg-bg_hover'>
          <Image src='/share-icon.svg' width={20} height={20} alt='Share icon'/>
        </button>
        <button title='Link' className='rounded-full p-2 bg-primary_bg  hover:bg-bg_hover'>
          <Image src='/link-icon.svg' width={20} height={20} alt='Link icon'/>
        </button>
        <button title='Copy' className='rounded-full p-2 bg-primary_bg  hover:bg-bg_hover'>
          <MoveFilesModal file={files} multiplefiles={true} moveORcopy={'Copy'}/>
        </button>
        <button title='Move' className='rounded-full p-2 bg-primary_bg  hover:bg-bg_hover'>
          <MoveFilesModal file={files} multiplefiles={true} moveORcopy={'Move'}/>
        </button>
        <button title='Delete' className='rounded-full p-2 bg-[#FFE3E5]  hover:bg-[#FFCDD0]'>
          <DeleteFileAlert file={files} multiplefiles={true}/>
        </button>
      </div>

      <p> {files.length} Selected</p>

      <button className='rounded-full bg-[#F0F0F0] hover:bg-[#DADADA] flex justify-center items-center h-8 w-8' onClick={handleRemoveAll}>
        <Image src='/cross-icon.svg' width={12} height={12} alt='Cross icon'/>
      </button>
    </motion.div>
  )
}

export default FileSelectOptions
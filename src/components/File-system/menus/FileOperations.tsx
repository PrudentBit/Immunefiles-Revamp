"use client"

import React from 'react'
import Image from 'next/image'
import AddFile from './AddFile'
import FileSelectOptions from './FileSelectOptions'
import {AnimatePresence, motion, useAnimation} from 'framer-motion'
import { selectedFilesStore } from '@/utils/store/selectFilesStore';
import UploadFileModal from '@/components/Modals/UploadFileModal'

const FileOperations = () => {
  const [addFile, setAddFile] = React.useState(false);
  const [files] = selectedFilesStore((state) => [state.files]);
  const controls = useAnimation(); 

  const toggleAddFile = () => {
    setAddFile(!addFile);
    controls.start({ rotate: addFile ? 0 : 45 });
  };

  return (
    <div className='Operations flex justify-between'>
        <div className='flex gap-6'>
          <UploadFileModal/>

          <motion.button 
            className="bg-primary_bg px-[0.65rem] pb-[0.4rem] rounded-full hover:bg-button_hover"
            onClick={toggleAddFile} 
            animate={controls} 
          >
            <p className='leading-[0px] text-3xl text-secondary_font font'>+</p>
          </motion.button>

          <AnimatePresence>
            {addFile && <AddFile />}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {files.length > 0 && <FileSelectOptions/>}
        </AnimatePresence>
      </div>
  )
}

export default FileOperations
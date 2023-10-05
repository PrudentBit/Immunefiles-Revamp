"use client"

import React from 'react'
import Image from 'next/image'
import AddFile from './AddFile'
import FileSeselectOptions from './FileSelectOptions'
import {AnimatePresence, motion, useAnimation} from 'framer-motion'

const FileOperations = () => {
  const [addFile, setAddFile] = React.useState(false);
  const [fileSelect, setFileSelect] = React.useState(false);
  const controls = useAnimation(); 

  const toggleAddFile = () => {
    setAddFile(!addFile);
    controls.start({ rotate: addFile ? 0 : 45 });
  };

  return (
    <div className='Operations flex justify-between'>
        <div className='flex gap-6'>
          <button className="rounded-full bg-primary_bg p-2 hover:bg-button_hover ">
            <Image src='/upload-icon.svg' width={26} height={26} alt='File icon'/>
          </button>

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

        {fileSelect ? <FileSeselectOptions />: <div></div>}
      </div>
  )
}

export default FileOperations
import React from 'react'
import Image from 'next/image'

type Props = {
  file: FileOrFolderType[];
  removeFileFromSelection: (indexToRemove: number) => void;
}

const SelectedFilesDisplay = ({file, removeFileFromSelection}: Props) => {
  return (
    <div className='w-full h-[30%] rounded-lg px-4 py-3 border-[1px] border-solid border-[#7A7AFF]'>
      <div className='overflow-y-auto flex gap-3 flex-wrap h-full rounded-lg pr-4'>
        {file.map((item, index) => {
          const extension = item.is_file ? item.name.split('.').pop() : '';
          const iconSrc = item.is_file ? `/FileIcons/${extension}.svg` : '/folder-icon-filled.svg';

          return (
            <div key={index} className='h-10 max-w-[30%] flex gap-2 items-center p-2 bg-primary_bg rounded-md'>
              <Image src={iconSrc} width={18} height={18} alt={`${item.is_file ? 'file' : 'folder'} icon`}/>
              <p className='truncate pr-2'>{item.name}</p>
              <button className='shrink-0 bg-white h-5 w-5 flex items-center justify-center rounded-sm hover:bg-slate-100' onClick={() => removeFileFromSelection(index)}>
                <Image src='/cross-icon.svg' width={14} height={14} alt='remove'/>
              </button>
            </div> 
          )
        })}
      </div>
    </div>
  )
}

export default SelectedFilesDisplay
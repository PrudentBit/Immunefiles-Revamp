import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type Props = {
  tabName:string;
  className?:string;
  onClick?:() => void;
}

const Tabs = ({tabName, className, onClick}: Props) => {
  const [image, setImage] = useState('')

  useEffect(() => {
    if(tabName === 'Create File'){
      setImage('/add_file-icon.svg')
    }
    else if(tabName === 'Create Folder'){
      setImage('/add_folder-icon.svg')
    }
    else if(tabName === 'Request File'){
      setImage('/request-icon.svg')
    }
  }, [tabName])

  return (
  <div onClick={onClick} className={`flex gap-2 p-2 px-3 rounded-full cursor-pointer hover:bg-bg_hover ${className}`}>
    <Image src={image} width={18} height={18} alt='Request icon'/>
    <p className=' text-secondary_font font-medium text-sm'>{tabName}</p>
  </div>
  )
}

export default Tabs
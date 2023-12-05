import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const ServerRow = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [deleteHovered, setDeleteHovered] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleCheckboxClick = () => {
    setIsSelected(!isSelected);
  }

  return (
    <div className='w-full h-14 bg-[#E5EDFF] rounded-lg flex justify-between items-center p-3 px-5'>
      <div className='flex gap-4 items-center'>
        <button onClick={handleCheckboxClick} className='w-6 h-[1.43rem] bg-[#FFFFFF] rounded-sm'>
          {isSelected ? (
            <Image src="/checked-icon-white.svg" alt='check' width={28} height={28}/>
          ):(
            <Image src="/not-checked-icon-white.svg" alt='uncheck' width={28} height={28}/>
          )}
        </button>

        <div className='flex gap-2 items-center'>
          <Image src="/server-icon-2.svg" width={32} height={32} alt='server'/>
          <p className='text-primary_font text-[1.1rem]'>Server name</p>
        </div>
      </div>

      <div className="flex gap-2 items-center" onClick={()=>setIsActive(!isActive)}>
        <div className={`h-1 w-1 rounded-full ${isActive? "bg-green-500" : "bg-red-400"} mt-[0.1rem]`}></div>
        <p className={`${isActive? "text-green-500" : "text-red-400"} text-[0.83rem] font-medium`}>
          {isActive ? 'Active' : 'Disconnected'}
        </p>
      </div>

      <div className='w-20 flex justify-end'>
        <Button
          onMouseEnter={()=>setDeleteHovered(true)}
          onMouseLeave={()=>setDeleteHovered(false)}
          className='h-6 w-6 p-0 bg-white hover:bg-[#FFEBEC] hover:w-20 hover:scale-[1.1] gap-2 flex items-center justify-center rounded-sm border-[1px] border-solid border-red-400'>
            <Image src="/delete-icon.svg" width={15} height={15} alt='delete' />
            {deleteHovered && <p className='text-red-400 text-[0.82rem]'>Delete</p>}
        </Button>
      </div>
    </div>
  )
}

export default ServerRow
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type Props = {}

const ServerRow = (props: Props) => {
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <div className='w-full h-14 bg-[#E5EDFF] rounded-lg flex justify-between items-center p-3 px-5'>
      <div className='flex gap-2 items-center'>
        <Image src="/server-icon-2.svg" width={32} height={32} alt='server'/>
        <p className='text-primary_font text-[1.1rem]'>Server name</p>
      </div>

      <div className="flex gap-2 items-center">
        <div className={`h-1 w-1 rounded-full ${isActive? "bg-green-500" : "bg-red-400"} mt-[0.1rem]`}></div>
        <p className={`${isActive? "text-green-500" : "text-red-400"} text-[0.83rem] font-medium`}>
          {isActive ? 'Active' : 'Disconnected'}
        </p>
      </div>

      <Button className='h-6 w-6 p-0 bg-white flex items-center justify-center rounded-sm border-[1px] border-solid border-red-400'>
        <Image src="/delete-icon.svg" width={15} height={15} alt='delete' />
      </Button>
    </div>
  )
}

export default ServerRow
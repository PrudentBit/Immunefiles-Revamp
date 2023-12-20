import {useState} from 'react'
import Image from 'next/image'

type Props = {}

const GroupsRow = (props: Props) => {
  const [selected, setSelected] = useState(false);

  return (
    <div className='h-[3.8rem] w-full rounded-xl flex items-center justify-between p-4 pr-8 gap-7 bg-primary_bg'>
      <div className='flex gap-4 items-center w-[50%]'>
        <button onClick={()=>setSelected(!selected)} className='w-6 h-[1.43rem] bg-[#DADAFF] rounded-sm'>
          {selected ? (
            <Image src="/checked-icon-white.svg" alt='check' width={24} height={24}/>
          ):(
            <Image src="/not-checked-icon-white.svg" alt='uncheck' width={24} height={24}/>
          )}
        </button>
        <div className='flex gap-2'>
          <Image src="/groups-icon.svg" alt='group' width={22} height={22}/>
          <p className='text-[#7A7AFF] text-lg font-medium leading-5 truncate w-[30rem]'>group name</p>
        </div>
      </div>

      <div className='flex gap-6 items-center'>
        <button title='Favourite' className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#ABC5FF] bg-white hover:bg-[#DEE8FF]'>
          <Image src='/favourite-icon-2.svg' width={15} height={15} alt='Fav icon'/>
        </button>
        <button title='Download' className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#3ABA6E] bg-white hover:bg-[#E1FFED]'>
          <Image src='/download-icon-green.svg' width={18} height={18} alt='Download icon'/>
        </button>
        <button title='Delete' className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#FF6161] bg-white hover:bg-[#FFE3E5]'>
          <Image src='/delete-icon-2.svg' width={16} height={16} alt='Fav icon'/>
        </button>
        <button title='Manage' className='flex items-center justify-center rounded-lg h-8 w-20 border border-[#8E8EFF] bg-white hover:bg-[#EAEAFF]'>
          <p className='text-[#8E8EFF]'> Manage </p>
        </button>
      </div>
    </div>
  )
}

export default GroupsRow
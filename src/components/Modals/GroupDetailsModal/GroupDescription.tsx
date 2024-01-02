import {useState} from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type Props = {
  group: GroupDetailsType
}

const GroupDescription = ({ group }: Props) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");

  const handleNameEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value= e.target.value;
    setValue(value);
  }

  return (
    <div className="flex flex-col gap-3 h-[26%] w-full">
      <div className='flex gap-3 h-5'>
        <Image src='/description-icon.svg' width={25} height={25} alt="group"/>
        <p className='text-[#7A7AFF] text-[1.05rem] leading-5'>Description</p>
      </div>

      {edit ? (
        <div className='w-full h-full flex gap-2 pr-4 p-1 justify-between items-center bg-primary_bg rounded-lg border border-solid border-bg_hover'>
          <textarea 
            className="w-[90%] h-full flex items-center justify-between px-4 p-2 text-gray-600 text-sm font-normal leading-4 bg-primary_bg rounded-lg resize-none"
            placeholder={group.description}
            value={value}
            onChange={(e)=>handleNameEdit(e)}
          >
          </textarea>
          <Button className='h-6 px-3 bg-[#8E8EFF] hover:bg-[#9797FF] rounded-full font-normal'>
            Save
          </Button>
          <div
            className='cursor-pointer p-1 bg-red-100 rounded-full'
            onClick={() => {setEdit(false); setValue("")}}
          >
            <Image
              src="/close-icon.svg"
              width={16}
              height={16}
              alt="remove icon"
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-between px-2 bg-primary_bg rounded-lg">
          <div className='h-[4.5rem] px-3 overflow-auto max-w-[95%] self-center'>
            <p className=' text-primary_font text-sm font-normal leading-4'>{group.description}</p>
          </div>
          <div className="p-1 h-8 w-8 flex justify-center items-center rounded-md hover:bg-bg_hover cursor-pointer mt-2" onClick={()=>setEdit(true)}>
            <Image src='/rename-icon-2.svg' width={20} height={20} alt="edit icon"/>
          </div>
        </div>
      )}
    </div>
  )
}

export default GroupDescription
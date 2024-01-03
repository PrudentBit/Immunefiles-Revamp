import { use, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import editGroup from '@/utils/api/editGroupAPI'
import { decryptData } from '@/utils/helper/decryptFiles'
import { GroupStore } from '@/utils/store/groupDetailsStore'

type Props = {
  group: GroupDetailsType
}

const GroupName = ({group}: Props) => {
  const [rename, setRename] = useState(false);
  const [value, setValue] = useState(group.name);
  const { toggleForceRefresh } = GroupStore();
  const [groupName, setGroupName] = useState(group.name);

  const handleNameEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value= e.target.value;
    setValue(value);
  }

  const formattedDate = new Date(group.created).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const handleSave = async () => {
    const response = await editGroup({action: "rename", group_hash: group.group_hash, name: value});
    const decryptedResponse = decryptData(response.data.ciphertext);
    console.log(response)
    if (response.status == 200) {
      setRename(false);
      setGroupName(value);
      toggleForceRefresh();
    }
    else{
      console.log(decryptedResponse);
    }
  }

  return (
    <div className="flex flex-col gap-3 h-[18%] w-full" onClick={(e)=>e.stopPropagation()}>
      <div className="flex gap-4 justify-between items-center">
        <div className='flex gap-3 h-5'>
          <Image src='/groups-icon.svg' width={24} height={24} alt="group"/>
          <p className='text-[#7A7AFF] text-[1.05rem] leading-5'>Group name</p>
        </div >  
        <div className='flex gap-1 h-5'>
          <p className="text-gray-800 leading-5">Created on :</p>
          <p className='text-gray-900 text-base  leading-5'>{formattedDate}</p>
        </div>  
      </div>

      {rename ? (
        <div className='w-full h-full flex gap-2 pr-4 justify-between items-center bg-primary_bg rounded-lg border border-solid border-bg_hover'>
          <input 
            className="w-[90%] h-full flex items-center justify-between px-4 text-gray-600 text-base font-medium leading-5 bg-primary_bg rounded-lg"
            type="text"
            placeholder={group.name}
            value={value}
            onChange={(e)=>handleNameEdit(e)}
          >
          </input>
          <Button 
            className='h-6 px-3 bg-[#8E8EFF] hover:bg-[#9797FF] rounded-full font-normal'
            onClick={handleSave}
          >
            Save
          </Button>
          <div
            className='cursor-pointer p-1 bg-red-100 rounded-full'
            onClick={() => {setRename(false); setValue(group.name)}}
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
        <div className="w-full h-full flex items-center justify-between px-2 bg-primary_bg rounded-lg">
          <p className='text-primary_font text-base font-medium leading-5 p-2'>{groupName}</p>
          <div className="p-1 rounded-md hover:bg-bg_hover cursor-pointer" onClick={()=>setRename(true)}>
            <Image src='/rename-icon-2.svg' width={20} height={20} alt="edit icon"/>
          </div>
        </div>
      )}
    </div>
  )
}

export default GroupName
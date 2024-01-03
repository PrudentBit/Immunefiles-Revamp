import {useState, useEffect} from 'react'
import SwitchFields from '../../SwitchFields'
import Image from 'next/image'
import { GroupStore } from '@/utils/store/groupDetailsStore'
import fetchGroupDetails from '@/utils/api/getGroupDetailsAPI'
import { decryptData } from '@/utils/helper/decryptFiles'

type Props = {
  settings: InternalShareSettings
  setSettings: React.Dispatch<React.SetStateAction<{
    shareable: boolean;
    downloadable: boolean;
    proctored: boolean;
    modifyable: boolean;
  }>>;
  selectedGroups: string[];
  setSelectedGroups: React.Dispatch<React.SetStateAction<string[]>>;
  allChecked: boolean;
  setAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const SendInGroupsSection = ({settings, setSettings, selectedGroups, setSelectedGroups, allChecked, setAllChecked}: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { groups, setGroups } = GroupStore();

  const handleGroupSelect = (group: GroupDetailsType) => {
    if (selectedGroups.includes(group.group_hash)) {
      setSelectedGroups(selectedGroups.filter(hash => hash !== group.group_hash));
    } else {
      setSelectedGroups([...selectedGroups, group.group_hash]);
    }
  };

  const handleAllSelect = () => {
    if (allChecked) {
      setSelectedGroups([]);
    } else {
      setSelectedGroups(groups!.map(group => group.group_hash));
    }
    setAllChecked(!allChecked);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredGroups = groups!.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGroupDetails();

        if(response.status === 200) {
          const decryptedGroupData = decryptData(response.data.ciphertext);
          console.log(decryptedGroupData);
          setGroups(decryptedGroupData.groups);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className='flex gap-4 h-[54%] w-[46rem]'>
      <div className='w-[55%] rounded-lg p-3 flex flex-col gap-3 border-[1px] border-solid border-[#7A7AFF] '>
        <div className='flex gap-3 items-center h-[20%]'>
          <button onClick={handleAllSelect} className='w-6 h-[1.43rem] bg-[#DADAFF] rounded-sm'>
            {allChecked ? (
              <Image src="/checked-icon.svg" alt='check' width={28} height={28}/>
            ):(
              <Image src="/not-checked-icon.svg" alt='uncheck' width={28} height={28}/>
            )}
          </button>
          <form action="" className='flex items-center gap-4 w-full h-full px-3 rounded-md justify-between bg-[#F0F0F0]'>
            <button>
                <Image src="/search.png" alt='search' width={20} height={25}/>
            </button>
            <input 
              type="text" 
              placeholder='Search groups..' 
              className='h-full w-full bg-transparent' 
              value={searchTerm} 
              onChange={handleSearchChange}
            />
          </form>
        </div>

        <div className='w-full h-[80%] flex flex-col pr-3 gap-2 overflow-y-auto'>
          {filteredGroups.map((group: GroupDetailsType, index: number) => (
            <div key={index} className='h-10 rounded-sm flex gap-3 px-3 py-2 bg-bg_hover'>
              <button onClick={() => handleGroupSelect(group)} className='w-6 h-[1.43rem] bg-[#DADAFF] rounded-sm'>
                {selectedGroups.includes(group.group_hash) ? (
                  <Image src="/checked-icon.svg" alt='check' width={28} height={28}/>
                ):(
                  <Image src="/not-checked-icon.svg" alt='uncheck' width={28} height={28}/>
                )}
              </button>
              <div className='flex gap-2' onClick={() => handleGroupSelect(group)}>
                <Image src="/groups-icon.svg" alt='check' width={18} height={18}/>
                <p className='text-[#7A7AFF] w-[17rem] truncate'>
                  {group.name}
                </p>
              </div>
            </div>
          ))}
        </div>  
      </div>

      <div className='w-[45%] rounded-lg px-3 py-2 pr-2 border-[1px] border-solid border-[#7A7AFF] '>
        <div className='flex flex-col gap-4 h-full overflow-auto'>
          <SwitchFields 
            label='Shareable content' 
            svg='/forward-icon.svg' 
            svgSize={18}
            checked={settings.shareable} 
            setChecked={(value) => {setSettings({...settings, shareable: value});}}
          />

          <SwitchFields 
            label='Can Delete content' 
            svg='/modify-icon.svg' 
            svgSize={13}
            checked={settings.modifyable} 
            setChecked={(value) => {setSettings({...settings, modifyable: value});}}
          />

          <SwitchFields 
            label='Downloadable content' 
            svg='/download-icon-2.svg' 
            svgSize={16}
            checked={settings.downloadable} 
            setChecked={(value) => {setSettings({...settings, downloadable: value});}}
          />

          <SwitchFields 
            label='Proctored' 
            svg='/proctor-icon.svg' 
            checked={settings.proctored} 
            setChecked={(value) => {setSettings({...settings, proctored: value});}}
          />
        </div>
      </div>
    </div>
  )
}

export default SendInGroupsSection
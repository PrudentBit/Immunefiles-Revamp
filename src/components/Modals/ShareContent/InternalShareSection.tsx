import React from 'react'
import SwitchFields from '@/components/SwitchFields'
import getEmailSearchQuery from '@/utils/api/getEmailSearchQueryAPI';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  setShareEmail: React.Dispatch<React.SetStateAction<string>>;
  settings: InternalShareSettings
  setSettings: React.Dispatch<React.SetStateAction<{
    shareable: boolean;
    downloadable: boolean;
    proctored: boolean;
    modifyable: boolean;
  }>>;
}

const InternalShareSection = ({setShareEmail, settings, setSettings}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<userSearchQueryType[]>([]);
  const [value, setValue] = React.useState('');

  const getUsers = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);

    if (query.length > 0) {
      setIsOpen(true)
      try {
        const result = await getEmailSearchQuery(query);
        console.log(result);
        setSearchResults(result);
      } catch (error) {
        console.error('Error fetching user search:', error);
      }
    }
    else{
      setIsOpen(false)
    }
  };

  const selectEmail = (user: userSearchQueryType) => {
    setShareEmail(user.email);
    setIsOpen(false);
    setValue(user.email);
  }

  return (
    <div className='w-[46rem] h-[54%] rounded-lg px-5 py-4 pr-2 border-[1px] border-solid border-[#7A7AFF] '>
      <div className='flex flex-col gap-4 h-full pr-2 overflow-auto'>
        <input 
          type="email" 
          className='p-2 px-5 w-full text-primary_fontrounded-sm bg-bg_hover placeholder:text-primary_font rounded-sm'
          placeholder='Enter mail ID'
          autoComplete='off'
          onChange={(e)=> getUsers(e)}
          value={value}
        />
        {isOpen && (
          <div className='w-full h-[5rem] min-h-[5rem] shadow-[0px_2px_15px_0px_rgba(75,123,229,0.20)] flex flex-col rounded-lg overflow-auto'>
            {searchResults.map((user, index) => (
              <div key={index}>
                <div 
                  className='flex gap-3 items-center py-[0.4rem] px-3 hover:bg-[#E5EDFF] rounded-lg cursor-pointer'
                  onClick={() => selectEmail(user)}
                  
                >
                  <Avatar className='h-7 w-7'>
                    <AvatarImage src="" alt=""/>
                    <AvatarFallback className='bg-primary_font text-white font-semibold text-xl pb-1'>{user.name.split('')[0]}</AvatarFallback>
                  </Avatar>
                  <p className=' truncate text-primary_font'>{user.email}</p>
                </div>
                <hr />
              </div>
            ))}
          </div>
        )}

        <SwitchFields 
          label='Shareable content' 
          svg='/forward-icon.svg' 
          svgSize={18}
          checked={settings.shareable} 
          setChecked={(value) => {setSettings({...settings, shareable: value});}}
        />

      
        <SwitchFields 
          label='Can Add/Delete content' 
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
  )
}

export default InternalShareSection
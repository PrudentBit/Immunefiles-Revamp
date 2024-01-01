import React from 'react'
import SwitchFields from '../../SwitchFields'

type Props = {
  shareEmail: string;
  setShareEmail: React.Dispatch<React.SetStateAction<string>>;
  settings: InternalShareSettings
  setSettings: React.Dispatch<React.SetStateAction<{
    shareable: boolean;
    downloadable: boolean;
    proctored: boolean;
    modifyable: boolean;
  }>>;
}

const InternalShareSection = ({shareEmail, setShareEmail, settings, setSettings}: Props) => {
  return (
    <div className='w-[46rem] h-[54%] rounded-lg px-5 py-4 pr-2 border-[1px] border-solid border-[#7A7AFF] '>
      <div className='flex flex-col gap-4 h-full pr-2 overflow-auto'>
        <input 
          type="email" 
          className='p-2 px-5 w-full text-primary_fontrounded-sm bg-bg_hover placeholder:text-primary_font rounded-sm'
          placeholder='Enter mail ID'
          autoComplete='off'
          value={shareEmail}
          onChange={(e) => setShareEmail(e.target.value)}
        />

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
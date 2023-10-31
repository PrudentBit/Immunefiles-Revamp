import React from 'react'
import SwitchFields from './SwitchFields'
import Image from 'next/image';

type Props = {
  settings: ShareSettings
  setSettings: React.Dispatch<React.SetStateAction<{
    expiry: boolean;
    password: boolean;
    accesslimit: boolean;
    downloadable: boolean;
    shareable: boolean;
    proctored: boolean;
    expiryDate: String | null;
    expiryTime: String | null;
    passwordValue: string | null;
    accessValue: number;
  }>>;
  linkName: string;
  setLinkName: React.Dispatch<React.SetStateAction<string>>;
  shareEmail: string;
  setShareEmail: React.Dispatch<React.SetStateAction<string>>;
}

const SendMailSection = ({settings, setSettings, linkName, setLinkName, shareEmail, setShareEmail}: Props) => {

  const handleDateChange = (date: string) => {
    setSettings({...settings, expiryDate: date});
  };

  const handleTimeChange = (time: string) => {
    setSettings({...settings, expiryTime: time});
  };

  const incrementAccess = () => {
    if (settings.accessValue !== null) {
      setSettings({...settings, accessValue: settings.accessValue + 1});
    }
  };

  const decrementAccess = () => {
    if (settings.accessValue !== null && settings.accessValue > 0) {
      setSettings({...settings, accessValue: settings.accessValue - 1});
    }
  };

  return (
    <div className='w-full h-[54%] rounded-lg px-5 py-4 pr-2 border-[1px] border-solid border-[#7A7AFF] '>
      <div className='flex flex-col gap-4 h-full pr-2 overflow-auto'>
        <div>
          <input 
            type="text" 
            className='p-2 px-5 w-full text-secondary_font bg-bg_hover placeholder:text-primary_font rounded-sm'
            placeholder='Enter link title'
            autoComplete='off'
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
          />
        </div>

        <div>
          <input 
            type="email" 
            className='p-2 px-5 w-full text-primary_fontrounded-sm bg-bg_hover placeholder:text-primary_font rounded-sm'
            placeholder='Enter mail ID'
            autoComplete='off'
            value={shareEmail}
            onChange={(e) => setShareEmail(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-3'>
          <SwitchFields 
            label='Expiration time' 
            svg='/expiry-icon.svg' 
            checked={settings.expiry} 
            setChecked={(value) => {
              if (!value) {
                setSettings({...settings, expiry: value, expiryDate: null, expiryTime: null});
              } else {
                setSettings({...settings, expiry: value});
              }
            }}
          />

          {settings.expiry && (
            <form className='flex gap-10'>
              <div className='flex gap-4'>
                <label htmlFor="dateInp" className='flex justify-center items-center h-10 w-[12rem] rounded-sm bg-bg_hover text-primary_font'>{settings.expiryDate || 'DD-MM-YY'}</label>
                <div className='flex w-10 justify-center bg-bg_hover rounded-sm'>
                  <input 
                    type="date" 
                    className='w-5 text-secondary_font bg-bg_hover'
                    id='dateInp'
                    onChange={(e) => handleDateChange(e.target.value)}
                  />
                </div>
              </div>
              <div className='flex gap-4'>
                <label htmlFor="time" className='flex justify-center items-center h-10 w-[12rem] rounded-sm bg-bg_hover   text-primary_font'>{settings.expiryTime || 'HH:MM'}</label>
                <div className='bg-bg_hover w-10 rounded-sm'>
                  <input 
                    type="time" 
                    className='w-8 h-10 text-secondary_font bg-bg_hover rounded-sm'
                    id='time'
                    onChange={(e) => handleTimeChange(e.target.value)}
                  />
                </div>
              </div>
            </form>
          )}
          <SwitchFields 
            label='Password protected' 
            svg='/passwordProtect-icon.svg' 
            svgSize={16}
            checked={settings.password} 
            setChecked={(value) => setSettings({...settings, password: value})}
          />

          {settings.password && (
            <form action="" autoComplete='off'>
              <input 
                type="password" 
                className='p-2 px-6 w-[97%] text-secondary_font bg-bg_hover placeholder:text-primary_font rounded-sm'
                onChange={(e) => setSettings({...settings, passwordValue: e.target.value})}
                placeholder='Enter password'
                value={settings.passwordValue || ''}
              />
            </form>
          )}

          <SwitchFields 
            label='Access limit' 
            svg='/accessLimit-icon.svg' 
            svgSize={18}
            checked={settings.accesslimit} 
            setChecked={(value) => setSettings({...settings, accesslimit: value})}
          />

          {settings.accesslimit && (
            <div className='flex justify-between'>
              <input 
                type="number" 
                className='p-2 px-6 w-[97%] text-secondary_font bg-bg_hover placeholder:text-primary_font rounded-sm'
                onChange={(e) => setSettings({...settings, accessValue: Number(e.target.value)})}
                value = {settings.accessValue}
              />

              <div className='flex flex-col gap-2'>
                <Image src="/up-arrow.svg" width={4} height={4} alt="+1" className='w-4 h-4 bg-bg_hover rounded-sm' onClick={incrementAccess}></Image>
                <Image src="/down-arrow-2.svg" width={4} height={4} alt="-1" className='w-4 h-4 bg-bg_hover rounded-sm' onClick={decrementAccess}></Image>
              </div>
            </div>
          )}

          <SwitchFields 
            label='Forwardable' 
            svg='/forward-icon.svg' 
            svgSize={18}
            checked={settings.shareable} 
            setChecked={(value) => {setSettings({...settings, shareable: value});}}
          />

          <SwitchFields 
            label='Downloadable content' 
            svg='/download-icon-2.svg' 
            svgSize={16}
            checked={settings.downloadable} 
            setChecked={(value) => setSettings({...settings, downloadable: value})}
          />

          <SwitchFields 
            label='Proctored' 
            svg='/proctor-icon.svg'
            checked={settings.proctored} 
            setChecked={(value) => setSettings({...settings, proctored: value})}
          />
        </div>
      </div>
    </div>
  )
}

export default SendMailSection
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import UploadUserProfileImage from '../../Modals/UploadProfileImage/UploadUserProfileImage'

type Props = {
  userDetails?: UserDetailsType
}

const ChangeAvatar = ({userDetails}:Props) => {
  return (
    <div className='w-full p-5 flex items-center justify-between gap-12 border-2 border-solid border-button_hover rounded-2xl'>
      <div className='w-[60%] h-full flex flex-col gap-2'>
        <div className='flex gap-2'>
          <Image src="/avatar-icon.svg" alt='profile' width={30} height={30}/>
          <p className='text-[#7A7AFF] text-lg'>Change Avatar</p>
        </div>

        <div className='flex flex-wrap h-full w-full gap-5'>
          <div className='h-[5.5rem] w-[5.5rem] rounded-lg p-2 relative hover:bg-bg_hover'>
            <Image src="/checked-icon-2.svg" alt='checked' width={20} height={20} className='rounded-full absolute z-10 translate-x-[3.2rem]'/>
            <Image src="/user.svg" alt='profile' width={73} height={73} className='rounded-full absolute'/>
          </div>
          <div className='h-[5.5rem] w-[5.5rem] rounded-lg p-2 relative hover:bg-bg_hover'>
            <Image src="/checked-icon-2.svg" alt='checked' width={20} height={20} className='rounded-full absolute z-10 translate-x-[3.2rem]'/>
            <Image src="/user.svg" alt='profile' width={73} height={73} className='rounded-full absolute'/>
          </div>
          <div className='h-[5.5rem] w-[5.5rem] rounded-lg p-2 relative hover:bg-bg_hover'>
            <Image src="/checked-icon-2.svg" alt='checked' width={20} height={20} className='rounded-full absolute z-10 translate-x-[3.2rem]'/>
            <Image src="/user.svg" alt='profile' width={73} height={73} className='rounded-full absolute'/>
          </div>
          <div className='h-[5.5rem] w-[5.5rem] rounded-lg p-2 relative hover:bg-bg_hover'>
            <Image src="/checked-icon-2.svg" alt='checked' width={20} height={20} className='rounded-full absolute z-10 translate-x-[3.2rem]'/>
            <Image src="/user.svg" alt='profile' width={73} height={73} className='rounded-full absolute'/>
          </div>
          <div className='h-[5.5rem] w-[5.5rem] rounded-lg p-2 relative hover:bg-bg_hover'>
            <Image src="/checked-icon-2.svg" alt='checked' width={20} height={20} className='rounded-full absolute z-10 translate-x-[3.2rem]'/>
            <Image src="/user.svg" alt='profile' width={73} height={73} className='rounded-full absolute'/>
          </div>
          <div className='h-[5.5rem] w-[5.5rem] rounded-lg p-2 relative hover:bg-bg_hover'>
            <Image src="/checked-icon-2.svg" alt='checked' width={20} height={20} className='rounded-full absolute z-10 translate-x-[3.2rem]'/>
            <Image src="/user.svg" alt='profile' width={73} height={73} className='rounded-full absolute'/>
          </div>
          <div className='h-[5.5rem] w-[5.5rem] rounded-lg p-2 relative hover:bg-bg_hover'>
            <Image src="/checked-icon-2.svg" alt='checked' width={20} height={20} className='rounded-full absolute z-10 translate-x-[3.2rem]'/>
            <Image src="/user.svg" alt='profile' width={73} height={73} className='rounded-full absolute'/>
          </div>
          <div className='h-[5.5rem] w-[5.5rem] rounded-lg p-2 relative hover:bg-bg_hover'>
            <Image src="/checked-icon-2.svg" alt='checked' width={20} height={20} className='rounded-full absolute z-10 translate-x-[3.2rem]'/>
            <Image src="/user.svg" alt='profile' width={73} height={73} className='rounded-full absolute'/>
          </div>
          <div className='h-[5.5rem] w-[5.5rem] rounded-lg p-2 relative hover:bg-bg_hover'>
            <Image src="/checked-icon-2.svg" alt='checked' width={20} height={20} className='rounded-full absolute z-10 translate-x-[3.2rem]'/>
            <Image src="/user.svg" alt='profile' width={73} height={73} className='rounded-full absolute'/>
          </div>
          <div className='h-[5.5rem] w-[5.5rem] rounded-lg p-2 relative hover:bg-bg_hover'>
            <Image src="/checked-icon-2.svg" alt='checked' width={20} height={20} className='rounded-full absolute z-10 translate-x-[3.2rem]'/>
            <Image src="/user.svg" alt='profile' width={73} height={73} className='rounded-full absolute'/>
          </div>
          <div className='h-[5.5rem] w-[5.5rem] rounded-lg p-2 relative hover:bg-bg_hover'>
            <Image src="/checked-icon-2.svg" alt='checked' width={20} height={20} className='rounded-full absolute z-10 translate-x-[3.2rem]'/>
            <Image src="/user.svg" alt='profile' width={73} height={73} className='rounded-full absolute'/>
          </div>
          

          <UploadUserProfileImage/>
        </div>
      </div>

      <div className='w-[25%] h-full flex flex-col items-center justify-center gap-4'>
        <div className='w-[14rem] h-[11rem] rounded-2xl bg-primary_bg flex flex-col justify-center items-center gap-1'>
          <p className='text-gray-500 text-[0.9rem]'>Preview</p>
          <div className='h-[5.2rem] w-[5.2rem] rounded-xl pb-1'>
            <Image src="/user.svg" alt='profile' width={90} height={90}/>
          </div>
          <div className='flex flex-col justify-center items-center pt-1'>
            <p className='text-primary_font text-xl font-semibold leading-5'>{userDetails?.name}</p>
            <p className='text-gray-700 text-sm font-semibold'>@{userDetails?.username}</p>
          </div>
        </div>
        <Button className="h-8 w-max rounded-full flex items-center gap-2 bg-[#E5EDFF] hover:bg-[#D9D9FF]">
          <p className='text-primary_font text-xs font-medium leading-4'>Save Changes</p>
        </Button>
      </div>
    </div>
  )
}

export default ChangeAvatar
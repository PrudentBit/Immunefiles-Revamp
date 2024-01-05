import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import UploadUserProfileImage from '../../Modals/UploadProfileImage/UploadUserProfileImage'
import changeAvatar from '@/utils/api/changeAvatarAPI'
import { toast } from 'sonner'

type Props = {
  userDetails?: UserDetailsType
}

const ChangeAvatar = ({userDetails}:Props) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(userDetails?.proile_pic || "")
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const getPreview = (file: File) => {
    return URL.createObjectURL(file);
  }

  const defaultAvatars = [
    'B1_1.png',
    'B2_1.png',
    'B3_1.png',
    'B4_1.png',
    'B5_1.png',
    'G1_1.png',
    'G2_1.png',
    'G3_1.png',
    'G4_1.png',
    'G5_1.png',
    'G6_1.png',
  ];

  useEffect(() => {
    setIsUploaded(!!uploadedFile);
    if (uploadedFile) {
      setSelectedAvatar("custom");
    }
    else {
      setSelectedAvatar(userDetails?.proile_pic || "");
      setIsUploaded(false);
    }
  }, [userDetails, uploadedFile]);

  const handleSave = async () => {
    let response;
    if (selectedAvatar === "custom" && uploadedFile) {
      response = await changeAvatar("custom", undefined, uploadedFile);
    }
    else {
      response = await changeAvatar("default", selectedAvatar, undefined);
    }

    if (response.status === 200) {
      toast.success("Avatar changed successfully");
    }
    else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className='w-full p-5 flex items-center justify-between gap-12 border-2 border-solid border-button_hover rounded-2xl'>
      <div className='w-[60%] h-full flex flex-col gap-2'>
        <div className='flex gap-2'>
          <Image src="/avatar-icon.svg" alt='profile' width={30} height={30}/>
          <p className='text-[#7A7AFF] text-lg'>Change Avatar</p>
        </div>

        <div className='flex flex-wrap h-full w-full gap-5'>
          {defaultAvatars.map((avatar, index) => (
            <div 
              key={index} 
              className='h-[5.5rem] w-[5.5rem] rounded-lg p-2 relative hover:bg-bg_hover'
              onClick={() => setSelectedAvatar(`/Avatars/${avatar}`)}
            >
              {selectedAvatar === `/Avatars/${avatar}` && (
                <Image src="/checked-icon-2.svg" alt='checked' width={20} height={20} className='rounded-full absolute z-10 translate-x-[3.2rem]'/>
              )}
              <Image src={`/Avatars/${avatar}`} alt='profile' width={73} height={73} className='rounded-full absolute'/>
            </div>
          ))}

          {uploadedFile && (
            <div 
              className='max-h-[5.5rem] max-w-[5.5rem] min-h-[5.5rem] min-w-[5.5rem] p-2 relative rounded-lg hover:bg-bg_hover'
              onClick={() => setSelectedAvatar("custom")}
            >
              {selectedAvatar === "custom" && (
                <Image src="/checked-icon-2.svg" alt='checked' width={20} height={20} className='rounded-full absolute z-10 translate-x-[3.2rem]'/>
              )}
              <img
                src={getPreview(uploadedFile)}
                className='rounded-full object-cover h-full w-full'
              />
            </div>
          )}

          <UploadUserProfileImage uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} setSelectedAvatar={setSelectedAvatar}/>
        </div>
      </div>

      <div className='w-[25%] h-full flex flex-col items-center justify-center gap-4'>
        <div className='w-[14rem] h-[11rem] rounded-2xl bg-primary_bg flex flex-col justify-center items-center gap-1'>
          <p className='text-gray-500 text-[0.9rem]'>Preview</p>
          {(selectedAvatar === "custom" && uploadedFile) ? (
            <div className='h-[5.2rem] w-[5.2rem] rounded-xl pb-1'>
              <img
                src={getPreview(uploadedFile)}
                className='rounded-xl object-cover h-full w-full'
                alt='uploaded-preview'
              />
            </div>
          ):(
            <div className='h-[5.2rem] w-[5.2rem] rounded-xl pb-1'>
              <Image src={selectedAvatar} alt='profile' width={90} height={90} className='rounded-xl'/>
            </div>
          )}
          <div className='flex flex-col justify-center items-center pt-1'>
            <p className='text-primary_font text-xl font-semibold leading-5'>{userDetails?.name}</p>
            <p className='text-gray-700 text-sm font-semibold'>@{userDetails?.username}</p>
          </div>
        </div>
        <Button 
          className="h-8 w-max rounded-full flex items-center gap-2 bg-[#E5EDFF] hover:bg-[#D9D9FF]" 
          onClick={handleSave}
          disabled={selectedAvatar === userDetails?.proile_pic}
        >
          <p className='text-primary_font text-xs font-medium leading-4'>Save Changes</p>
        </Button>
      </div>
    </div>
  )
}

export default ChangeAvatar
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import ProfileUpload from './ProfileUpload';

type Props = {
  uploadedFile?: File | undefined;
  setUploadedFile: (file: File | undefined) => void;
  setSelectedAvatar?: (avatar: string) => void;
};

const UploadUserProfileImage = ({ uploadedFile, setUploadedFile, setSelectedAvatar }: Props) => {
  const [preview, setPreview] = useState<string>();

  const handleCancel = () => {
    setUploadedFile(undefined);
    setPreview(undefined);
    setSelectedAvatar && setSelectedAvatar('');
  };

  const handleFileChange = (file: File) => {
    setUploadedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className='h-[5.5rem] w-[5.5rem] p-2 cursor-pointer'>
            <div className='rounded-full bg-bg_hover h-full w-full flex flex-col justify-center items-center hover:bg-[#D9D9FF]'>
              <Image src="/upload-icon-4.svg" alt='profile' width={24} height={24}/>
              <p className='text-primary_font_2 text-sm font-semibold leading-4'>Upload</p>
            </div>  
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[26rem] p-4">
          <AlertDialogHeader className="flex flex-row justify-between gap-[6.5rem]">
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#E5EDFF]">
                <Image
                  src="/profile-icon.svg"
                  width={18}
                  height={18}
                  alt="profile"
                />
              </div>
              <p className="font-medium text-sm">Upload profile picture</p>
            </div>
          </AlertDialogHeader>

          <AlertDialogDescription>
                {uploadedFile ? (
                  <div className="h-[11rem] w-full flex justify-center items-center bg-[#E5EDFF] rounded-lg">
                    <div className="relative h-[9rem] w-[7.5rem] mt-2">
                      <div className="absolute h-[9rem] w-[7.5rem] flex flex-col justify-center items-center gap-1 rounded-xl">
                        {preview && (
                          <img
                            src={preview}
                            alt={uploadedFile.name}
                            className='rounded-xl h-[7.5rem] w-[7.5rem] object-cover'
                          />
                        )}
                        <p className="text-primary_font font-medium text-sm truncate w-full text-center">
                          File uploaded
                        </p>
                      </div>

                      <button
                        title="Remove"
                        className="absolute rounded-full p-2 bg-[#FFE3E5]  hover:bg-[#FFCDD0] top-0 right-0 transform translate-x-[45%] -translate-y-[45%]"
                      >
                        <Image
                          src="/delete-icon.svg"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancel();
                          }}
                          width={16}
                          height={16}
                          alt="Delete icon"
                        />
                      </button>
                    </div>
                  </div>
                ) : (
                  <ProfileUpload setUploadedFile={handleFileChange} />
                )}
              
          </AlertDialogDescription>

          <AlertDialogFooter className="flex gap-4">
            <AlertDialogAction className="w-[50%] rounded-full bg-primary_font_2 text-white hover:bg-[#9F9FFF]">
              Select
            </AlertDialogAction>
            <AlertDialogCancel
              className="w-[50%] rounded-full hover:bg-[#D2D4DA] hover:text-black"
              onClick={handleCancel}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UploadUserProfileImage;

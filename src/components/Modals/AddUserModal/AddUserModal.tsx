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
import { Button } from '@/components/ui/button';
import {toast } from 'sonner';
import UserForm from './UserForm';
import UserUpload from './UserUpload';
import addUser from '@/utils/api/addUserByInfoAPI';
import csvUser from '@/utils/api/addUserByFileAPI';
import UploadedFileDisplay from '@/components/UploadedFileDisplay';

const AddUserModal = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    username: '',
    code: 0,
    contact: 0,
  });
  const [addMethod, setAddMethod] = useState(true);
  const [uploadedfile, setUploadedfile] = useState<File>();
  const [emailValid, setEmailValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);

  const handleSubmit = async () => {
    try {
      if (addMethod) {
        const modifiedUserInfo = {
          name: userInfo.name,
          email: userInfo.email,
          username: userInfo.username,
          number: `+${userInfo.code.toString()}${userInfo.contact.toString()}`,
        };
        const response = await addUser(modifiedUserInfo);
        if (response.status === 200) {
          toast.success('User added successfully');
        } else {
          toast.error(response.data.message);
        }
      } else {
        if (uploadedfile) {
          const response = await csvUser(uploadedfile);
          if (response.status === 200) {
            toast.success('User added successfully');
          } else {
            toast.error(response.data.message);
          }
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild className="bg-transparent p-0">
          <Button
            title="Add user"
            className="h-9 w-9 rounded-md bg-bg_hover flex justify-center align-center cursor-pointer hover:bg-[#D5D5FB]"
          >
            <Image src="/add-user.svg" alt="add user" width={18} height={18} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[33rem] pb-4">
          <AlertDialogHeader className="flex flex-row justify-between gap-[6.5rem]">
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#E5EDFF]">
                <Image
                  src="/add-user-2.svg"
                  width={18}
                  height={18}
                  alt="manage"
                />
              </div>
              <p className="text-[#7A7AFF] font-semibold text-base">Add user</p>
            </div>

            <AlertDialogCancel
              className="w-9 h-9 p-[0.6rem] rounded-full bg-[#E5EDFF] mt-0"
              onClick={(e) => {
                e.stopPropagation();
                setUploadedfile(undefined);
              }}
            >
              <Image
                src="/cross-icon-blue.svg"
                width={20}
                height={20}
                className="rounded-full"
                alt="close icon"
              />
            </AlertDialogCancel>
          </AlertDialogHeader>

          <AlertDialogDescription>
            {addMethod ? (
              <UserForm
                emailValid={emailValid}
                usernameValid={usernameValid}
                setUserInfo={setUserInfo}
                setEmailValid={setEmailValid}
                setUsernameValid={setUsernameValid}
              />
            ) : (
              <>
                {uploadedfile ? (
                  <UploadedFileDisplay
                    uploadedfile={uploadedfile}
                    setUploadedfile={setUploadedfile}
                  />
                ) : (
                  <UserUpload setUploadedFile={setUploadedfile} />
                )}
              </>
            )}
          </AlertDialogDescription>

          <AlertDialogFooter className="flex justify-between mt-4">
            <div>
              {addMethod ? (
                <Button
                  className="bg-[#E5EDFF] rounded-full flex gap-2 hover:bg-[#D5DDFF]"
                  onClick={() => setAddMethod(!addMethod)}
                >
                  <Image
                    src="/upload-icon-3.svg"
                    width={18}
                    height={18}
                    alt="add user"
                  />
                  <p className="text-primary_font font-semibold text-base">
                    Upload a .csv file
                  </p>
                </Button>
              ) : (
                <Button
                  className="bg-[#E5EDFF] rounded-full flex gap-2 hover:bg-[#D5DDFF]"
                  onClick={() => setAddMethod(!addMethod)}
                >
                  <p className="text-primary_font font-semibold text-base">
                    Enter user details
                  </p>
                </Button>
              )}
            </div>
            <AlertDialogAction
              onClick={handleSubmit}
              className="rounded-full px-10 text-white font-medium bg-primary_font hover:text-primary_font border-2 border-solid border-primary_font"
              disabled={
                (!userInfo.name ||
                  !userInfo.email ||
                  !userInfo.username ||
                  !userInfo.contact ||
                  !usernameValid ||
                  !emailValid) &&
                !uploadedfile
              }
            >
              Add User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddUserModal;

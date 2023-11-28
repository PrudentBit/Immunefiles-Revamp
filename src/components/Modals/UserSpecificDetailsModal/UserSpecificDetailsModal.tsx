import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import UserDetailsBody from './UserDetailsBody';

type Props = {
  user: AdminUsersType;
};

const UserSpecificDetails = ({ user }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        className="w-[3.8rem] h-[3.8rem] p-6 flex justify-center items-center rounded-xl cursor-pointer hover:bg-bg_hover"
      >
        <Image src="/right-arrow-purple.svg" alt="more" width={6} height={6} />
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[40rem] left-[98%] translate-x-[-100%]">
        <AlertDialogHeader className="flex flex-row justify-between gap-[6.5rem]">
          <div className="flex gap-4">
            <Image
              src="/user.svg"
              alt="profile"
              width={70}
              height={70}
              className="rounded-full"
            />
            <div className="flex flex-col justify-center gap-1">
              <p className="text-primary_font text-lg font-semibold leading-5">
                {user?.name}
              </p>
              <p className="text-black text-base font-normal leading-4">
                {user?.email}
              </p>
            </div>
          </div>

          <AlertDialogCancel
            className="w-9 h-9 p-[0.6rem] rounded-full bg-[#E5EDFF] mt-0"
            onClick={(e) => e.stopPropagation()}
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

        <AlertDialogDescription className="h-[76vh] overflow-y-auto pr-4">
          <UserDetailsBody username={user.username} />
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserSpecificDetails;

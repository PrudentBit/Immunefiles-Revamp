'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { toast } from 'sonner';
import editGroup from '@/utils/api/editGroupAPI';
import { decryptData } from '@/utils/helper/decryptFiles';
import { GroupStore } from '@/utils/store/groupDetailsStore';

type Props = {
  groupHash: string;
  type: 'groupModal' | 'manageGroups'
};

const DeleteGroupAlert = ({type, groupHash}: Props) => {
  const { toggleForceRefresh } = GroupStore();

  const handleDelete = async () => {
    const response = await editGroup({action: "delete", group_hash: groupHash});
    const decryptedGroupData = decryptData(response.data.ciphertext);
    if (response.status === 200) {
      toggleForceRefresh();
      toast.success('Group deleted successfully');
    }
    else{
      toast.error('Something went wrong',{
        description: decryptedGroupData.message
      });
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {type === 'groupModal' ? (
            <div 
              className='p-2 h-8 flex items-center gap-1 font-normal bg-transparent rounded-lg text-red-400 hover:bg-[#FFE3E5]'
            >
              <Image src="/delete-icon-2.svg" width={18} height={18} alt='delete'/>
              Delete Group
            </div>
          ):(
            <button title='Delete' className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#FF6161] bg-white hover:bg-[#FFE3E5]'>
              <Image src='/delete-icon-2.svg' width={16} height={16} alt='Fav icon'/>
            </button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent className="translate-y-[-210%]">
          <AlertDialogHeader className="flex flex-row items-center gap-3">
            <Image
              src="/trash-icon.svg"
              width={20}
              height={20}
              className="rounded-full w-10 h-10 p-2 bg-[#FFEBEB]"
              alt="delete icon"
            />
            <div className="flex flex-col h-full">
              <AlertDialogTitle className="font-medium text-md">
                Do you want to delete these groups?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs">
                You can restore deleted items from trash
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-4">
            <AlertDialogAction
              className="w-[50%] rounded-full bg-[#FF6161] text-white hover:bg-[#FF7F7F]"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
            <AlertDialogCancel
              className="w-[50%] rounded-full hover:bg-[#D2D4DA] hover:text-black"
              onClick={(e) => e.stopPropagation()}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteGroupAlert;

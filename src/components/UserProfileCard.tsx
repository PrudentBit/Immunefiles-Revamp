import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"
import Link from "next/link"

type Props = {
  userDetails?: UserDetailsType
}

const UserProfileCard = ({userDetails}: Props) => {

  const getProfileImage = () => {
    if(userDetails?.profile_type === "custom") {
      return userDetails?.proile_pic
    }
    else if(userDetails?.profile_type === "default") {
      return `/Avatar/${userDetails?.proile_pic}.svg`
    }
    else {
      return `/Avatar/${userDetails?.proile_pic}.png`
    }
  }

  return (
    <Popover>
      <PopoverTrigger >
        <div className='flex gap-2 cursor-pointer'>
          <Image src={getProfileImage()} alt='profile' width={45} height={45} className='rounded-lg'/>
          <div className='text-left'>
            <p className='text-black font-normal text-sm h-4'>Hello</p>
            <p className='text-primary_font_2 text-lg font-semibold whitespace-nowrap'>{userDetails?.name}</p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="mr-4 rounded-2xl w-[18.5rem] flex flex-col gap-5 p-5">
        <div className='flex gap-3 cursor-pointer w-full'>
          <div className="min-w-[6rem]">
            <Image src={getProfileImage()} alt='profile' width={90} height={90} className='rounded-lg'/>
          </div>
          <div className='text-left h-[5.3rem] w-[9rem] flex flex-col justify-between'>
            <p className='text-lg font-semibold whitespace-nowrap leading-6 truncate'>{userDetails?.name}</p>
            <p className='text-gray-400 text-sm whitespace-nowrap'>@{userDetails?.username}</p>
            <Link href="/manageaccount" className="flex items-center justify-center text-primary_font h-8 w-full px-2 mt-2 text-sm font-medium leading-4 bg-white border-solid border-[1px] border-primary_font hover:bg-primary_font hover:text-white rounded-lg">
              Manage Account
            </Link>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap w-fit">
          <div className="pl-2 pr-4 h-7 w-max rounded-full flex items-center  gap-2 bg-[#E5EDFF]">
            <Image src="/suitcase-icon.svg" alt='company' width={20} height={20}/>
            <p className='text-primary_font text-sm font-normal leading-4'>{userDetails?.domain}</p>
          </div>

          <div className="pl-2 pr-4 h-7 rounded-full flex items-center  gap-2 bg-bg_hover">
            <Image src="/employee-icon.svg" alt='company' width={20} height={20}/>
            <p className='text-primary_font_2 text-sm font-normal leading-4'>Employee</p>
          </div>

          <div className="pl-2 pr-4 h-7 rounded-full flex items-center  gap-2 bg-[#E5EDFF]">
            <Image src="/mail-icon.svg" alt='company' width={20} height={20}/>
            <p className='text-primary_font text-sm font-normal leading-4'>{userDetails?.email}</p>
          </div>

          <div className="pl-2 pr-4 h-7 rounded-full flex items-center  gap-2 bg-bg_hover">
            <Image src="/phone-icon.svg" alt='company' width={16} height={16}/>
            <p className='text-primary_font_2 text-sm font-normal leading-4'>{userDetails?.phone_number}</p>
          </div>

          <div className="pl-2 pr-4 h-7 rounded-full flex items-center  gap-2 bg-[#D0FFE3]">
            <Image src="/admin-icon-3.svg" alt='company' width={20} height={20}/>
            <p className='text-[#3ABA6E] text-sm font-normal leading-4'>Admin</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default UserProfileCard
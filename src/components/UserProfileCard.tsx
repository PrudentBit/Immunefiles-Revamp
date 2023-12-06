import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"

type Props = {
  userDetails?: UserDetailsType
}

const UserProfileCard = ({userDetails}: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className='flex gap-2 cursor-pointer'>
          <Image src="/user.svg" alt='profile' width={45} height={45} className='rounded-lg'/>
          <div className='text-left'>
            <p className='text-black font-normal text-sm h-4'>Hello</p>
            <p className='text-primary_font_2 text-lg font-semibold whitespace-nowrap'>{userDetails?.name}</p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex gap-2 cursor-pointer'>
          <Image src="/user.svg" alt='profile' width={45} height={45} className='rounded-lg'/>
          <div className='text-left'>
            <p className='text-black font-normal text-sm h-4'>Hello</p>
            <p className='text-primary_font_2 text-lg font-semibold whitespace-nowrap'>{userDetails?.name}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default UserProfileCard
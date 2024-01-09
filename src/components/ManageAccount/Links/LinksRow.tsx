import Image from 'next/image'
import Link from 'next/link';
import { toast } from 'sonner';

type Props = {
  link: sharedLinksType;
}

const LinksRow = ({link}: Props) => {

  const handleCopy = () => {
    navigator.clipboard.writeText(link.url);
    toast.success('Link copied successfully');
  }

  return (
    <div className='h-[3.8rem] w-full rounded-xl flex items-center justify-between p-4 pr-8 gap-7 bg-primary_bg'>
      <div className='flex gap-4 items-center w-[50%]'>
        <div className='flex gap-2'>
          <Image src="/link-icon.svg" alt='link' width={22} height={22}/>
          <Link href={link.url} target='_blank' className='text-primary_font text-lg font-medium leading-5 truncate w-[30rem]'>{link.name}</Link>
        </div>
      </div>

      <div className='flex gap-6 items-center'>
        <button title='Copy link' onClick={handleCopy} className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#ABC5FF] bg-white hover:bg-[#DEE8FF]'>
          <Image src='/copy-icon-2.svg' width={17} height={17} alt='copy icon'/>
        </button>
        <button title='Logs' className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#ABC5FF] bg-white hover:bg-[#DEE8FF]'>
          <Image src='/logs-icon.svg' width={17} height={17} alt='logs icon'/>
        </button>
        <button title='Favourite' className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#ABC5FF] bg-white hover:bg-[#DEE8FF]'>
          <Image src='/favourite-icon-2.svg' width={15} height={15} alt='Fav icon'/>
        </button>
        <button title='Download' className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#3ABA6E] bg-white hover:bg-[#E1FFED]'>
          <Image src='/download-icon-green.svg' width={18} height={18} alt='Download icon'/>
        </button>
        <button title='Delete' className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#FF6161] bg-white hover:bg-[#FFE3E5]'>
          <Image src='/delete-icon-2.svg' width={16} height={16} alt='delete icon'/>
        </button>
        <button title='Manage' className='flex items-center justify-center rounded-lg h-8 w-20 border border-[#8E8EFF] bg-white hover:bg-[#EAEAFF]'>
          <p className='text-[#8E8EFF]'> Manage </p>
        </button>
      </div>
    </div>
  )
}

export default LinksRow
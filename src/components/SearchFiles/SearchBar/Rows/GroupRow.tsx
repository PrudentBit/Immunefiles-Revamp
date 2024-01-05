import Image from "next/image"

type Props = {}

const GroupRow = (props: Props) => {
  return (
    <div className="flex p-2 px-5 items-center justify-between gap-4 rounded-xl border border-solid border-[#CEDDFF] hover:bg-[#F5F8FF]">
      <Image src="/group-icon-6.svg" height={28} width={28} alt="temp"/>

      <p className="w-[70%] truncate mr-16 text-primary_font_2">Group name</p>

      <div className="flex justify-between items-center gap-4">
        <button title='Manage' className='flex items-center justify-center rounded-lg h-8 w-20 border border-[#8E8EFF] bg-white hover:bg-[#EAEAFF]'>
          <p className='text-[#8E8EFF]'> Manage </p>
        </button>
        <button title='Pin' className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#ABC5FF] bg-white hover:bg-[#DEE8FF]'>
          <Image src='/pin-icon.svg' width={15} height={15} alt='Pin icon'/>
        </button>
      </div>
    </div>
  )
}

export default GroupRow
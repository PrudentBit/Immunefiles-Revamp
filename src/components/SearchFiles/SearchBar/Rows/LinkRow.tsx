import Image from 'next/image'

const LinkRow = () => {
  return (
    <div className="flex p-2 px-5 items-center justify-between gap-4 rounded-xl border border-solid border-[#CEDDFF] hover:bg-[#F5F8FF]">
      <Image src="/link-icon-5.svg" height={28} width={28} alt="temp"/>

      <p className="w-[70%] truncate mr-16 text-primary_font_2">Link name</p>

      <div className="flex justify-between items-center gap-4">
        <button title='Manage' className='flex items-center justify-center rounded-lg h-8 w-20 border border-[#8E8EFF] bg-white hover:bg-[#EAEAFF]'>
          <p className='text-[#8E8EFF]'> Manage </p>
        </button>
        <button title='Mark as critical' className='flex items-center justify-center rounded-lg h-8 w-8  bg-white hover:bg-[#DEE8FF]'>
          <Image src='/critical-icon.svg' width={35} height={35} alt='Fav icon'/>
        </button>
        <button title='Copy link' className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#ABC5FF] bg-white hover:bg-[#DEE8FF]'>
          <Image src='/copy-icon-2.svg' width={17} height={17} alt='copy icon'/>
        </button>
      </div>
    </div>
  )
}

export default LinkRow
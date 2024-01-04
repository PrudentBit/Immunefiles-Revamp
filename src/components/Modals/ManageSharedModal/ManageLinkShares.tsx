import Image from "next/image"

const ManageLinkShares = () => {
  return (
    <div className="w-full h-[13.5rem] flex flex-col gap-2 p-4 mt-4 border border-solid border-[#7A7AFF] rounded-2xl">
      <div className='w-full h-14 flex justify-between items-center px-4 cursor-pointer border border-solid border-[#CEDDFF] hover:bg-[#F5F8FF] rounded-lg'>
        <div className="flex gap-3">
          <Image src="/link-icon-5.svg" width={22} height={22} alt='link icon'/>
          <p className="text-[#7A7AFF] text-[1.05rem]">Link name</p>
        </div>

        <div className="flex gap-3">
          <button title='Manage' className='flex items-center justify-center rounded-lg h-8 w-[5rem] border border-[#8E8EFF] bg-white hover:bg-[#DEE8FF]'>
            <p className="text-[#8E8EFF]">Manage</p>
          </button>
          <button title='Mark as critical' className='flex items-center justify-center rounded-lg h-8 w-8  bg-white hover:bg-[#DEE8FF]'>
            <Image src='/critical-icon.svg' width={35} height={35} alt='Fav icon'/>
          </button>
          <button title='Copy link' className='flex items-center justify-center rounded-lg h-8 w-8 border border-[#ABC5FF] bg-white hover:bg-[#DEE8FF]'>
            <Image src='/copy-icon-2.svg' width={17} height={17} alt='copy icon'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManageLinkShares
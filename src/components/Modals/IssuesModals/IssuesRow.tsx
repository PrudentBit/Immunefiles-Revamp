import Image from "next/image"

type Props = {}

const IssuesRow = (props: Props) => {
  return (
    <div className='w-full min-h-[7rem] flex flex-col gap-2 p-3 px-4 pr-6 bg-primary_bg rounded-md'>
      <div className='flex justify-between'>
        <div className='flex gap-2'> 
          <Image src='/bug-icon.svg' alt='bug' width={20} height={20}/>
          <p className='text-primary_font text-[1.1rem] leading-[1.45rem]'>Issue heading</p>
          <p className='mb-[0.1rem] leading-[1.6rem] text-gray-900 ml-2'>12-12-2023</p>
          <p className='mb-[0.1rem] leading-[1.6rem] text-gray-900'>12:00 PM</p>
        </div>
        <div className='flex gap-2 items-center justify-center'>
          <div className={`h-2 w-2 rounded-full ${true ? "bg-green-500" : "bg-red-500"} mt-[0.1rem]`}></div>
          <p className={`${true ? "text-green-500" : "text-red-500"} text-[0.83rem] font-medium`}>{true?("Resolved"):("Pending")}</p>
        </div>
      </div>

      <p className='text-gray-800 text-base font-normal overflow-hidden overflow-ellipsis max-w-[30rem]'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptatem rem debitis voluptates esse, cupiditate necessitatibus aliquid a deleniti consectetur.
      </p>            
    </div>
  )
}

export default IssuesRow
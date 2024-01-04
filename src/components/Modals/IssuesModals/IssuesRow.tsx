import Image from "next/image"

type Props = {
  issue: reportedIssueType
}

const IssuesRow = ({issue}: Props) => {

  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatTime = (dateString: string) => {
    const options = { hour: "2-digit", minute: "2-digit" } as const;
    return new Date(dateString).toLocaleTimeString("en-US", options);
  };

  return (
    <div className='w-full min-h-[7rem] flex flex-col gap-2 p-3 px-4 pr-6 bg-primary_bg rounded-md'>
      <div className='flex justify-between'>
        <div className='flex gap-2'> 
          <Image src='/bug-icon.svg' alt='bug' width={20} height={20}/>
          <p className='text-primary_font text-[1.1rem] leading-[1.45rem]'>{issue.title}</p>
          <p className='mb-[0.1rem] leading-[1.6rem] text-xs text-gray-900 font-medium ml-2'>{formatDate(issue.date)}</p>
          <p className='mb-[0.1rem] leading-[1.6rem] text-xs text-gray-900 font-medium'>{formatTime(issue.date)}</p>
        </div>
        <div className='flex gap-2 items-center justify-center'>
          <div className={`h-2 w-2 rounded-full ${issue.status==="Resolved" ? "bg-green-500" : "bg-red-500"} mt-[0.1rem]`}></div>
          <p className={`${issue.status==="Resolved" ? "text-green-500" : "text-red-500"} text-[0.83rem] font-medium`}>{issue.status}</p>
        </div>
      </div>

      <p className='text-gray-700 pl-2 text-base font-normal break-words overflow-hidden max-w-[30rem]'>
        {issue.description}
      </p>            
    </div>
  )
}

export default IssuesRow
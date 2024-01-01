import {useState} from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogTrigger,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Select,
  SelectTrigger, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/select'
import IssuesRow from './IssuesRow'
import ReportIssueModal from './ReportIssueModal'

const TrackIssuesModal = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className='h-8 mr-4 flex gap-2 px-2 bg-[#7A7AFF] hover:bg-[#9797FF] shadow-[0px_2px_30px_rgba(0,0,0,0.16)]'>
            <Image src='/notepad-icon.svg' alt='track' width={18} height={18} />
            <p className='text-base font-normal mb-1'>Track issues</p>
          </Button>
        </AlertDialogTrigger>
				<AlertDialogOverlay className='backdrop-blur-[0px]'/>
        <AlertDialogContent className='w-[40rem] pb-4'>
          <AlertDialogHeader className='flex flex-row justify-between gap-[6.5rem]'>
            <div className='flex gap-3 items-center'>
              <div className='rounded-full w-10 h-10 flex items-center justify-center bg-[#E5EDFF]'>
                <Image src="/burgermenu-icon.svg" width={18} height={18}  alt='report'/>
              </div>  
              <p className='text-black font-semibold text-base'>Track reported issue</p>
            </div>

            <AlertDialogCancel className='w-9 h-9 p-[0.6rem] rounded-full bg-[#E5EDFF] mt-0' onClick={(e) => e.stopPropagation()}>
              <Image src="/cross-icon-blue.svg" width={20} height={20} className='rounded-full' alt='close icon'/>
            </AlertDialogCancel>
          </AlertDialogHeader>

          <AlertDialogDescription className='h-[25rem] flex flex-col gap-4 mr-2'>
            <div className='flex gap-4'>
              <form action="" className='flex items-center gap-4 w-full h-10 px-3 rounded-md justify-between bg-[#F0F0F0]'>
                <button>
                    <Image src="/search.png" alt='search' width={20} height={25}/>
                </button>
                <input 
                  type="text" 
                  placeholder='Search here...' 
                  className='h-full w-full bg-transparent' 
                  value={searchTerm} 
                  onChange={handleSearchChange}
                />
              </form>

              <Select>
                <SelectTrigger className='w-[10rem] h-10 flex items-center justify-between bg-bg_hover'>
                  <p className='text-[#7A7AFF] pl-2 text-base font-medium'>Sort by</p>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="feature">Feature</SelectItem>
                  <SelectItem value="question">Question</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='h-[21.5rem] p-2 border border-solid border-[#C6D8FF] rounded-xl'>
              <div className='h-full w-full p-1 px-2 pr-4 flex flex-col gap-4 overflow-auto'>
                <IssuesRow/>
                <IssuesRow/>
                <IssuesRow/>
                <IssuesRow/>
                <IssuesRow/>
                <IssuesRow/>
                <IssuesRow/>
              </div>
            </div>

          </AlertDialogDescription>

          <AlertDialogFooter className='flex justify-end'>
            <AlertDialogAction className='rounded-full px-4 text-white font-normal text-base bg-primary_font hover:text-primary_font border-2 border-solid border-primary_font'>Send Report</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default TrackIssuesModal
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AddNewServerModal from "@/components/Modals/AddNewServerModal"


type Props = {
  urlhash: string
}

const IntegrationHeader = ({urlhash}: Props) => {
  return (
    <div className='w-full flex justify-between h-[7%]'>
      <div className='flex gap-4'>
        <Link href={`/integrations`} className='h-10 w-10 bg-[#E5EDFF] flex justify-center items-center rounded-sm hover:bg-bg_hover'>
          <Image src='/left-arrow-blue.svg' width={20} height={20} alt="back"/>
        </Link>

        {urlhash == 'googledrive' ? (
          <div className="relative h-10 w-10 p-1 rounded-sm">
            <div className={`absolute inset-0 bg-gradient-to-b from-green-700 via-blue-600 to-yellow-400 opacity-[35%] rounded-sm`}></div>
            <div className="relative h-full w-full flex items-center justify-center">
              <Image src='/google-drive.svg' width={18} height={18} alt="server"/>
            </div>
          </div>
        ):(
          <div className="relative h-10 w-10 p-1 rounded-sm">
            <div className={`absolute inset-0 bg-gradient-to-b from-gray-400 via-blue-400 to-blue-500 opacity-[35%] rounded-sm`}></div>
            <div className="relative h-full w-full flex items-center justify-center">
              <Image src='/one-drive.svg' width={18} height={18} alt="server"/>
            </div>
          </div>
        )}
      </div>

      <div className='flex gap-4'>
        <Button className='h-10 w-10 p-0 bg-[#EEEEEE] flex justify-center items-center rounded-sm hover:bg-[#DDDDDD]'>
          <Image src='/refresh-icon.svg' width={22} height={22} alt="refresh"/>
        </Button>

        <Button className='h-10 w-10 p-0 bg-[#EEEEEE] flex justify-center items-center rounded-sm hover:bg-[#DDDDDD]'>
          <Image src='/sync-icon.svg' width={22} height={22} alt="sync"/>
        </Button>

        <AddNewServerModal urlhash={urlhash} navButton={true}/>
      </div>
    </div>
  )
}

export default IntegrationHeader
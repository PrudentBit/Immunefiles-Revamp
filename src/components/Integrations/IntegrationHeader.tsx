"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AddNewServerModal from "@/components/Modals/AddNewServerModal"
import ServerSortBy from "./ServerSortBy"
import { selectedServersStore } from "@/utils/store/integrationsStore"

type Props = {
  drive: string
}

const IntegrationHeader = ({drive}: Props) => {
  const {selectedServers, totalServers, removeAll} = selectedServersStore();

  return (
    <div className='w-full flex justify-between h-[7%]'>
      <div className='flex gap-4'>
        <Link href={`/integrations`} className='h-10 w-10 bg-[#E5EDFF] flex justify-center items-center rounded-sm hover:bg-bg_hover'>
          <Image src='/left-arrow-blue.svg' width={20} height={20} alt="back"/>
        </Link>

        <ServerSortBy/>

        {drive == 'googledrive' ? (
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

      {selectedServers.length > 0 ? (
        <div className="flex gap-4 items-center">
          <Button title="delete all" className="flex items-center gap-2 rounded-full h-7 bg-red-100 hover:bg-red-200">
            <Image src='/delete-icon.svg' width={15} height={15} alt='delete' />
            <p className='text-red-500 text-[0.82rem]'>Delete selected</p>
          </Button>

          <div className="flex items-center gap-3">
            <p> {selectedServers.length} Selected</p>

            <button className='rounded-full bg-[#F0F0F0] hover:bg-[#DADADA] flex justify-center items-center h-8 w-8' onClick={removeAll}>
              <Image src='/cross-icon.svg' width={12} height={12} alt='Cross icon'/>
            </button>
          </div>
        </div>
      ):(
        <div className='flex gap-4'>
          {totalServers > 0 ? (
            <>
              <Button title="refresh" className='h-10 w-10 p-0 bg-[#D0FFE3] flex justify-center items-center rounded-sm hover:bg-[#ABEDC6]'>
                <Image src='/refresh-icon-green.svg' width={22} height={22} alt="refresh"/>
              </Button>

              <Link title="sync servers" href={`/integrations/${drive}/syncserver`} className='h-10 w-10 p-0 bg-bg_hover flex justify-center items-center rounded-sm hover:bg-[#C7C7FF]'>
                <Image src='/sync-icon-purple.svg' width={22} height={22} alt="sync"/>
              </Link>
            </>
          ):(
            <>
              <Button title="refresh" className='h-10 w-10 p-0 bg-[#EEEEEE] flex justify-center items-center rounded-sm'>
                <Image src='/refresh-icon.svg' width={22} height={22} alt="refresh"/>
              </Button>

              <div title="sync servers" className='h-10 w-10 p-0 cursor-pointer bg-[#EEEEEE] flex justify-center items-center rounded-sm'>
                <Image src='/sync-icon.svg' width={22} height={22} alt="sync"/>
              </div>
            </>
          )}

          <AddNewServerModal drive={drive} navButton={true}/>
        </div>
      )}
    </div>
  )
}

export default IntegrationHeader
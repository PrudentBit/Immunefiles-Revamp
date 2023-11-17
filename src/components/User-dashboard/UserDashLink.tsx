import React from 'react'
import ShadowedCard from '@/components/ShadowedCard'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import UserDashLinkGraph from './UserDashLinkGraph'

type Props = {
	linkDetails?: UserDashDetails['links'];
}

const UserLinkAnalytics = ({linkDetails}: Props) => {
  return (
    <ShadowedCard className='w-[70%] flex flex-col p-10 justify-between'>
			<div className='flex justify-between items-center mb-2'>
				<div className='flex gap-2 h-5 items-center'>
					<Image src='/link-analytics-icon.svg' width={24} height={24} alt="storage"/>
					<p className='text-[#7A7AFF] text-lg font-medium leading-4'>Link Analytics</p>
				</div>

				<div className='flex item-center justify-center gap-6 pt-1 pr-2'>
					<div className='flex gap-1 items-center'>
						<p className='text-[#7A7AFF] text-xs font-medium leading-3 pr-2'>Change weeks</p>

						<button className='flex justify-center items-center h-4 w-4 rounded-sm bg-[#E5EDFF]'>
							<Image src='/left-arrow-2.svg' width={15} height={15} alt="arrow-left"/>
						</button>
						<button className='flex justify-center items-center h-4 w-4 rounded-sm bg-[#E5EDFF]'>
							<Image src='/left-arrow-2.svg' width={15} height={15} alt="arrow-right"  className=' rotate-180'/>
						</button>
					</div>

					<p className='text-sm font-semibold'>Mon'--</p>
				</div>
			</div>

			<div className='w-full h-[11rem] px-4 pr-5'>
				<UserDashLinkGraph/>
			</div>

			<div className='w-full h-10 flex justify-between items-center px-4'>
				<div className='flex h-10 w-[65%] gap-12 px-8 justify-between items-center rounded-lg border-[1px] border-solid border-primary_border'>
					<p className='text-[#7A7AFF] text-sm font-normal leading-3'>Overall: </p>

					<div className='flex items-center justify-between w-full'>
						<p className='text-[#afafaf] text-[0.83rem] font-normal'><span className='text-gray-400 text-[0.88rem] font-semibold'>{linkDetails?.overall.total}</span> Generated</p>
						<p className='text-green-500 text-[0.83rem] font-normal'><span className='text-green-400 text-[0.88rem] font-semibold'>{linkDetails?.overall.active}</span> Active</p>
						<p className='text-red-500 text-[0.83rem] font-normal'><span className='text-red-400 text-[0.88rem] font-semibold'>{linkDetails?.overall.expired}</span> Expired</p>
					</div>
				</div>

				<Button variant='destructive' className='w-[25%] h-10 rounded-full bg-transparent text-red-500 border-[1px] border-solid border-red-500 hover:text-white'>
					Apply SOS
				</Button>
			</div>
		</ShadowedCard>
  )
}

export default UserLinkAnalytics
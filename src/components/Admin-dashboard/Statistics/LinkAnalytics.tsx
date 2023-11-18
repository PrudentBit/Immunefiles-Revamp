"use client"

import React from 'react'
import Image from 'next/image'
import ShadowedCard from '@/components/ShadowedCard'
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button } from '@/components/ui/button'
import TenantSOSModal from '@/components/Modals/TenantSOSModal';


type Props = {
  links?: AnalyticsData['links']
}

const LinkAnalytics = ({links}: Props) => {

  return (
    <ShadowedCard className='w-[40%] gap-0'>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex gap-2 h-5'>
          <Image src='/link-icon-3.svg' width={18} height={18} alt="storage"/>
          <p className='text-primary_font text-md font-medium leading-4'>Link Analytics</p>
        </div>

        <div className='rounded-full flex h-5 w-5 item-center justify-center bg-bg_hover'>
          <Image src='/info-icon.svg' width={4} height={4} alt="info"/>
        </div>
      </div>

			<div className='flex justify-between h-[60%] gap-4'>
        <div className='flex flex-col gap-2 w-[50%] h-full justify-center '>
					<div className='flex justify-between pl-2'>
						<div className='flex gap-2 items-center'>
							<div className='h-2 w-2 rounded-full bg-green-500 mt-[0.1rem]'></div>
							<p className='text-[#afafaf] text-[0.83rem] font-medium'><span className='text-gray-400 text-[0.88rem] font-semibold'>{links?.active || 0} </span>Active</p>
						</div>
						<div className='flex gap-2 items-center'>
							<div className='h-2 w-2 rounded-full bg-red-500 mt-[0.1rem]'></div>
							<p className='text-[#afafaf] text-[0.83rem] font-medium'><span className='text-gray-400 text-[0.88rem] font-semibold'>{links?.expired || 0} </span>Expired</p>
						</div>
					</div>

					<div className='pl-2'>
						<p className='text-[#afafaf] text-[0.83rem] font-medium'><span className='text-primary_font text-base font-semibold'>{links?.total || 0} </span>total links generated</p>
					</div>
				</div>

        <div className='w-[8.5rem]'>
        <CircularProgressbarWithChildren
            value={100}
            strokeWidth={4}
            circleRatio={0.6}
            styles={buildStyles({
              rotation: 0.7,
              trailColor: "red",
              pathColor: "red",
            })}
            className='z-[-1]'
          >
            <div style={{ width: "102%" }}>
              <CircularProgressbarWithChildren
                value={links?.percentage || 0}
                strokeWidth={6.5}
                circleRatio={0.6}
                styles={buildStyles({
                  rotation: 0.7,
                  trailColor: "transparent",
                  pathColor: "green",
                })}
              >
                <div className='flex flex-col justify-center items-center mb-6'>
                  <p className='text-3xl text-primary_font font-medium'>
                    {`${links?.percentage || 0}%`}
                  </p>
                  <p className='text-[#AFAFAF] text-sm font-semibold'>
                    active links
                  </p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>


			<div className='h-10 w-full'>
				<TenantSOSModal/>
			</div>
    </ShadowedCard>
  )
}

export default LinkAnalytics
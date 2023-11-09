"use client"

import React from 'react'
import Image from 'next/image'
import ShadowedCard from '@/components/ShadowedCard'
import { Button } from '@/components/ui/button'
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AdminManageStorage from '@/components/Modals/AdminManageStorage'

type Props = {
  storage?: AnalyticsData['storage'];
}

const StorageConsumption = ({storage}: Props) => {
  return (
    <ShadowedCard className='w-[30%] gap-0'>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex gap-3 h-5'>
          <Image src='/storage-consumption-icon.svg' width={20} height={20} alt="storage"/>
          <p className='text-primary_font text-base font-medium leading-4'>Storage Consumption</p>
        </div>

        <div className='rounded-full flex h-5 w-5 item-center justify-center bg-bg_hover'>
          <Image src='/info-icon.svg' width={4} height={4} alt="info"/>
        </div>
      </div>

      <div className='flex justify-between h-[70%] gap-4'>
        <div className='w-full h-full flex flex-col gap-2 justify-center pl-2'>
          <div className='flex gap-3 items-center'>
            <div className='h-2 w-2 rounded-full bg-primary_font mt-[0.1rem]'></div>
            <p className='text-[#afafaf] text-[0.83rem] font-medium'><span className='text-gray-400 text-[0.88rem] font-semibold'>{(Math.ceil((storage?.used || 0)*100))/100}GB </span>used</p>
          </div>
          <div className='flex gap-3 items-center'>
            <div className='h-2 w-2 rounded-full bg-[#D1DFFF] mt-[0.1rem]'></div>
            <p className='text-[#afafaf] text-[0.83rem] font-medium'><span className='text-gray-400 text-[0.88rem] font-semibold'>{storage?.alloted}GB </span>useable</p>
          </div>
          <div className='flex gap-3 items-center'>
            <div className='h-2 w-2 rounded-full bg-gray-200 mt-[0.1rem]'></div>
            <p className='text-[#afafaf] text-[0.83rem] font-medium'><span className='text-gray-400 text-[0.88rem] font-semibold'>{storage?.total || 0}GB </span>available</p>
          </div>
        </div>

        <div className='w-[18rem] h-full'>
          <CircularProgressbarWithChildren
            value={100}
            strokeWidth={4}
            circleRatio={0.6}
            styles={buildStyles({
              rotation: 0.7,
              trailColor: "#ECECEC",
              pathColor: "#ECECEC",
            })}
            className='z-[-1]'
          >
            <div style={{ width: "101%" }}>
              <CircularProgressbarWithChildren
                value={((storage?.alloted|| 0)/(storage?.total || 100))*100}
                strokeWidth={5}
                circleRatio={0.6}
                styles={buildStyles({
                  rotation: 0.7,
                  trailColor: "transparent",
                  pathColor: "#D1DFFF",
                })}
              >
                <div style={{ width: "102%" }}>
                  <CircularProgressbarWithChildren
                    value={storage?.percentage || 0}
                    strokeWidth={6.5}
                    circleRatio={0.6}
                    styles={buildStyles({
                      rotation: 0.7,
                      trailColor: "transparent",
                      pathColor: "#4B7BEF",
                    })}
                  >
                    <div className='flex flex-col justify-center items-center mb-6'>
                      <p className='text-3xl text-primary_font font-medium'>
                        {`${storage?.percentage || 0}%`}
                      </p>
                      <p className='text-[#AFAFAF] text-sm font-semibold'>
                        used space
                      </p>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>

      <div className='flex justify-between items-center z-50'>
        <div className='flex gap-3 h-5 items-center'>
          <p className='text-black text-[0.85rem] font-medium leading-3 h-3'>Request more</p>
          <Image src='/right-arrow.svg' width={7} height={7} alt="storage"/>
        </div>

        <div className='flex gap-4 items-center justify-center'>
          <p className='text-xs text-green-500 font-medium h-4'>{((storage?.total || 0) - (Math.ceil((storage?.used  || 0 )*10))/10)}GB left</p>
          <AdminManageStorage storage={storage}/>
        </div>
      </div>
    </ShadowedCard>
  )
}

export default StorageConsumption
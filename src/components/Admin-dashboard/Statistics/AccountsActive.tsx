"use client"

import React from 'react'
import Image from 'next/image'
import ShadowedCard from '@/components/ShadowedCard'
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


type Props = {
  accounts?: AnalyticsData['users']
}

const AccountsActive = ({accounts}: Props) => {
  return (
    <ShadowedCard className='w-[30%] gap-0'>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex gap-3 h-5'>
          <Image src='/user-icon-2.svg' width={14} height={14} alt="storage"/>
          <p className='text-primary_font text-md font-medium leading-4'>Accounts Active</p>
        </div>

        <div className='rounded-full flex h-5 w-5 item-center justify-center bg-bg_hover'>
          <Image src='/info-icon.svg' width={4} height={4} alt="info"/>
        </div>
      </div>

      <div className='flex justify-between h-[70%] gap-4'>
        <div className='w-full h-full flex flex-col gap-2 justify-center pl-2'>
          <div className='flex gap-3 items-center'>
            <div className='h-2 w-2 rounded-full bg-primary_font mt-[0.1rem]'></div>
            <p className='text-[#afafaf] text-[0.83rem] font-medium'><span className='text-gray-400 text-[0.88rem] font-semibold'>{accounts?.active || 0} </span>Active</p>
          </div>
          <div className='flex gap-3 items-center'>
            <div className='h-2 w-2 rounded-full bg-[#D1DFFF] mt-[0.1rem]'></div>
            <p className='text-[#afafaf] text-[0.83rem] font-medium'><span className='text-gray-400 text-[0.88rem] font-semibold'>{accounts?.total || 0} </span>Total</p>
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
            <div style={{ width: "102%" }}>
              <CircularProgressbarWithChildren
                value={accounts?.percentage || 0}
                strokeWidth={6.5}
                circleRatio={0.6}
                styles={buildStyles({
                  rotation: 0.7,
                  trailColor: "transparent",
                  pathColor: "#4B7BE5",
                })}
              >
                <div className='flex flex-col justify-center items-center mb-6'>
                  <p className='text-3xl text-primary_font font-medium'>
                    {`${accounts?.percentage || 0}%`}
                  </p>
                  <p className='text-[#AFAFAF] text-sm font-semibold'>
                    used accounts
                  </p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex gap-3 h-5 items-center'>
          <p className='text-black text-[0.85rem] font-medium leading-3 h-3'>Request more</p>
          <Image src='/right-arrow.svg' width={7} height={7} alt="storage"/>
        </div>

        <div className='flex gap-4 items-center justify-center'>
          <p className={`text-xs ${(accounts?.active || 1) > ((accounts?.total || 2)/2 ) ? ("text-red-500"):("text-green-500")} font-medium h-4`}>{((accounts?.total || 0)-(accounts?.active || 0))} left</p>
        </div>
      </div>
    </ShadowedCard>
  )
}

export default AccountsActive
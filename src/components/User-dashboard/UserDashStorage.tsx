"use client"

import React from 'react'
import ShadowedCard from '@/components/ShadowedCard'
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Image from 'next/image'
import { Progress } from '@/components/ui/progress';

type Props = {}

const UserDashStorage = (props: Props) => {
  return (
    <ShadowedCard className='w-[30%] gap-1'>
      <div className='flex items-center gap-3 h-5'>
        <Image src='/storage-consumption-icon.svg' width={20} height={20} alt="storage"/>
        <p className='text-primary_font text-base font-medium leading-4'>Storage Analysis</p>
      </div>

      <div className='flex justify-between h-[35%] gap-4'>
        <div className='w-full h-full flex flex-col gap-2 justify-center pl-2'>
          <div className='flex gap-3 items-center'>
            <div className='h-2 w-2 rounded-full bg-primary_font mt-[0.1rem]'></div>
            <p className='text-[#afafaf] text-[0.83rem] font-medium'><span className='text-gray-400 text-[0.88rem] font-semibold'>--GB </span>used</p>
          </div>
          <div className='flex gap-3 items-center'>
            <div className='h-2 w-2 rounded-full bg-[#D1DFFF] mt-[0.1rem]'></div>
            <p className='text-[#afafaf] text-[0.83rem] font-medium'><span className='text-gray-400 text-[0.88rem] font-semibold'>--GB </span>useable</p>
          </div>
          
          <p className='text-xs text-green-500 font-medium h-4'>--GB available</p>
        </div>

        <div className='w-[14rem] h-full'>
          <CircularProgressbarWithChildren
            value={100}
            strokeWidth={3}
            circleRatio={0.6}
            styles={buildStyles({
              rotation: 0.7,
              trailColor: "#D1DFFF",
              pathColor: "#D1DFFF",
            })}
            className='z-[-1]'
          >
            <div style={{ width: "103%" }}>
              <CircularProgressbarWithChildren
                value={40}
                strokeWidth={6}
                circleRatio={0.6}
                styles={buildStyles({
                  rotation: 0.7,
                  trailColor: "transparent",
                  pathColor: "#4B7BEF",
                })}
              >
                <div className='flex flex-col justify-center items-center mb-6'>
                  <p className='text-3xl text-primary_font font-medium'>
                    --%
                  </p>
                  <p className='text-[#AFAFAF] text-sm font-semibold'>
                    used space
                  </p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>

      <div className='h-full w-full flex flex-col justify-between pl-1 pb-1'>
        <div className='flex gap-2 w-full'>
          <div className='w-6 flex items-center justify-center'>
            <Image src='/docs-icon-2.svg' width={20} height={25} alt="graph"/>
          </div>
          <div className='flex flex-col gap-1 w-full'>
            <div className='flex gap-4 items-end'>
              <p className='text-primary_font text-[0.8rem] font-medium leading-4'>Documents</p>
              <p className='text-[#afafaf] text-xs font-semibold min-w-[2rem]'>--%</p>
              <p className='text-primary_font text-xs font-medium leading-3 text-right w-full'>--GB</p>
            </div>
            <Progress value={40} barColor='bg-primary_font' className='bg-[#D5D5FB] h-1'/>
          </div>
        </div>

        <div className='flex gap-2 w-full'>
          <div className='w-6 flex items-center justify-center'>
            <Image src='/images-icon.svg' width={18} height={25} alt="graph"/>
          </div>
          <div className='flex flex-col gap-1 w-full'>
            <div className='flex gap-4 items-end'>
              <p className='text-[#7A7AFF] text-[0.8rem] font-medium leading-4'>Images</p>
              <p className='text-[#afafaf] text-xs font-semibold min-w-[2rem]'>--%</p>
              <p className='text-[#7A7AFF] text-xs font-medium leading-3 text-right w-full'>--GB</p>
            </div>
            <Progress value={40} barColor='bg-[#7A7AFF]' className='bg-[#D5D5FB] h-1'/>
          </div>
        </div>

        <div className='flex gap-2 w-full'>
          <div className='w-6 flex items-center justify-center'>
            <Image src='/media-icon-2.svg' width={20} height={25} alt="graph"/>
          </div>
          <div className='flex flex-col gap-1 w-full'>
            <div className='flex gap-4 items-end'>
              <p className='text-primary_font text-[0.8rem] font-medium leading-4'>Media</p>
              <p className='text-[#afafaf] text-xs font-semibold min-w-[2rem]'>--%</p>
              <p className='text-primary_font text-xs font-medium leading-3 text-right w-full'>--GB</p>
            </div>
            <Progress value={40} barColor='bg-primary_font' className='bg-[#D5D5FB] h-1'/>
          </div>
        </div>

        <div className='flex gap-2 w-full'>
          <div className='w-6 flex items-center justify-center'>
            <Image src='/others-icon-2.svg' width={25} height={25} alt="graph"/>
          </div>
          <div className='flex flex-col gap-1 w-full'>
            <div className='flex gap-4 items-end'>
              <p className='text-[#7A7AFF] text-[0.8rem] font-medium leading-4'>Others</p>
              <p className='text-[#afafaf] text-xs font-semibold min-w-[2rem]'>--%</p>
              <p className='text-[#7A7AFF] text-xs font-medium leading-3 text-right w-full'>--GB</p>
            </div>
            <Progress value={40} barColor='bg-[#7A7AFF]' className='bg-[#D5D5FB] h-1'/>
          </div>
        </div>
      </div>
    </ShadowedCard>
  )
}

export default UserDashStorage
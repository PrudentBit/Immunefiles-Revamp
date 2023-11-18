import React from 'react'
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Image from 'next/image'; 
import { Button } from '@/components/ui/button';
import UserSOSModal from './ActionsModals/UserSOSModal';


type Props = {
  user?: AdminSpecificUserType
}

const UserLinkAnaltics = ({user}: Props) => {
  return (
    <div className='w-[60%] bg-primary_bg rounded-xl p-3 px-6'>
      <div className='flex gap-2 h-5'>
        <Image src='/link-icon-3.svg' width={18} height={18} alt="storage"/>
        <p className='text-primary_font text-md font-medium leading-4'>Link Analytics</p>
      </div>

      <div className='flex justify-between h-[55%] gap-4'>
        <div className='flex flex-col gap-[0.1rem] w-[50%] h-full justify-center pl-2'>
          <div className='flex gap-2 items-center'>
            <div className='h-2 w-2 rounded-full bg-green-500 mt-[0.1rem]'></div>
            <p className='text-[#afafaf] text-[0.83rem] font-medium'><span className='text-gray-400 text-[0.92rem] font-medium'>{user?.links.active_links || 0} </span>Active</p>
          </div>
          <div className='flex gap-2 items-center'>
            <div className='h-2 w-2 rounded-full bg-red-500 mt-[0.1rem]'></div>
            <p className='text-[#afafaf] text-[0.83rem] font-medium'><span className='text-gray-400 text-[0.92rem] font-medium'>{user?.links.expired_link || 0} </span>Expired</p>
          </div>
          <p className='text-[#afafaf] text-[0.83rem] font-medium'><span className='text-primary_font text-base font-semibold'>{user?.links.total_link || 0} </span>Total links </p>
        </div>

        <div className='w-[8rem]'>
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
                value={Math.floor(((user?.links.active_links||0) / (user?.links.total_link || 0))*100 || 0)}
                strokeWidth={6.5}
                circleRatio={0.6}
                styles={buildStyles({
                  rotation: 0.7,
                  trailColor: "transparent",
                  pathColor: "green",
                })}
                className='z-[-1]'
              >
                <div className='flex flex-col justify-center items-center mb-6'>
                  <p className='text-2xl text-primary_font font-medium'>
                    {`${Math.floor(((user?.links.active_links||0) / (user?.links.total_link || 0))*100 || 0)}%`}
                  </p>
                  <p className='text-[#AFAFAF] text-sm font-normal'>
                    active links
                  </p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>

      <div className='w-full'>
        <UserSOSModal user={user}/>
      </div>
    </div>
  )
}

export default UserLinkAnaltics
import React from 'react';

import Image from 'next/image';

interface BotLeftAlertProps {
  children: React.ReactNode;
  className?: string;
  image: string;
  imagebg: string;
}

const BotLeftAlert: React.FC<BotLeftAlertProps> = ({ children, className, image, imagebg }) => {
  return (
    <div className={`absolute bottom-[5%] right-[3%] w-[24rem] h-[5.5rem] bg-white rounded-lg z-50 flex items-center justify-between gap-3 p-4 shadow-[0_2px_20px_0px_rgba(0,0,0,0.2)] ${className}`}>
      <Image src={image} height={20} width={20} alt='delete icon' className={` ${imagebg} p-4 h-[3.5rem] w-[3.5rem] rounded-md`}/>
      {children}
    </div>
  );
};

export default BotLeftAlert;

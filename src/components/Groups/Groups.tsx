import {useState} from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  group: GroupDetailsType
}

const Groups = ({group}:Props) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isStarHovering, setIsStarHovering] = useState(false)

  return (
    <div 
      className='h-[3.6rem] w-[16rem] flex justify-between items-center gap-2 p-3 rounded-lg bg-primary_bg hover:bg-[#E5E5FF] cursor-pointer'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image src='/groups-icon-4.svg' width={30} height={30} alt='Groups'/>
      
      <div className='flex flex-col items-start justify-center w-[60%] h-[2.5rem]'>
        <p className='text-[#7A7AFF] font-semibold text-[1rem] leading-5'>{group.name}</p>
        {isHovering && <p className='text-[#7A7AFF] font-normal text-[0.9rem] leading-5'>{group.members.length} members</p>}
      </div>

      <div title='Menu' className='text-secondary_font font-medium text-2xl leading-[0px] pb-[1.3rem] p-[0.3rem] px-1 text-center rounded-full bg-primary_bg hover:bg-button_hover cursor-pointer'>...</div>

      <div 
        onMouseEnter={() => setIsStarHovering(true)}
        onMouseLeave={() => setIsStarHovering(false)}
        className='flex h-10 w-10 items-center justify-center relative'
      >
        <AnimatePresence>
          {group.is_favourite ? (
            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 432 }}
              exit={{ opacity: 0, rotate: 216 }}
              transition={{ duration: 1 }}
              key="goldStar"
              className='flex h-10 w-10 items-center justify-center absolute'
            >
              <Image title='Favourite' src='/star-gold.svg' width={35} height={35} alt='Star icon' className='translate-x-[-1px] translate-y-[1px]'/>
            </motion.div>
          ):(
            <>
              {isStarHovering ? (
                <motion.div
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: 216 }}
                  exit={{ opacity: 0, rotate: 216 }}
                  transition={{ duration: 0.5 }}
                  key="blueStar"
                  className='flex h-10 w-10 items-center justify-center absolute'
                >
                  <Image title='Favourite' src='/star-blue.svg' width={25} height={25} alt='Star icon' className='rotate-[-2deg] translate-x-[1px] translate-y-[1px]'/>
                </motion.div>
              ):(
                <motion.div
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: 216 }}
                  exit={{ opacity: 0, rotate: 216 }}
                  transition={{ duration: 0.5 }}
                  key="emptyStar"
                  className='flex h-10 w-10 items-center justify-center absolute'
                >
                  <Image title='Favourite' src='/star-empty.svg' width={25} height={25} alt='Star icon'/>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Groups
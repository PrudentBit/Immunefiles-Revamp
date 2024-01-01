import { useState } from 'react'
import ReportIssueModal from '@/components/Modals/IssuesModals/ReportIssueModal'
import TrackIssuesModal from '@/components/Modals/IssuesModals/TrackIssuesModal'
import { motion, AnimatePresence } from 'framer-motion'

const ReportMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='absolute bottom-3 right-3 flex flex-col gap-4 justify-end items-end'>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 40, duration:0.4 }}
            >
              <ReportIssueModal />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 50, duration:0.2 }}
            >
              <TrackIssuesModal />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <motion.div
        className='h-14 w-14 rounded-full flex items-center justify-center cursor-pointer bg-primary_font_2 shadow-[0px_2px_30px_rgba(0,0,0,0.26)] hover:bg-[#B1B1FF]'
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <motion.img
            src='/close-icon-white.svg'
            alt='report'
            width={27}
            height={27}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 90 }}
            exit={{ opacity: 0}}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <motion.img
            src='/report-icon.svg'
            alt='report'
            width={40}
            height={40}
            className='mb-1'
            initial={{ opacity: 0, rotate: 180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -180 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </div>
  )
}

export default ReportMenu
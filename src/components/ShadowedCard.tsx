import React from 'react'

type Props = {
  children?: React.ReactNode,
  className?: string
}

const ShadowedCard = ({ children, className }: Props) => {
  return (
    <div className={`w-[30%] h-full rounded-2xl shadow-[0px_2px_15px_0px_rgba(75,123,229,0.20)] flex flex-col  py-4 px-6 ${className}`}>
      {children}
    </div>
  )
}

export default ShadowedCard

import React from 'react'

type Props = {
  getOTPOn: "mail" | "mobile" | "none";
}

const Enter2FAOTP = ({getOTPOn}: Props) => {
  return (
    <div className='flex flex-col'>
      <p className='text-primary_font text-xs font-medium'>
        Enter OTP sent to your {getOTPOn === "mail" ? "mail" : "mobile number"}
      </p>
    </div>
  )
}

export default Enter2FAOTP
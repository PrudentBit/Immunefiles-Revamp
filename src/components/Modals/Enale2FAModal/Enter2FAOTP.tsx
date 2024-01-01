import React from 'react'

type Props = {
  getOTPOn: "email" | "phone" | "none";
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  otp: string[];
  focusedInput: number | null;
  setFocusedInput: React.Dispatch<React.SetStateAction<number | null>>;
}

const Enter2FAOTP = ({getOTPOn, setOtp, otp, focusedInput, setFocusedInput}: Props) => {

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    const newArr = [...otp];
    newArr[index] = value;
  
    setOtp(newArr);
  
    if (value && index < otp.length - 1) {
      // Move focus to the next input
      const nextInput = e.target.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
        setFocusedInput(index + 1);
      }
    }
  };
  
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && index > 0 && !(e.currentTarget as HTMLInputElement).value) {
      // Move focus to the previous input on backspace
      const prevInput = e.currentTarget.previousElementSibling as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        setFocusedInput(index - 1);
      }
    }
  };
  
  const areAllFieldsFilled = () => {
    return otp.every((digit) => digit !== "");
  };

  return (
    <div className='flex flex-col gap-6 pb-4 px-3'>
      <p className='text-primary_font text-xs font-medium'>
        Enter OTP sent to your {getOTPOn === "email" ? "email" : "mobile number"}
      </p>

      <div className='h-12'>
        <div className='flex items-center gap-4'>
        {otp.map((digit, index) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`border w-10 h-10 text-center text-lg font-semibold text-black rounded-lg border-solid bg-[#F4F4FF] ${
              focusedInput === index ? 'border-blue-500' : 'border-[#E5EDFF]'
            } ${!areAllFieldsFilled() ? 'border-red-500' : ''} outline-none`}
            onFocus={() => setFocusedInput(index)}
          />
        ))}
        </div>
      </div>
    </div>
  )
}

export default Enter2FAOTP
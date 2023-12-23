"use client"
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

type getOTPOn = "mail" | "mobile" | "none";

const Enable2FAModal = () => {
  const [mailHover, setMailHover] = useState(false);
  const [mobileHover, setMobileHover] = useState(false);
  const [getOTPOn, setGetOTPOn] = useState<getOTPOn>("none");

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [focusedInput, setFocusedInput] = useState<number | null>(null);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
  
    if (!/^\d*$/.test(value)) {
      // If the input is not a digit, ignore it
      return;
    }
  
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
  
  const isOtpValid = () => {
    const enteredOtp = otp.join("");
    const correctOTP = "123456";
    return enteredOtp === correctOTP;
  };

  const handleGoBack = () => {
    setGetOTPOn("none");
    setOtp(new Array(6).fill(""));
    setFocusedInput(null);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div>
          <Switch className='scale-[1.2]'/>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="translate-y-[-135%] p-4 w-[24rem]">
        <AlertDialogHeader className='flex flex-row justify-between items-center h-10'>
          <div className="flex gap-3 items-center">
            <Image src="/2fa-icon-black.svg" width={20} height={20} className='rounded-full w-8 h-8 p-[0.4rem] bg-primary_bg' alt='pen'/>
            <AlertDialogTitle className="text-sm">
              Enable Two Factor Authentication
            </AlertDialogTitle>
          </div>
          <AlertDialogCancel
              className="w-7 h-7 p-[0.4rem] rounded-full bg-[#E5EDFF] mt-0"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Image
                src="/cross-icon-blue.svg"
                width={20}
                height={20}
                className="rounded-full"
                alt="close icon"
              />
            </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription className='flex gap-10'>
          { getOTPOn === "none" ? (
            <div className='flex gap-6'>
              <div onClick={()=>setGetOTPOn("mail")} onMouseEnter={()=>setMailHover(true)} onMouseLeave={()=>setMailHover(false)} className='smoothTransitionFast flex flex-col gap-3 justify-center items-center h-[10rem] w-[10rem] cursor-pointer border-2 border-solid border-[#E5EDFF] rounded-2xl hover:bg-[#E5EDFF] hover:border-primary_font'>
                {mailHover ? <Image src="/mail-icon-2-blue.svg" width={40} height={40} alt='mail'/> : <Image src="/mail-icon-2.svg" width={40} height={40} alt='mail'/>}
                <p className='text-primary_font text-sm'>Send OTP</p>
              </div>

              <div onClick={()=>setGetOTPOn("mobile")} onMouseEnter={()=>setMobileHover(true)} onMouseLeave={()=>setMobileHover(false)} className='smoothTransitionFast flex flex-col gap-3 justify-center items-center h-[10rem] w-[10rem] cursor-pointer border-2 border-solid border-[#E5EDFF] rounded-2xl hover:bg-[#E5EDFF] hover:border-primary_font'>
                {mobileHover ? <Image src="/mobile-icon-blue.svg" width={50} height={50} alt='mobile'/> : <Image src="/mobile-icon.svg" width={50} height={50} alt='mail'/>}
                <p className='text-primary_font text-sm'>Send OTP</p>
              </div>
            </div>
          ):(
            <div className='flex flex-col gap-6 pb-4 px-3'>
              <p className='text-primary_font text-xs font-medium'>
                Enter OTP sent to your {getOTPOn === "mail" ? "mail" : "mobile number"}
              </p>

              <div className='h-12'>
                {/* OTP input */}
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
                    } ${areAllFieldsFilled() && !isOtpValid() ? 'border-red-500' : ''} outline-none`}
                    onFocus={() => setFocusedInput(index)}
                  />
                ))}
                </div>
              </div>
            </div>
          )}
        </AlertDialogDescription>
        { !(getOTPOn === "none") && (
          <AlertDialogFooter className='flex justify-between gap-4 pb-1'>
            <Button className="bg-transparent text-primary_font rounded-2xl h-8 px-2 font-normal text-xs" onClick={handleGoBack}>
              <Image src="/left-arrow-2.svg" width={18} height={18} alt='arrow'/>
              Go back
            </Button>
            <div className='flex gap-3'>
              <AlertDialogAction className="bg-primary_font text-white rounded-full h-8 px-5 font-normal">
                Verify
              </AlertDialogAction>
              <AlertDialogAction className="bg-white text-primary_font rounded-full h-8 px-4 font-normal">
                Resend
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Enable2FAModal

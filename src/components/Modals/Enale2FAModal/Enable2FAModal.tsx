"use client"
import React, { use, useState } from 'react'
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
import Enter2FAOTP from './Enter2FAOTP'
import recieveOTPonEmail from '@/utils/api/recieveOTPonEmailAPI'
import recieveOTPonNumber from '@/utils/api/recieveOTPonNumberAPI'
import { UserDetailsStore } from '@/utils/store/userDetailsStore'
import confirmEmailOTP from '@/utils/api/confirmEmailOTPAPI'
import confirmNumberOTP from '@/utils/api/confirmNumberOTPAPI'
import toggleUser2FA from '@/utils/api/toggleUser2FAAPI'

type getOTPOn = "mail" | "mobile" | "none";

const Enable2FAModal = () => {
  const [mailHover, setMailHover] = useState(false);
  const [mobileHover, setMobileHover] = useState(false);
  const [getOTPOn, setGetOTPOn] = useState<getOTPOn>("none");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const [errors, setErrors] = useState("");
  const { userDetails } = UserDetailsStore();

  const handleGoBack = () => {
    setGetOTPOn("none");
    setOtp(new Array(6).fill(""));
    setFocusedInput(null);
  };

  const handleSendOTP = async (type : string) => {
    try {
      if (type === "mail" && userDetails) {
        const response = await recieveOTPonEmail();
        setGetOTPOn("mail");
        if (!response.ok) {
          setErrors(response.error || "Failed to send OTP" );
          return;
        }
      } else if (type === "mobile" && userDetails) {
        const response = await recieveOTPonNumber(userDetails.phone_number, userDetails.username);
        setGetOTPOn("mobile");
        if (!response.ok) {
          setErrors(response.error || "Failed to send OTP" );
          return;
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors( "An error occurred while processing your request" );
    }
  };

  const handleVerification = async () => {
    try {
      let confirmResponse;

      if (getOTPOn === "mail" && userDetails) {
        confirmResponse = await confirmEmailOTP(userDetails.email, otp.join(''));
      } else if (getOTPOn === "mobile" && userDetails) {
        confirmResponse = await confirmNumberOTP(userDetails.phone_number, otp.join(''));
      }

      if (confirmResponse.ok && userDetails) {
        const toggleResponse = await toggleUser2FA(!userDetails.permissions.two_factor);
      } else {
        setErrors(confirmResponse.error || "Failed to verify OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors("An error occurred while processing your request");
    }
  };

  const handleResend = async () => {
    try {
      let response;

      if (getOTPOn === "mail" && userDetails) {
        response = await recieveOTPonEmail();
      } else if (getOTPOn === "mobile" && userDetails) {
        response = await recieveOTPonNumber(userDetails.phone_number, userDetails.username);
      }

      if (!response.ok) {
        setErrors(response.error || "Failed to resend OTP");
        return;
      }

      setOtp(response.otp.split(''));
    } catch (error) {
      console.error("Error:", error);
      setErrors("An error occurred while processing your request");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div>
          <Switch className='scale-[1.2]' checked={userDetails?.permissions.two_factor} onCheckedChange={(checked)=>userDetails?.permissions.two_factor}/>
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
              <div onClick={()=>handleSendOTP("mail")} onMouseEnter={()=>setMailHover(true)} onMouseLeave={()=>setMailHover(false)} className='smoothTransitionFast flex flex-col gap-3 justify-center items-center h-[10rem] w-[10rem] cursor-pointer border-2 border-solid border-[#E5EDFF] rounded-2xl hover:bg-[#E5EDFF] hover:border-primary_font'>
                {mailHover ? <Image src="/mail-icon-2-blue.svg" width={40} height={40} alt='mail'/> : <Image src="/mail-icon-2.svg" width={40} height={40} alt='mail'/>}
                <p className='text-primary_font text-sm'>Send OTP</p>
              </div>

              <div onClick={()=>handleSendOTP("mobile")} onMouseEnter={()=>setMobileHover(true)} onMouseLeave={()=>setMobileHover(false)} className='smoothTransitionFast flex flex-col gap-3 justify-center items-center h-[10rem] w-[10rem] cursor-pointer border-2 border-solid border-[#E5EDFF] rounded-2xl hover:bg-[#E5EDFF] hover:border-primary_font'>
                {mobileHover ? <Image src="/mobile-icon-blue.svg" width={50} height={50} alt='mobile'/> : <Image src="/mobile-icon.svg" width={50} height={50} alt='mail'/>}
                <p className='text-primary_font text-sm'>Send OTP</p>
              </div>
            </div>
          ):(
            <Enter2FAOTP getOTPOn={getOTPOn} setFocusedInput={setFocusedInput} focusedInput={focusedInput} otp={otp} setOtp={setOtp}/>
          )}
        </AlertDialogDescription>
        { !(getOTPOn === "none") && (
          <AlertDialogFooter className='flex justify-between gap-4 pb-1'>
            <Button className="bg-transparent text-primary_font rounded-2xl h-8 px-2 font-normal text-xs" onClick={handleGoBack}>
              <Image src="/left-arrow-2.svg" width={18} height={18} alt='arrow'/>
              Go back
            </Button>
            <div className='flex gap-3'>
              <AlertDialogAction className="bg-primary_font text-white rounded-full h-8 px-5 font-normal"
                onClick={handleVerification}
              >
                Verify
              </AlertDialogAction>
              <AlertDialogAction className="bg-white text-primary_font rounded-full h-8 px-4 font-normal"
                onClick={(e)=> {handleResend(); e.stopPropagation(); e.preventDefault()}}
              >
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

import { useState } from "react";
import validateUsername from "@/utils/api/validateUsernameAPI";

type Props = {
  userInfo: {
    name: string,
    email: string,
    username: string,
    code: number,
    contact: number
  }
  setUserInfo: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    username: string;
    code: number;
    contact: number;
  }>>
}

const UserForm = ({userInfo, setUserInfo}: Props) => {
  const [validUsername, setValidUsername] = useState(true)
  const [validEmail, setValidEmail] = useState(true)

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [id]: value,
    }));
  
    if (id === 'username') {
      const isValidUsername = await validateUsername(value);
      setValidUsername(isValidUsername);
      console.log("checking")
    } 
    else if (id === 'email') {
      const isValidEmail = validateEmail(value);
      setValidEmail(isValidEmail);
    }
  };

  function validateEmail(email: string): boolean {
    const currentHost = window.location.hostname.split(".")[0];
    const regexEmail = new RegExp(
      `^[a-zA-Z0-9._%+-]+@(${currentHost})(\\.[a-zA-Z0-9.-]+)*$`
    );
  
    return regexEmail.test(email);
  }  

  return (
    <form action="" className='flex flex-col w-full gap-1 pl-1'>
      <label 
        htmlFor="name" 
        className='text-primary_font font-semibold'
      >
        Enter Name
      </label>
      <input 
        type="text" 
        name="Name" 
        id="name" 
        placeholder='John Doe'
        onChange={handleInputChange}
        className='py-2 px-4 text-primary_font bg-bg_hover rounded-md border-2 border-solid border-[#E5EDFF] focus:outline-none focus:border-primary_font'
      />

      <label 
        htmlFor="email" 
        className='text-primary_font font-semibold mt-3'
      >
        Enter Email ID {validEmail ? '' : <span className='text-red-400 font-medium text-xs'>(Email is invalid)</span>}
      </label>
      <input 
        type="text" 
        name="Email" 
        id="email" 
        placeholder='abc@email.com'
        onChange={handleInputChange}
        className='py-2 px-4 text-primary_font bg-bg_hover rounded-md border-2 border-solid border-[#E5EDFF] focus:outline-none focus:border-primary_font'
      />

      <div className='flex gap-6 w-full mt-3'>
        <div className='flex flex-col gap-1 w-full'>
          <label 
            htmlFor="username" 
            className='text-primary_font font-semibold'
          >
            Enter Username {validUsername ? '' : <span className='text-red-400 font-medium text-xs'>(User name is taken/invalid)</span>}
          </label>
          <input 
            type="text" 
            name="Username" 
            id="username" 
            onChange={handleInputChange}
            className='py-2 px-4 text-primary_font bg-bg_hover rounded-md border-2 border-solid border-[#E5EDFF] focus:outline-none focus:border-primary_font'
          />
        </div>

        <div className='flex flex-col gap-1 w-full'>
          <label 
            htmlFor="contact" 
            className='text-primary_font font-semibold'
          >
            Enter Contact no.
          </label>
          <div className='bg-bg_hover rounded-md border-2 border-solid border-[#E5EDFF] flex items-center'>
            <p className='pl-2 text-primary_font font-semibold'>+</p>
            <input 
              type="number" 
              name="Code" 
              id="code" 
              onChange={handleInputChange}
              className='bg-transparent text-primary_font font-semibold py-2 w-6'
              placeholder='91'
            />
            <div className='w-[0.09rem] h-6 bg-primary_font my-1'/>
            <input 
              type="number" 
              name="Contact" 
              id="contact" 
              onChange={handleInputChange}
              className='bg-transparent text-primary_font font-semibold py-2 pl-2'
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default UserForm
import React from 'react'
import Image from 'next/image'

type Props = {
	twoFAGlobal: boolean;
	setTwoFAGlobal: React.Dispatch<React.SetStateAction<boolean>>;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const AnalyticsNav = ({twoFAGlobal, setTwoFAGlobal, searchTerm, setSearchTerm}: Props) => {

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

  return (
    <div className='flex justify-between'>
			<div className='flex gap-3 p-2'>
				<Image src="/analytics-icon.svg" alt='user icon' width={35} height={35}/>
				<p className='text-primary_font text-md font-medium leading-4'>User Analytics</p>
			</div>

			<div className='flex gap-4 '>
				<div className={`h-9 w-9 rounded-md ${twoFAGlobal?("bg-[#FFE3E5]"):("bg-bg_hover")} flex items-center justify-center cursor-pointer ${twoFAGlobal?("hover:bg-[#f7d7d9]"):("hover:bg-[#D5D5FB]")}`} onClick={()=>setTwoFAGlobal(!twoFAGlobal)}>
					{twoFAGlobal ? (
						<Image src="/2fa-text-red.svg" alt='2fa' width={32} height={32}/>
					):(
						<Image src="/2fa-text.svg" alt='2fa' width={32} height={32}/>
					)}
				</div>

				<div className='h-9 w-9 rounded-md bg-[#D0FFE3] flex justify-center items-center cursor-pointer hover:bg-[#A8FFCB]'>
					<svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="ic:outline-file-download">
							<path  fill="#3ABA6E" id="Vector" d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z"/>
						</g>
					</svg>
				</div>

				<div className='h-9 w-9 rounded-md bg-bg_hover flex justify-center align-center cursor-pointer hover:bg-[#D5D5FB]'>
					<Image src="/add-user.svg" alt='add user' width={18} height={18}/>
				</div>

				<form action="" className='flex items-center gap-4 h-full px-3 rounded-md justify-between bg-[#F0F0F0]'>
					<button>
							<Image src="/search.png" alt='search' width={25} height={25}/>
					</button>
					<input 
						type="text" 
						placeholder='Search users..' 
						className='h-full w-full bg-transparent' 
						value={searchTerm} 
						onChange={handleSearchChange}
					/>
				</form>
			</div>
		</div>
  )
}

export default AnalyticsNav
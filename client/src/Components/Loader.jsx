import React from 'react'
import './Loader.css'

const Loader = () => {
	return (
		<div className='flex items-center justify-center w-full h-[calc(100vh-70px)]'>
			<svg className="p-8 mb-12 sm:p-2 sm:mb-5 pl" viewBox='0 0 128 128' width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="hsl(193,90%,55%)" />
						<stop offset="100%" stopColor="hsl(223,90%,55%)" />
					</linearGradient>
				</defs>
				<circle className="pl__ring" r="56" cx="64" cy="64" fill="none" stroke="#000" strokeWidth="12" strokeLinecap="round" />
				<path className="pl__worm" d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z" fill="none" stroke="url(#pl-grad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="44 1111" strokeDashoffset="10" />
			</svg>
		</div>
	)
}

export default Loader
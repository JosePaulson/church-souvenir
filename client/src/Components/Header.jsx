import React from 'react'
import {
	Navbar,
	Button,
	Badge,
	Indicator
} from 'react-daisyui'

const Header = ({ toggleVisible }) => {
	return (
		<Navbar className='fixed z-[20] bg-gray-50'>
			<Navbar.Start>
				<Button tag="label" onClick={toggleVisible} color="ghost" shape="circle" tabIndex={0}>
					<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
					</svg>
				</Button>
				<Button tag="a" color="ghost" className="text-xl normal-case">
				സ്മരണിക 2024
				</Button>
			</Navbar.Start>
			<Navbar.End className="navbar-end">
				<Button color="ghost" shape="circle">
					<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</Button>
				<Button color="ghost" shape="circle">
					<Indicator className='z-[10	]'>
						<Badge size="xs" color="primary" className={Indicator.Item.className()} />
						<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
						</svg>
					</Indicator>
				</Button>
			</Navbar.End>
		</Navbar>
	)
}

export default Header
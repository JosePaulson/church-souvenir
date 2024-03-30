import React from 'react'
import {
	Navbar,
	Button,
	Dropdown
} from 'react-daisyui'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutUserMutation } from '../slices/usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
const Header = ({ toggleVisible }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { userInfo } = useSelector(state => state.auth)

	const [logoutUser, { isLoading }] = useLogoutUserMutation()

	// dropdown item to close on click - daisyUI fix
	function closeOnClick() {
		const elem = document.activeElement;
		if (elem) {
			elem?.blur();
		}
	}

	function handleLogout() {
		closeOnClick()
		logoutUser().then(res => {
			if (res) {
				toast("Logout successfull")
				dispatch(setCredentials(null))
				navigate('/login')
			}
		}).catch(error => toast(error?.data?.message || error?.error))
	}

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
				{userInfo && <Dropdown end>
					<Button color="ghost" shape="circle">
						<svg className="text-gray-800 w-7 h-7 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={userInfo?.isAdmin ? 'darkgreen' : 'purple'} viewBox="0 0 24 24">
							<path fillRule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clipRule="evenodd" />
						</svg>
					</Button>
					<Dropdown.Menu className="mt-3 z-[1] w-52 menu-sm">
						<Button loading={isLoading} onClick={handleLogout}>Logout</Button>
					</Dropdown.Menu>
				</Dropdown>}
			</Navbar.End>
		</Navbar>
	)
}

export default Header
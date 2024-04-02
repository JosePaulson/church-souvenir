import React, { useEffect, useState } from 'react'
import { Button, Input } from 'react-daisyui'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginUserMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginScreen = () => {
	const [show, setShow] = useState(false)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const navigate = useNavigate()

	const dispatch = useDispatch()
	const { userInfo } = useSelector(state => state.auth)
	const [loginUser, { isLoading }] = useLoginUserMutation()

	// re-route to home-screen if logged-in
	useEffect(() => {
		userInfo && navigate('/')
	}, [])

	function handleChange(e) {
		const { name, value } = e.target
		setFormData(prev => (
			{
				...prev,
				[name]: name === 'email' ? value.trim().toLowerCase() : value.trim()
			}
		))
	}

	async function handleSubmit(e) {
		e.preventDefault()
		if (!email || !password) {
			toast('All fields are required')
		} else {
			try {
				const res = await loginUser({ email, password }).unwrap()
				dispatch(setCredentials({ ...res, authTime: Date.now() }))
				navigate('/')
			} catch (error) {
				toast(error?.data?.message || error?.error)
			}
		}
	}

	const { email, password } = formData

	return (
		<div className='h-[calc(100vh-70px)] flex justify-center items-center'>
			<form onSubmit={handleSubmit} className='p-8 -mt-24 space-y-7 bg-gray-100 rounded-md w-[22.5rem]'>
				<h3 className='mb-4 font-semibold text-center uppercase'>Admin Login</h3>
				<div className='space-y-4'>
					<Input type='email' autoComplete='username' name='email' value={email} onChange={handleChange} className='w-full' placeholder='Email' />
					<div className='relative'>
						<Input type={show ? 'text' : 'password'} name='password' value={password} onChange={handleChange} className='w-full' placeholder='Password' autoComplete='current-password' />
						<span onClick={() => setShow(!show)} className={`absolute -translate-y-1/2 cursor-pointer right-3 top-1/2 sm:hover:scale-125 ${show ? '-rotate-45' : 'rotate-45'}`}>🔦</span>
					</div>
				</div>
				<Button loading={isLoading} className='w-full text-gray-200 bg-gray-950 sm:hover:bg-gray-100 sm:hover:text-gray-950'>{isLoading ? 'Loging in' : 'Login'}</Button>
			</form>
		</div>
	)
}

export default LoginScreen
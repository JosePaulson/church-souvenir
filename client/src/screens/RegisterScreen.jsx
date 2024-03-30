import React, { useState } from 'react'
import { useRegisterUserMutation } from '../slices/usersApiSlice'
import { Button, Input } from 'react-daisyui'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RegisterScreen = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    
    const navigate = useNavigate()

    const { userInfo } = useSelector(state=>state.auth)

    const [registerUser, { isLoading }] = useRegisterUserMutation()

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
            alert('All fields are required')
        } else {
            try {
                await registerUser({ ...formData }).unwrap()
                alert('New editor added')
            } catch (error) {
                alert(error?.data?.message || error?.error)
            }
        }

    }

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(formData => (
            {
                ...formData,
                [name]: (name === 'email') ? (value.toLowerCase().trim()) : (value.trim())
            }
        ))
    }

    const { email, password } = formData

    return (
        userInfo?.isAdmin &&
        <div className='h-[calc(100vh-70px)] flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='p-8 -mt-24 space-y-7 bg-purple-100 rounded-md w-[22.5rem]'>
                <h3 className='mb-4 font-semibold text-center uppercase'>Add Editor</h3>
                <div className='space-y-4'>
                    <Input type='email' name='email' value={email} onChange={handleChange} className='w-full' placeholder='Email' />
                    <Input type='text' name='password' value={password} onChange={handleChange} className='w-full' placeholder='Password' />
                </div>
                <Button loading={isLoading} className='w-full text-gray-200 bg-gray-950 sm:hover:bg-gray-100 sm:hover:text-gray-950'>{isLoading ? 'Adding Editor' : 'Add Editor'}</Button>
            </form>
        </div>
    )
}

export default RegisterScreen
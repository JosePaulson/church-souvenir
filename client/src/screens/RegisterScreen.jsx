import React, { useEffect, useState } from 'react'
import { useDeleteUserMutation, useLazyGetAllEditorsQuery, useRegisterUserMutation } from '../slices/usersApiSlice'
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

    const [ getEditors, {data: editors, isLoading: isEditorsLoading}] = useLazyGetAllEditorsQuery()

    const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation()
    
    useEffect(()=>{
        getEditors()
    },[])

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
            getEditors()
        }

    }


    async function handleDeleteEditor(id){
        try {
            await deleteUser(id).unwrap()
            alert('user deleted')
            getEditors()
        } catch (error) {
            alert(error?.data?.message || error?.error)
        }
    }

    const { email, password } = formData

    return (
        userInfo?.isAdmin &&
        <div className='h-[calc(100vh-70px)] flex flex-col justify-center items-center'>
            <form onSubmit={handleSubmit} className='p-8 -mt-24 space-y-7 bg-purple-100 rounded-md w-[22.5rem]'>
                <h3 className='mb-4 font-semibold text-center uppercase'>Add Editor</h3>
                <div className='space-y-4'>
                    <Input type='email' name='email' value={email} onChange={handleChange} className='w-full' placeholder='Email' />
                    <Input type='text' name='password' value={password} onChange={handleChange} className='w-full' placeholder='Password' />
                </div>
                <Button loading={isLoading} className='w-full text-gray-200 bg-gray-950 sm:hover:bg-gray-100 sm:hover:text-gray-950'>{isLoading ? 'Adding Editor' : 'Add Editor'}</Button>
            </form>
            {isEditorsLoading ? '' : editors && <div className='flex flex-col gap-3 mt-5'>
                <h6 className='font-semibold text-center'>Active Editors</h6>
                {editors.map(editor=><div className='flex justify-between px-3 py-1.5 bg-gray-200 rounded-md' key={editor._id}><span>{editor.email}</span> <span onClick={()=>handleDeleteEditor(editor._id)} className='p-1 px-2 ml-2 text-[.7rem] font-semibold text-gray-200 bg-gray-800 rounded-md cursor-pointer'>Delete</span></div>)}
            </div>}
        </div>
    )
}

export default RegisterScreen
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Input,
  FileInput,
  Select,
  Divider,
  Button,
  Checkbox
} from 'react-daisyui'
import MembersTable from '../components/MembersTable'
import { useAddHouseMutation, useUpdateHouseMutation } from '../slices/housesApiSlice'
import { toast } from 'react-toastify'

const AddHouseScreen = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState('')
  const [members, setMembers] = useState([])
  const [house, setHouse] = useState('')
  const [ward, setWard] = useState('')
  const [buttonText, setButtonText] = useState(true) //add-member button
  let initialValue = {
    name: '',
    age: '',
    work: '',
    blood: '',
    phone: '',
    email: '',
    HOH: false,
  }

  const { state } = useLocation()

  const [member, setMember] = useState(initialValue)

  useEffect(() => {
    if (state) {
      setHouse(state.house)
      setWard(state.ward)
      setMembers(state.members)
    }
  }, [state])

  function handleMemberChange(e) {
    const { name, value, checked } = e.target
    setMember(prev => ({
      ...prev,
      [name]: name === 'HOH' ? checked : name === 'email' ? value.trim() : value // for HOH return checked state, for email trim trailing spaces, and for the rest return the input value.
    }))
  }

  function handleImageChange(e) {
    setImage(e.target.files.length && e.target.files[0])
    //change display image on adding an image
    let displayImg = document.querySelector('#displayImg')
    displayImg.src = (e.target.files.length !== 0) ? window.URL.createObjectURL(e.target.files[0]) : state ? state.image : 'https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png' //sample image
  }

  function handleAddMember() {
    if (member.age && member.name.trim() && member.work.trim()) {
      //remove empty field properties
      !member.phone && delete member.phone
      !member.email && delete member.email
      !member.blood && delete member.blood
      setMembers(prev => (
        [
          ...prev,
          {
            ...member,
            name: member.name.trim(),
            work: work.trim(),
          }
        ]
      ))
      setMember(initialValue)
      window.scrollTo(0, 0)
      setButtonText(true)
    } else {
      toast("Enter all required fields")
    }
  }

  // Delete a member added to the members array
  function handleDeleteMember(i) {
    setMembers((prev) => (
      [...prev].filter((e, idx) => (idx != i))
    ))
  }

  // Edit any member added to the members array
  function handleEditMember(i) {
    setButtonText(false)
    setMember(members[i])
    setMembers((prev) => (
      [...prev].filter((e, idx) => (idx != i))
    ))
    window.scrollTo(0, 1000)
  }
  const [addHouse, { isLoading }] = useAddHouseMutation()
  const [updateHouse, { isLoading: isLoadingUpdate }] = useUpdateHouseMutation()
  // submit house data to backend
  async function handleAddHouse(e) {
    e.preventDefault()
    let HOHArr = members.filter((e => e.HOH == true))
    if (HOHArr.length !== 1) {
      toast("HOH error! 1 member should be head of the family, and not more.")
    } else {
      const multiData = new FormData()
      multiData.append('house', house.trim())
      multiData.append('ward', ward)
      multiData.append('members', JSON.stringify(members))
      multiData.append('file', image)
      try {
        if (state) {
          multiData.append('_id', state._id)
          await updateHouse(multiData)
        } else {
          await addHouse(multiData)
        }
        setHouse('')
        setWard('')
        setMember(initialValue)
        navigate(`/wards/${ward}`)
      } catch (error) {
        toast(error?.data?.message || error?.error)
      }
    }
  }

  const { name, age, work, blood, phone, email, HOH } = member
  return (
    <div className='pt-4 sm:pt-8'>
      {/*Table preview of added members*/}
      {members.length > 0 && <MembersTable members={members} edit editFn={handleEditMember} deleteFn={handleDeleteMember} />}
      <h2 className='font-sans text-lg text-center sm:mb-3 text-slate-800'>Populate each field in malayalam</h2>
      <div className="flex items-center justify-center w-full gap-2 p-4 font-sans">
        <form className='grid grid-cols-1 gap-5 w-fit sm:grid-cols-2' onSubmit={handleAddHouse} >
          <span className='-mb-4 italic sm:font-semibold sm:col-span-2 text-end'>*Required fields</span>
          <Input
            name='house'
            value={house}
            onChange={e => setHouse(e.target.value.trim())}
            placeholder='House Name*'
            className='w-full border-gray-400'
            required
          />
          <label className='row-span-3 w-fit ' htmlFor={!image ? 'image' : ''}><img id='displayImg' alt="" src={state ? state.image : 'https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png'} className='h-24 rounded-lg sm:h-48 sm:w-72' /></label>
          <div className='relative'>
            <label htmlFor="image" className='absolute px-2 italic font-thin -top-1/4 right-2 bg-gray-50'>Add Image*</label>
            <FileInput id='image' className='w-full border-gray-400' type='file' onChange={handleImageChange} accept='image/*' required={state ? false : true} />
          </div>
          <div className='relative'>
            <label htmlFor="ward" className='absolute px-2 italic font-thin -top-1/4 right-2 bg-gray-50'>Ward Number*</label>
            <Select
              id='ward'
              name='ward'
              onChange={e => setWard(e.target.value)}
              value={ward}
              className='w-full border-gray-400'
              required
            >
              <option value={''}>
                No-ward-selected
              </option>
              <option value={1}>W#1 &nbsp;St. Mary's</option>
              <option value={2}>W#2 &nbsp;St. Mary's</option>
              <option value={3}>W#3 &nbsp;St. Mary's</option>
              <option value={4}>W#4 &nbsp;St. Mary's</option>
              <option value={5}>W#5 &nbsp;St. Mary's</option>
              <option value={6}>W#6 &nbsp;St. Mary's</option>
              <option value={7}>W#7 &nbsp;St. Mary's</option>
              <option value={8}>W#8 &nbsp;St. Mary's</option>
              <option value={9}>W#9 &nbsp;St. Mary's</option>
              <option value={10}>W#10 &nbsp;St. Mary's</option>
              <option value={11}>W#11 &nbsp;St. Mary's</option>
              <option value={12}>W#12 &nbsp;St. Mary's</option>
              <option value={13}>W#13 &nbsp;St. Mary's</option>
              <option value={14}>W#14 &nbsp;St. Mary's</option>
              <option value={15}>W#15 &nbsp;St. Mary's</option>
              <option value={16}>W#16 &nbsp;St. Mary's</option>
              <option value={17}>W#17 &nbsp;St. Mary's</option>
              <option value={18}>W#18 &nbsp;St. Mary's</option>
            </Select>
          </div>
          <Divider className='sm:col-span-2'>Add Members</Divider>
          {/* Add member section */}
          <Input
            onChange={handleMemberChange}
            name='name'
            value={name}
            placeholder='Name*'
            className='w-full border-gray-400'
          />
          <Input
            onChange={handleMemberChange}
            name='age'
            value={age}
            placeholder='Age*'
            className='w-full border-gray-400'
            type='number'
            min={0}
            max={120}
          />
          <Input
            onChange={handleMemberChange}
            name='work'
            value={work}
            placeholder='Work*'
            className='w-full border-gray-400'
          />
          <div className='relative'>
            <label htmlFor="blood" className='absolute px-2 italic font-thin -top-1/4 right-2 bg-gray-50'>Blood Group</label>
            <Select
              onChange={handleMemberChange}
              name='blood'
              value={blood}
              id='blood'
              className='w-full border-gray-400'
            >
              <option value={'default'} disabled>
                Pick a blood group
              </option>
              <option value={""}>Unknown</option>
              <option value={"A+"}>A RhD positive (A+)</option>
              <option value={"A-"}>A RhD negative (A-)</option>
              <option value={"B+"}>B RhD positive (B+)</option>
              <option value={"B-"}>B RhD negative (B-)</option>
              <option value={"O+"}>O RhD positive (O+)</option>
              <option value={"O-"}>O RhD negative (O-)</option>
              <option value={"AB+"}>AB RhD positive (AB+)</option>
              <option value={"AB-"}>AB RhD negative (AB-)</option>
            </Select>
          </div>
          <Input
            onChange={handleMemberChange}
            name='phone'
            value={phone}
            placeholder='Phone'
            className='w-full border-gray-400'
            type='number'
          />
          <Input
            onChange={handleMemberChange}
            name='email'
            value={email}
            placeholder='Email'
            className='w-full border-gray-400'
            type='email'
          />
          <div className='flex items-center justify-end gap-2 sm:col-span-2 sm:justify-start'>
            <span>Head of this family?</span>
            <Checkbox
              name='HOH'
              checked={HOH}
              onChange={handleMemberChange}
            />
          </div>
          <Button
            type='button'
            onClick={handleAddMember}
            className='text-gray-200 uppercase bg-gray-950 sm:col-span-2 sm:hover:bg-gray-50 sm:hover:text-gray-900'
          >
            {buttonText ? 'Add' : 'Update'} Member
          </Button>
          <Button
            disabled={!members.length || isLoading}
            loading={isLoading}
            type='submit'
            className='text-gray-200 uppercase bg-gray-950 sm:col-span-2 sm:hover:bg-gray-50 sm:hover:text-gray-900 disabled:bg-gray-200 disabled:text-gray-500'
          >
            {(state && isLoadingUpdate) ? 'Updating' : state ? 'Update' : (isLoading && !state) ? 'Adding' : 'Add'} House
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AddHouseScreen
import React from 'react'
import { useGetHousesByWardQuery } from '../slices/housesApiSlice'
import { wards } from '../wards'
import { useNavigate, useParams } from 'react-router-dom'
import { Card } from 'react-daisyui'
import MembersTable from '../components/MembersTable'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const WardScreen = () => {
	const { id: wardNumber } = useParams()
	const { data: houses, isLoading, error } = useGetHousesByWardQuery(wardNumber)

	const navigate = useNavigate()

	const { userInfo } = useSelector(state => state.auth)

	return (
		isLoading ?
			<Loader />
			: error ?
				toast(error?.data?.message || error?.error)
				: <div className='relative'>
					<h1 className='right-0 inline-block px-5 py-2 font-semibold bg-gray-200 rounded-md opacity-95 z-[4] fixed'>W#{wardNumber} &nbsp;{wards[wardNumber - 1].name}</h1>
					<div className="space-y-5">
						{houses.map((house, idx) =>
							<Card key={idx} side="lg" className='relative grid-cols-2 sm:grid'>
								<Card.Image className='self-start' src={house.image} alt={house.house} />
								<Card.Body className='p-1 md:px-6'>
									<h2 className='text-[1.25rem] font-bold'>{house.members.filter(member => member.HOH == true)[0].name} {house.house}</h2>
									<MembersTable members={house.members} />
								</Card.Body>
								{userInfo?.isAdmin && <span onClick={() => navigate('/add-house', { state: house })} className='absolute top-2 right-2 text-[.85rem] font-semibold bg-gray-800 text-gray-200 px-3 py-1.5 rounded-md'>UPDATE</span>}
							</Card>
						)}
					</div>
				</div>
	)
}

export default WardScreen
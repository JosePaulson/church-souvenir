import React, { useRef, useCallback } from 'react'
import { useDeleteHouseMutation, useGetHousesByWardQuery } from '../slices/housesApiSlice'
import { wards } from '../wards'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Modal } from 'react-daisyui'
import MembersTable from '../components/MembersTable'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const WardScreen = () => {
	const { id: wardNumber } = useParams()
	const { data: houses, refetch, isLoading, error } = useGetHousesByWardQuery(wardNumber)

	const navigate = useNavigate()

	const { userInfo } = useSelector(state => state.auth)

	//reference to confirm close modal -react-daisyUI
	const ref = useRef(null);
	const handleShow = useCallback(() => {
		ref.current?.showModal();
	}, [ref]);

	const [deleteHouse] = useDeleteHouseMutation()

	async function handleDeleteHouse(house) {
		try {
			await deleteHouse(house._id).unwrap()
			toast('House deleted')
			navigate(`/wards/${house.ward}`)
			refetch()
		} catch (error) {
			toast(error?.data?.message || error?.error)
		}
	}

	return (
		isLoading ?
			<Loader />
			: error ?
				toast(error?.data?.message || error?.error)
				: <div>
					<h1 className='right-0 inline-block px-5 py-2 font-semibold bg-gray-200 rounded-md opacity-95 z-[4] fixed'>W#{wardNumber} &nbsp;{wards[wardNumber - 1].name}</h1>
					<div className="pt-6 space-y-5">
						{houses.map((house, idx) =>
							<Card key={idx} side="lg" className='relative grid-cols-2 sm:grid'>
								<Card.Image className='self-start' src={house.image} alt={house.house} />
								<Card.Body className='p-1 md:px-6'>
									{userInfo?.isAdmin && <div className='flex justify-end gap-2'>
										<span onClick={() => navigate('/add-house', { state: house })} className='text-[.75rem] sm:text-[.85rem] font-semibold bg-gray-600 text-gray-200 px-2 py-1 sm:px-3 sm:py-1.5 rounded sm:rounded-md'>UPDATE</span>
										<div className='sm:pt-1'>
											<span onClick={handleShow} className='text-[.75rem] sm:text-[.85rem] font-semibold bg-gray-600 text-gray-200 px-2 py-1 sm:px-3 sm:py-1.5 rounded sm:rounded-md'>DELETE</span>
											<Modal ref={ref} className='bg-gray-100'>
												<Modal.Header className="font-bold">Confirm Delete? </Modal.Header>
												<Modal.Body>
													<form method="dialog" className='flex justify-end gap-2'>
														<Button onClick={() => handleDeleteHouse(house)} className='px-5 text-white bg-indigo-500'>Yes</Button>
														<Button className='px-5 text-white bg-purple-500'>No</Button>
													</form>
												</Modal.Body>
											</Modal>
										</div>
									</div>}
									<h2 className='text-[1.25rem] font-bold'>{house.members.filter(member => member.HOH == true)[0].name} {house.house}</h2>
									<MembersTable members={house.members} />
								</Card.Body>
							</Card>
						)}
					</div>
				</div>
	)
}

export default WardScreen
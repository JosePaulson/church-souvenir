import React from 'react'
import { wards } from '../warddb'
import { useParams } from 'react-router-dom'
import { Card, Table } from 'react-daisyui'

const WardScreen = () => {
	const { id: wardNumber } = useParams()
	return (
		<div className='relative'>
			<h1 className='right-0 inline-block px-5 py-2 font-semibold bg-gray-200 rounded-md opacity-95 z-[4] fixed'>W#{wardNumber} &nbsp;{wards[wardNumber - 1].name}</h1>
			<div className="space-y-5">
				{wards[wardNumber - 1].families.map((family, idx) =>
					<Card key={idx} side="lg">
						<Card.Image src={family.image} alt={family.house} />
						<Card.Body className='p-1 md:px-8'>
						<h2 className='text-[1.25rem] font-bold'>{family.members.filter(member => member.HOH == true)[0].name} {family.house}</h2>
							{/* <Card.Title tag="h4" className='text-xl font-medium'>അംഗങ്ങൾ </Card.Title> */}
							<div className="overflow-x-auto">
								<Table>
									<Table.Head className='bg-gray-100'>
										<span />
										<span>പേര്</span>
										<span>വയസ്</span>
										<span>ജോലി</span>
										<span>ഇ-മെയിൽ</span>
										<span>ഫോൺ</span>
									</Table.Head>

									<Table.Body className='[&>*:nth-child(even)]:bg-gray-200'>
										{family.members.map((member, idx)=>
											<Table.Row key={idx}>
												<span>#{idx + 1}</span>
												<span>{member.name}</span>
												<span>{member.age}</span>
												<span>{member.work}</span>
												<span>{member.email}</span>
												<span>{member.phone}</span>
											</Table.Row>
										)}
									</Table.Body>
								</Table>
							</div>
						</Card.Body>
					</Card>
				)}
			</div>
		</div>
	)
}

export default WardScreen
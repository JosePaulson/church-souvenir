import React from 'react'
import { Table } from 'react-daisyui'

const MembersTable = ({ edit, members, deleteFn, editFn }) => {
	return (
		<div className="overflow-x-auto mb-6">
			{/* loop through members array of each house for a table UI*/}
			<Table>
				<Table.Head className='bg-gray-100'>
					<span />
					<span>പേര്</span>
					<span>വയസ്</span>
					<span>ജോലി</span>
					<span>ബ്ലഡ് ഗ്രൂപ്പ്</span>
					<span>ഇ-മെയിൽ</span>
					<span>ഫോൺ</span>
					{edit && <span>HOH</span>}
					{edit && <span></span>}
					{edit && <span></span>}

				</Table.Head>

				<Table.Body className='[&>*:nth-child(even)]:bg-gray-200'>
					{members.map((member, idx) =>
						<Table.Row key={idx}>
							<span>#{idx + 1}</span>
							<span>{member.name}</span>
							<span>{member.age}</span>
							<span>{member.work}</span>
							<span>{member.blood}</span>
							<span>{member.email}</span>
							<span>{member.phone}</span>
							{edit && <span>{member.HOH && "☑️"}</span>}
							{edit && <span><span onClick={() => editFn(idx)} className='text-sm font-semibold cursor-pointer'>Edit</span></span>}
							{edit && <span onClick={() => deleteFn(idx)} className='text-sm font-semibold cursor-pointer'>Delete</span>}
						</Table.Row>
					)}
				</Table.Body>
			</Table>
		</div>
	)
}

export default MembersTable
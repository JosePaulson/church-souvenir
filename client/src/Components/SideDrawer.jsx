import React from 'react'
import { Link } from 'react-router-dom'
import { Drawer, Menu } from 'react-daisyui';
import { wards } from '../wards'
const SideDrawer = ({ visible, toggleVisible }) => {
	return (
		<Drawer
			className='z-[100]'
			open={visible}
			onClickOverlay={toggleVisible}
			side={
				<Menu className="h-full p-4 w-80 bg-base-200 text-base-content">
					<Menu.Item>
						<a>സന്ദേശങ്ങൾ</a>
					</Menu.Item>
					<Menu.Item>
						<Menu.Details label={'കുടുംബങ്ങൾ'}>
							<div className='grid grid-cols-2 gap-2 mt-2 place-items-center'>
								{wards.map(ward =>
									<Menu.Item key={ward.number} onClick={toggleVisible} className='text-[.8rem] w-fit border-[1px] border-gray-300 rounded-md'>
										<Link to={`/wards/${ward.number}`}>വാർഡ് - {ward.number}</Link>
									</Menu.Item>
								)}
							</div>
						</Menu.Details>
					</Menu.Item>
				</Menu>
			}
		>
		</Drawer>
	)
}

export default SideDrawer
import React from 'react';
import { useNavigate } from 'react-router-dom';

import OAuth from './Oauth';
import { UserAuth } from '../context/AuthContext';

const Nav = () => {
	const navigate = useNavigate();
	const { logout, user, onDemo } = UserAuth();

	const location = window.location.pathname;
	let navMenu;
	if (user) {
		navMenu = (
			<>
				<div
					onClick={() => navigate('/account')}
					className={location === '/account' ? 'nav-link active' : 'nav-link'}
				>
					Account
				</div>
				<div onClick={logout} className='nav-link'>
					Log Out
				</div>
			</>
		);
	} else {
		navMenu = (
			<>
				<div onClick={() => onDemo(navigate)} className='nav-link'>
					Demo
				</div>
				<OAuth />
			</>
		);
	}

	return (
		<div className='nav'>
			<div className='nav-top' />
			<div className='nav-body'>
				<img
					onClick={() => navigate('/')}
					className='nav-image'
					src='./lyell_logo.svg'
					alt=''
				/>
				<div className='nav-menu'>{navMenu}</div>
			</div>
		</div>
	);
};

export default Nav;

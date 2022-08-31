import React from 'react';
import { useNavigate } from 'react-router-dom';

import OAuth from './Oauth';
import { UserAuth } from '../context/AuthContext';

const Nav = () => {
	// const navigate = useNavigate();
	const { logout, user } = UserAuth();

	let navMenu;
	console.log('user', user);
	if (user) {
		navMenu = (
			<div onClick={logout} className='nav-link'>
				Log Out
			</div>
		);
	} else {
		navMenu = <OAuth />;
	}

	return (
		<div className='nav'>
			<div className='nav-top' />
			<div className='nav-body'>
				<img className='nav-image' src='./lyell_logo.svg' alt='' />
				{navMenu}
			</div>
		</div>
	);
};

export default Nav;

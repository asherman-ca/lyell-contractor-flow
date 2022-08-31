import React from 'react';
import OAuth from './Oauth';

const Nav = () => {
	return (
		<div className='nav'>
			<div className='nav-top' />
			<div className='nav-body'>
				<img className='nav-image' src='./lyell_logo.svg' alt='' />
				{/* <div className='nav-link'>Sign In</div> */}
				<OAuth />
			</div>
		</div>
	);
};

export default Nav;

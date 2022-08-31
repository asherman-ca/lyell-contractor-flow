import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function OAuth() {
	const navigate = useNavigate();
	const { oAuth } = UserAuth();

	const onGoogleClick = async () => {
		oAuth(navigate);
	};

	return (
		<div onClick={onGoogleClick} className='nav-link'>
			Sign In
		</div>
	);
}

export default OAuth;

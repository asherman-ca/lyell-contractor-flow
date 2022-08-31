import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.config';
// import { UserAuth } from '../context/AuthContext';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';

function OAuth() {
	const navigate = useNavigate();
	// const { oAuth } = UserAuth();

	const onGoogleClick = async () => {
		try {
			// const auth = getAuth();
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);

			navigate('/');
		} catch (error) {
			// toast.error('Could not authorize with Google');
			console.log('error');
		}
	};

	return (
		<div onClick={onGoogleClick} className='nav-link'>
			Sign In
			{/* <img className='oauth-logo' src='../google.png' alt='' /> */}
		</div>
	);
}

export default OAuth;

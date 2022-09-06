import { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';
import { db } from '../firebase.config';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import {
	setDoc,
	doc,
	serverTimestamp,
	collection,
	query,
	where,
	limit,
	getDocs,
	getDoc,
} from 'firebase/firestore';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	// const signIn = async (navigate, formData) => {
	// 	try {
	// 		const userCredential = await signInWithEmailAndPassword(
	// 			auth,
	// 			formData.email,
	// 			formData.password
	// 		);

	// 		if (userCredential.user) {
	// 			navigate('/account');
	// 		}
	// 	} catch (error) {
	// 		toast.error('Invalid credentials');
	// 	}
	// };

	const oAuth = async (navigate) => {
		try {
			// const auth = getAuth();
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
			toast.success('Logged in');
			// const user = result.user;

			navigate('/account');
		} catch (error) {
			toast.error('Could not authorize with Google');
		}
	};

	const onDemo = async (navigate) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				'asd@asd.com',
				'asdasd'
			);

			if (userCredential.user) {
				navigate('/account');
				toast.success('Logged in');
			}
		} catch (error) {
			toast.error('Invalid credentials');
		}
	};

	const logout = () => {
		console.log('hits');
		signOut(auth);
		toast.error('Logged out');
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log('current user', currentUser);
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<UserContext.Provider value={{ user, logout, oAuth, onDemo }}>
			{children}
		</UserContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(UserContext);
};

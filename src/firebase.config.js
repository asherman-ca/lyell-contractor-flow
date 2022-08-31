import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBkhNFch_OF_ZflLBCYU3cbx91UTVSmCUA',
	authDomain: 'lyell-contractor-flow.firebaseapp.com',
	projectId: 'lyell-contractor-flow',
	storageBucket: 'lyell-contractor-flow.appspot.com',
	messagingSenderId: '880350221192',
	appId: '1:880350221192:web:d0832497bdea19ae7be03d',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);

export default app;

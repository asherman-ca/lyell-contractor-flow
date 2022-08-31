import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContextProvider } from './context/AuthContext';
import Splash from './pages/Splash/Splash';
import SignIn from './pages/Auth/SignIn';
import Account from './pages/Account/Account';
import Nav from './components/Nav';
import './styles/App.css';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
	return (
		<>
			<AuthContextProvider>
				<Nav />
				<Routes>
					<Route path='/' element={<Splash />} />
					<Route path='/signin' element={<SignIn />} />
					<Route
						path='/account'
						element={
							<ProtectedRoute>
								<Account />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AuthContextProvider>
			<ToastContainer />
		</>
	);
}

export default App;

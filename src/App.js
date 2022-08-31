import { Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash/Splash';
import SignIn from './pages/Auth/SignIn';
import './styles/App.css';
import Nav from './components/Nav';

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path='/' element={<Splash />} />
				<Route path='/signin' element={<SignIn />} />
			</Routes>
		</>
	);
}

export default App;

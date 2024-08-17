import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import PageLayout from './Layout/PageLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase';

export default function App() {
	const [authUser] = useAuthState(auth);
	
	return (
		<PageLayout>
			<Routes>
				<Route
					path="/"
					element={authUser ? <HomePage /> : <Navigate to="/au
						th" />}
				/>
				<Route
					path="/auth"
					element={!authUser ? <AuthPage /> : <Navigate to="/" />}
				/>
				<Route path={`/:username`} element={<ProfilePage />} />
			</Routes>
		</PageLayout>
	);
}

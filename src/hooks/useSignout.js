// Sign out functionality from 'react firebase hook'
import { auth } from '../firebase/firebase';
import { useSignOut } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import { useSetRecoilState } from 'recoil';
import { AuthStore } from '../store/authStore';

export default function useSignout() {
	const [signOut, error, isLogginOut] = useSignOut(auth);
	const showToast = useShowToast();
	const setUser = useSetRecoilState(AuthStore);
	const handleLogout = async () => {
		try {
			const success = await signOut();
			if (!success && error) {
				showToast('Error', error.message, 'error');
				return;
			}
			if (success) {
				showToast('Success', 'Log Out ', 'success');
				setUser(null);
				localStorage.removeItem('user-info');
			}
		} catch (error) {
			showToast('Error', error.message, 'error');
		}
	};
	return { handleLogout, error, isLogginOut };
}

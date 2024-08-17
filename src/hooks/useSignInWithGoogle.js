import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import { useSetRecoilState } from 'recoil';
import { auth, firestore } from '../firebase/firebase';
import { AuthStore } from '../store/authStore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const useGoogleAuth = () => {
	const [signInWithGoogle, error] = useSignInWithGoogle(auth);
	const login = useSetRecoilState(AuthStore);
	const showToast = useShowToast();

	const handleGoogleAuth = async () => {
		console.log('clicked');

		try {
			const newUser = await signInWithGoogle();
			if (!newUser && error) {
				showToast('Error', error.message, 'error');
				return;
			}
			const userRef = doc(firestore, 'users', newUser.user.uid);
			const userSnap = await getDoc(userRef);
			console.log(userSnap);

			if (userSnap.exists()) {
				// login
				console.log('login');

				const userData = userSnap.data();

				localStorage.setItem('user-info', JSON.stringify(userData));
				login(userData);
			} else {
				console.log('sign up');

				// signup
				const userDb = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					username: newUser.user.email.split('@')[0],
					fullName: newUser.user.displayName,
					profilePicUrl: newUser.user.photoURL,
					bio: '',
					createdAt: Date.now(),
					followers: [],
					following: [],
					posts: [],
				};
				await setDoc(doc(firestore, 'users', newUser.user.uid), userDb);

				localStorage.setItem('user-info', JSON.stringify(userDb));
				console.log(userDb)
				login(userDb);
			}
		} catch (error) {
			showToast('Error', error.message, 'error');
			console.log(error.message);
		}
	};
	return { handleGoogleAuth };
};

export default useGoogleAuth;

import { auth, firestore } from '../firebase/firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { collection, doc,  getDocs, query, setDoc, where } from 'firebase/firestore';

import useShowToast from './useShowToast';
import { useRecoilState } from 'recoil';
import { AuthStore } from '../store/authStore';
function useSignupWithEmailAndPassword() {
	// firebase inbuilt hook

	const [createUserWithEmailAndPassword, loading, error] =
		useCreateUserWithEmailAndPassword(auth);
	const [user, setUser] = useRecoilState(AuthStore);

	const showToast = useShowToast();

	

	const signup = async (inputs) => {
		if (
			!inputs.email ||
			!inputs.username ||
			!inputs.password ||
			!inputs.fullName
		) {
			showToast('Error', 'Please fill in the the fields', 'error');
			alert('hi');
			return;
		}
		// optimizing for the check of same username
	// createing the reference
	const userRef = collection(firestore, 'users');
	// creating query
		const q = query(userRef, where('username', '==', inputs.username));
		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			showToast('Error', 'Username already exists', 'error');
			return;
		}

		try {
			const newUser = await createUserWithEmailAndPassword(
				inputs.email,
				inputs.password
			);
			if (!newUser && error) {
				showToast('Error', 'email exists', 'error');
				return;
			}
			if (newUser) {
				const userDb = {
					uid: newUser.user.uid,
					email: inputs.email,
					username: inputs.username,
					fullName: inputs.fullName,
					profilePicUrl: '',
					password: inputs.password,
					createdAt: Date.now(),
					followers: [],
					following: [],
					posts: [],
					bio:''
				};
				await setDoc(doc(firestore, 'users', newUser.user.uid), userDb);
				localStorage.setItem('user-info', JSON.stringify(userDb));
				console.log(userDb)
				setUser(userDb);
				showToast('Success', 'User created successfully', 'success');
			}
		} catch (error) {
			showToast('Error', error.message, 'error');
		}
		console.log(user);
	};
	return { loading, error, signup };
}

export default useSignupWithEmailAndPassword;

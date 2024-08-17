import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import useShowToast from './useShowToast';
import { useSetRecoilState } from 'recoil';
import { getDoc, doc } from 'firebase/firestore';
import { AuthStore } from '../store/authStore';

export default function useSignIn() {
	const [signInWithEmailAndPassword, loading] =
		useSignInWithEmailAndPassword(auth);

	const showToast = useShowToast();

	const setUser = useSetRecoilState(AuthStore);

	async function handleLogin(inputs) {
			if (!inputs.email || !inputs.password) {
				showToast('Error', "Please Fill in all the field", 'error')
				return;
			}
		try {
			const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
			// get the document from cloud firestore
			const docRef = doc(firestore, "users", userCred.user.uid);
			console.log(userCred)
			console.log(docRef)
		
			const docSnap = await getDoc(docRef);
			// getting data form the snap
			console.log(docSnap)
			const userData = docSnap.data();
			console.log(userData)
			localStorage.setItem('user-info', JSON.stringify(userData));
			setUser(userData);
			
		} catch (error) {
			showToast('Error', error.message, 'error');
		}
	}

	return { loading, handleLogin };
}

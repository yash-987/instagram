import { useEffect, useState } from 'react';
import useShowToast from './useShowToast';

import { firestore } from '../firebase/firebase';
import { doc,  getDoc } from 'firebase/firestore';

function useGetUserProfileById(userId) {
	const [isLoading, setIsloading] = useState(true);
	const [userProfile, setUserProfile] = useState(null);
	const showToast = useShowToast();


	useEffect(() => {
		const getUserProfile = async () => {
			setIsloading(true);
			setUserProfile(null);
			try {
				console.log('hook called');
				console.log('getting the reference of doc');
 
				const userRef = doc(firestore, 'users', userId)

				const docSnap = await getDoc(userRef);

				if (docSnap.exists()) return setUserProfile(
					docSnap.data()
				)
				else console.log('User data not found')
				
			

				
			} catch (error) {
				showToast('Error', error.message, 'error');
				
			} finally {
				setIsloading(false);
			}
		};
		getUserProfile();
	}, [setUserProfile, showToast, userId]);

	return { isLoading, userProfile, setUserProfile };
}

export default useGetUserProfileById;

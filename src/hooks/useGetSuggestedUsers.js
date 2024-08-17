import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AuthStore } from '../store/authStore';
import useShowToast from './useShowToast';
import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

export default function useGetSuggestedUsers() {
	const [isLoading, setIsLoading] = useState(true);
	const [suggestedUsers, setSuggestedUsers] = useState([]);
	const user = useRecoilValue(AuthStore);
	const showToast = useShowToast();

	useEffect(() => {
		console.log('useeffect triggered , user=',user)
		//function to get the suggested users
		const getSuggestedUsers = async () => {
			setIsLoading(true);
			try {
				//getting users reference from the collection
				const usersRef = collection(firestore, 'users');
				//creating a query
				const q = query(
					usersRef,
					where('uid', 'not-in', [user.uid, ...user.following]),
					orderBy('uid'),
					limit(5)
				);

				// executing the query
				const querySnapshot = await getDocs(q);

				const users = [];

				querySnapshot.forEach((doc) => {
					users.push({ ...doc.data(), id: doc.id });
				});
				setSuggestedUsers( users);
				console.log(`suggested users `,users);
				
				
			} catch (error) {
                showToast('Error', error.message, 'error');
                console.log(error)
			} finally {
				setIsLoading(false);
				
			}
		};

		if (user) {
			// console.log('user is present');
			getSuggestedUsers()
		} else {
			// console.log('user is not present');
		}
	}, [showToast, user]);

	return { suggestedUsers, isLoading };
}

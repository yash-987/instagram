import { useEffect, useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { UserProfile } from '../store/userProfile';
import {  useRecoilState } from 'recoil';

const useGetUserProfileByUsername = (username) => {
	const [isLoading, setIsLoading] = useState(true);
	const showToast = useShowToast();
	const [userProfile, setUserProfile] = useRecoilState(UserProfile);
	
	useEffect(() => {
		async function getUserProfile() {
			setIsLoading(true);
			
			try {
				// creating a reference to the collection
				const userProfileRef = collection(firestore, 'users');
				// creating query
				const q = query(userProfileRef, where('username', '==', username));
				
				//    calling query
				const querySnapshot = await getDocs(q);

				if (querySnapshot.empty) 
					return setUserProfile(null);
				

				// initialize userDatabase
				let userDb;
				querySnapshot.forEach((doc) => (userDb = doc.data()));
                setUserProfile(userDb);
                // console.log(userDb)
			} catch (error) {
				showToast('Error', error.message, 'error');
            }
            finally {
                setIsLoading(false)
            }
        }
        getUserProfile()
    }, [username, showToast, setUserProfile]);
    return{userProfile,isLoading}
};

export default useGetUserProfileByUsername;

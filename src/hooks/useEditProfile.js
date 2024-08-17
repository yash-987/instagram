import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AuthStore } from '../store/authStore';
import useShowToast from './useShowToast';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { firestore, storage } from '../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { UserProfile } from '../store/userProfile';
// import {useParams} from 'react-router-dom'
const useEditProfile = () =>{
	
	const [isUpdating, setIsUpdating] = useState(false);
	const [user, setUser] = useRecoilState(AuthStore);
	const setUserProfile = useSetRecoilState(UserProfile)
	const showToast = useShowToast();

	async function EditProfile(inputs, selectedFile) {
		
		if (isUpdating || !user) return;
		setIsUpdating(true);
     
		const storageRef = ref(storage, `profilePics/${user.uid}`);
		const userDbRef = doc(firestore, 'users', user.uid);

		let URL = '';

		try {
			
			if (selectedFile) {
				await uploadString(storageRef, selectedFile, 'data_url');
				URL = await getDownloadURL(storageRef);
			
			}

			// updating the user data after any change
			const updatedUser = {
				...user,
				fullName: inputs.fullName || user.fullName,
				username: inputs.username || user.username,
				bio: inputs.bio || user.bio,
				profilePicUrl: URL || user.profilePicUrl,
			};
			//updating the userdata in the document
			await updateDoc(userDbRef, updatedUser)
			// updating in local storage
			localStorage.setItem('user-info', JSON.stringify(updatedUser))
			setUser(updatedUser)
			setUserProfile(updatedUser)
			showToast('Success', "Profile Updated Successfully", 'success')
			setIsUpdating(false);
           
		} catch (error) {
			showToast('Error', error.message, 'error');
		}
	}

	return {EditProfile,isUpdating}
};

export default useEditProfile;

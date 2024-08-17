import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import useShowToast from './useShowToast';

export function UpdateProfile() {
	const [updateProfile, error] = useUpdateProfile(auth);

	const showToast = useShowToast();
	async function handleUpdateProfile(displayName) {
		try {
			const updatedUsername = await updateProfile({ displayName });
			if (!updatedUsername && error) {
				showToast('Error', 'Error updating profile', 'error');
				return;
            }
            showToast('Success',"Username Updated Successfully",'success')
		} catch (error) {
			showToast('Error', error.message, 'error');
		}
    }
    return {handleUpdateProfile}
}

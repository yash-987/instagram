import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { AuthStore } from '../store/authStore';
import { UserProfile } from '../store/userProfile';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

function useFollowUser(userId) {
	const [isUpdating, setIsUpdating] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const [user, setUser] = useRecoilState(AuthStore);
	const [userProfile, setUserProfile] = useRecoilState(UserProfile);
	const showToast = useShowToast();

	// actual logic by which a user will follow another user

	const handleFollower = async () => {
		setIsUpdating(true);
		try {
			// get the current users reference
			const userRef = doc(firestore, 'users', user.uid);
			//get the user's reference to follow or unfollow
			const userToFollowOrUnfollowRef = doc(firestore, 'users', userId);

			// updating following list of current user
			await updateDoc(userRef, {
				following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
			});
			// updating followers list of the user which has been followed
			await updateDoc(userToFollowOrUnfollowRef, {
				followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid),
			});

			// updating userDoc and userProfile in UI
			if (isFollowing) {
				//unfollow
				// updating users following list
				setUser({
					...user,
					following: user.following.filter((uid) => uid !== userId),
				});
				// updating user profile which has been followed
				if(userProfile)
					setUserProfile({
						...userProfile,
						followers: userProfile.followers.filter((uid) => uid !== user.uid),
					});

				// updating local storage

				localStorage.setItem(
					'user-info',
					JSON.stringify({
						...user,
						following: user.following.filter((uid) => uid !== userId),
					})
				);

				setIsFollowing(false);
			} else {
				//follow
				setUser({
					...user,
					following: [...user.following, userId],
				});

				if(userProfile)
					setUserProfile({
						...userProfile,

						// followers: userProfile.followers.push(user.uid), //this method doesn't work shows error that object is not extensible

						followers: [...userProfile.followers, user.uid],
					});

				localStorage.setItem(
					'user-info',
					JSON.stringify({
						...user,
						// following: user.following.push(userId),    this method doesn't work shows error that object is not extensible

						following: [...user.following, userId],
					})
				);

				setIsFollowing(true);
			}
		} catch (error) {
			showToast('Error', error.message, 'error');
			
		} finally {
			setIsUpdating(false);
		}

		
	};

	//updating following state if this function is used

	useEffect(() => {
		if (user) {
			const isFollowing = user.following.includes(userId);
			setIsFollowing(isFollowing);
		}
	}, [user, userId]);

	return {
		isUpdating,
		isFollowing,	
		handleFollower,
		setUser
	};
}

export default useFollowUser;

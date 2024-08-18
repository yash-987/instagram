import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PostStore } from '../store/postStore';
import useShowToast from './useShowToast';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { UserProfile } from '../store/userProfile';


function useGetUserPosts() {
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useRecoilState(PostStore);
	const showToast = useShowToast();
	const userProfile = useRecoilValue(UserProfile);
	// console.log(userProfile.posts)
	useEffect(() => {
		// console.log('UseEffect triggered', userProfile);
		// console.log('hi');

		const getPosts = async () => {
			if (!userProfile) return;
			setIsLoading(true);
			setPosts([]);
			try {
				const postRef = collection(firestore, 'posts');
				const q = query(postRef, where('createdBy', '==', userProfile.uid));
				const querySnapshot = await getDocs(q);
             
				const posts = [];
				querySnapshot.forEach((doc) =>
					posts.push({ ...doc.data(), id: doc.id })
				);

				//sort posts in ascending order
				posts.sort((a, b) => b.createdAt - a.createdAt);
				setPosts(posts);
				// console.log('posts',posts)
			} catch (error) {
				showToast('Error', error.message, 'error');
				setPosts([]);
			} finally {
				setIsLoading(false);
			}
		};
		getPosts();
		// console.log('posts', posts);
		
	}, [setPosts, userProfile, showToast,]);

	return { isLoading, posts };
}

export default useGetUserPosts;

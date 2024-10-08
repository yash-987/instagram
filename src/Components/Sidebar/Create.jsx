import {
	Box,
	Flex,
	Tooltip,
	Modal,
	Image,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	useDisclosure,
	ModalBody,
	Textarea,
	Input,
	ModalFooter,
	Button,
	CloseButton,
} from '@chakra-ui/react';
import { CreatePostLogo } from '../../assets/Constants';
import { BsFillImageFill } from 'react-icons/bs';
import { useRef, useState } from 'react';
import usePreviewImg from '../../hooks/usePreviewImg';
import useShowToast from '../../hooks/useShowToast';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AuthStore } from '../../store/authStore';
import { useLocation } from 'react-router-dom';
import { UserProfile } from '../../store/userProfile';
import { PostStore } from '../../store/postStore';
import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	updateDoc,
} from 'firebase/firestore';
import { firestore, storage } from '../../firebase/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const CreatePost = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [caption, setCaption] = useState('');
	const fileRef = useRef(null);
	const { isLoading, handleCreatePost } = useCreatePost();
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const showToast = useShowToast();
	const handlePostCreation = async () => {
		try {
			await handleCreatePost(selectedFile, caption);
			onClose();
			setCaption('');
			setSelectedFile(null);
		} catch (error) {
			showToast('Error', error.message, 'error');
		}
	};
	return (
		<>
			<Tooltip
				hasArrow
				label={'Create'}
				placement="right"
				ml={1}
				openDelay={500}
				display={{ base: 'block', md: 'none' }}
			>
				<Flex
					alignItems={'center'}
					gap={4}
					_hover={{ bg: 'whiteAlpha.400' }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: 'full' }}
					justifyContent={{ base: 'center', md: 'flex-start' }}
					onClick={onOpen}
				>
					<CreatePostLogo />
					<Box display={{ base: 'none', md: 'block' }}>Create</Box>
				</Flex>
			</Tooltip>
			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />

				<ModalContent bg={'black'} border={'1px solid gray'}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea
							value={caption}
							onChange={(e) => setCaption(e.target.value)}
							placeholder="Post caption..."
						/>

						<Input
							type="file"
							hidden
							ref={fileRef}
							onChange={handleImageChange}
						/>

						<BsFillImageFill
							onClick={() => fileRef.current.click()}
							style={{
								marginTop: '15px',
								marginLeft: '5px',
								cursor: 'pointer',
							}}
							size={16}
						/>
						{selectedFile && (
							<Flex
								mt={5}
								w={'full'}
								position={'relative'}
								justifyContent={'center'}
							>
								<Image src={selectedFile} alt="Selected Image" />
								<CloseButton
									position={'absolute'}
									top={2}
									right={2}
									onClick={() => {
										setSelectedFile(null);
									}}
								/>
							</Flex>
						)}
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreatePost;

function useCreatePost() {
	const [isLoading, setIsLoading] = useState(false);
	const showToast = useShowToast();
	const user = useRecoilValue(AuthStore);
	const [posts, setPosts] = useRecoilState(PostStore);

	const { pathname } = useLocation();
	const [userProfile, setUserProfile] = useRecoilState(UserProfile);
	
	const CreatePosts = (post) => {
		setPosts([...posts, post]);
	};

	const AddPost = (post) => {
		setUserProfile({
			...userProfile,
			posts: [...posts, post],
		});
	};

	// handle of creating post
	const handleCreatePost = async (selectedFile, caption) => {
		if (isLoading) return;
		if (!selectedFile) throw new Error('Please select an image');
		setIsLoading(true);

		const newPost = {
			caption: caption,
			likes: [],
			comments: [],
			createdAt: Date.now(),
			createdBy: user.uid,
		};

		try {
			//post ref
			const PostRef = collection(firestore, 'posts');
			const PostDoc = await addDoc(PostRef, newPost);

			console.log('post creation started');
		
			//userREf
			const userDocRef = doc(firestore, 'users', user.uid);
			//imageref
			const imageRef = ref(storage, `posts/${PostDoc.id}`);

			// update doc
			await updateDoc(userDocRef, {
				posts: arrayUnion(PostDoc.id),
			});

			await uploadString(imageRef, selectedFile, 'data_url');

			const downloadUrl = await getDownloadURL(imageRef);

			await updateDoc(PostDoc, {
				imageUrl: downloadUrl,
			});
			// post created in backend
			newPost.imageUrl = downloadUrl;

			// console.log(downloadUrl);

			console.log('post is just about to be created');

			if (userProfile.uid === user.uid)
				CreatePosts({ ...newPost, id: PostDoc.id });

			if (pathname !== '/' && userProfile.uid === user.uid) AddPost({ ...newPost, id: PostDoc.id });

			// addPost({ ...newPost, id: PostDoc.id });

			console.log('before successfull');
			showToast('Success', 'Post Created Successfully', 'success');
			console.log('after successfull');
		} catch (error) {
			showToast('Error', error.message, 'error');
			console.log(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreatePost };
}
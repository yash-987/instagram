import {
	Flex,
	GridItem,
	Image,
	Text,
	VStack,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	Avatar,
	Divider,
	Button,
} from '@chakra-ui/react';
import PostFooter from '../Fyp/PostFooter';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';
import Comment from '../Comments/Comment';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserProfile } from '../../store/userProfile';
import { AuthStore } from '../../store/authStore';

import useShowToast from '../../hooks/useShowToast';
import { useState } from 'react';
import { firestore, storage } from '../../firebase/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { PostStore } from '../../store/postStore';
import Caption from '../Comments/Caption';
// import {  PostStore } from '../../store/postStore';

function ProfilePost({ post }) {
	// const {isLoading,handleDeletePost} = useDeletePost()
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [userProfile, setUserProfile] = useRecoilState(UserProfile);
	const user = useRecoilValue(AuthStore);
	const showToast = useShowToast();
	const [posts, setPosts] = useRecoilState(PostStore);
	const [isDeleting, setIsDeleting] = useState(false);

	function dltPost(id) {
		setPosts(posts.filter((post) => post.id !== id));
	}

	function decrementPostsCount(postId) {
		setUserProfile({
			...userProfile,
			posts: userProfile.posts.filter((id) => id !== postId),
		});
	}

	const handleDeletePost = async () => {
		setIsDeleting(true);
		if (!window.confirm('Are you sure you want to delete this post?')) return;
		try {
			//image ref
			const imageRef = ref(storage, `posts/${post.id}`);
			console.log(imageRef);
			//delete obj
			await deleteObject(imageRef);

			const userRef = doc(firestore, 'users', user.uid);

			await deleteDoc(doc(firestore, 'posts', post.id));

			await updateDoc(userRef, {
				posts: arrayRemove(post.id),
			});
			dltPost(post.id);
			decrementPostsCount(post.id);

			showToast('Success', 'Post deleted successfully', 'success');
		} catch (error) {
			showToast('Error', error.message, 'error');
		} finally {
			setIsDeleting(false);
		}
	};
	return (
		<>
			<GridItem
				cursor={'pointer'}
				borderRadius={4}
				overflow={'hiddren'}
				border={'1px solid'}
				borderColor={'whiteAlpha.300'}
				position={'relative'}
				aspectRatio={1 / 1}
				onClick={onOpen}
			>
				{/* Likes and comments on hovering the image */}
				<Flex
					opacity={0}
					_hover={{ opacity: 1 }}
					position={'absolute'}
					top={0}
					left={0}
					bottom={0}
					right={0}
					bg={'blackAlpha.700'}
					transition={'all 0.3s ease'}
					zIndex={1}
					justifyContent={'center'}
				>
					<Flex alignItems={'center'} justifyContent={'cetner '} gap={50}>
						<Flex>
							<AiFillHeart size={20} />
							<Text fontWeight={'bold'} ml={2}>
								{post.likes?.length}
							</Text>
						</Flex>
						<Flex>
							<FaComment size={20} />
							<Text fontWeight={'bold'} ml={2}>
								{post.comments?.length}
							</Text>
						</Flex>
					</Flex>
				</Flex>

				<Image
					src={post.imageUrl}
					alt="profile post"
					w="100%"
					h="100%"
					objectFit={'cover'}
				/>
			</GridItem>

			<Modal
				size={{ base: '3xl', md: '6xl' }}
				isCentered={true}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody bg={'black'}>
						<Flex
							maxH={'90vh'}
							maxW={'90vh'}
							gap={4}
							w={{ base: '90%', sm: '70%', md: 'full' }}
							mx={'auto'}
						>
							<Flex
								justifyContent={'center'}
								alignItems={'center'}
								borderRadius={4}
								overflow={'hidden'}
								border={'1px solid'}
								borderColor={'whiteAlpha.300'}
								flex={1.5}
							>
								<Image src={post.imageUrl} alt="profile post" />
							</Flex>
							<Flex
								flex={1}
								flexDir={'column'}
								px={10}
								display={{
									base: 'none',
									md: 'flex',
								}}
							>
								<Flex
									alignItems={'center'}
									justifyContent={'space-around'}
									w={'full'}
								>
									<Flex alignItems={'center'} gap={4}>
										<Avatar
											src={userProfile.profilePicUrl}
											size={'sm'}
											name="ayoitsyash"
										/>

										<Text fontWeight={'bold'} fontSize={12}>
											{userProfile.username}
										</Text>
									</Flex>
									{post.caption && <Caption post={post} />}
									{user.uid === userProfile.uid && (
										<Button
											size={'sm'}
											bg={'transparent'}
											isLoading={isDeleting}
											onClick={handleDeletePost}
											_hover={{ bg: 'whiteALpha.300', color: 'red.600' }}
											borderRadius={4}
											p={1}
										>
											<MdDelete size={20} cursor={'pointer'} />
										</Button>
									)}
								</Flex>

								<Divider my={4} bg={'gray.500'} />

								{/* Comments */}
								<VStack
									w={'full'}
									alignItems={'start'}
									maxH={'350px'}
									overflowY={'auto'}
								>
									{/* caption */}

									{/* comments */}
									{post.comments?.map((comment,idx) => (
										<Comment key={idx} comment={comment} />
									))}
								</VStack>
								<Divider mt={'auto'} bg={'gray.800'} />
								<PostFooter isProfilePage={true} post={post} />
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

ProfilePost.propTypes = {
	post: PropTypes.object,
};

export default ProfilePost;

import {
	Box,
	Button,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import {
	CommentLogo,
	NotificationsLogo,
	UnlikeLogo,
} from '../../assets/Constants';
import PropTypes from 'prop-types';
import useCreateComment from '../../hooks/useCreateComment';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AuthStore } from '../../store/authStore';
import useLikePost from '../../hooks/useLikePost';
import { PostStore } from '../../store/postStore';
import { timeAgo } from '../../../utils/timeAgo';
import CommentsModal from '../Modals/CommentsModal';
function PostFooter({ post,  isProfilePage, creatorProfile }) {
	const [comment, setComment] = useState('');
	const { isCommenting, handleComment } = useCreateComment();
	const user = useRecoilValue(AuthStore);
	const commentRef = useRef(null);
	const { isLiked, likeCount, handleLikePost } = useLikePost(post);
	const setPosts = useSetRecoilState(PostStore);
	const { isOpen, onClose, onOpen } = useDisclosure();

	const addCommentToPostStore = (postId, comment) => {
		setPosts((prevPosts) =>
			prevPosts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						comments: [...post.comments, comment],
					};
				}
				return post;
			})
		);
	};
	// const setPosts= useSetRecoilState(PostStore)

	// adding a comment to the post  store

	// const addCommentToPostStore = useCallback((postId, comment) => {
	//     setPosts((prevPosts) => prevPosts.map((post) => {
	//         if (post.id === postId) {
	//             return {
	//                 ...post,
	//                 comments: [...post.comments, comment],
	//             }
	//         }
	//         return post
	//     }))
	// },[setPosts])
	async function handlePostComment(e) {
		e.preventDefault();
		await handleComment(post.id, comment);
		addCommentToPostStore(post.id, comment);
		setComment('');
	}

	return (
		<Box mb={10}>
			<Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={'4'}>
				<Box onClick={handleLikePost} cursor={'pointer'} fontSize={18}>
					{!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
				</Box>
				<Box
					cursor={'pointer'}
					fontSize={18}
					onClick={() => commentRef.current.focus()}
				>
					<CommentLogo />
				</Box>
			</Flex>
			<Text fontWeight={600} fontSize={'sm'}>
				{likeCount === 1 || likeCount == 0
					? `${likeCount} like`
					: `${likeCount} likes`}
			</Text>
			{isProfilePage && (
				<Text fontSize={12} color={'gray'}>
					Posted {timeAgo(post.createdAt)}
				</Text>
			)}
			{!isProfilePage && (
				<>
					<Text fontSize={'sm'} fontWeight={700}>
						{creatorProfile?.username}{' '}
						<Text as={'span'} fontWeight={400}>
							{post.caption}
						</Text>
					</Text>
					{post.comments.length > 0 && (
						<Text
							fontSize={'sm'}
							color={'gray'}
							cursor={'pointer'}
							onClick={onOpen}
						>
							View all {post.comments.length} comments
						</Text>
					)}
					{isOpen ? (
						<CommentsModal post={post} isOpen={isOpen} onClose={onClose} />
					) : null}
				</>
			)}

			{user && (
				<Flex
					alignItems={'center'}
					gap={2}
					justifyContent={'center'}
					w={'full'}
				>
					<InputGroup>
						<Input
							placeholder="Add a comment..."
							variant={'flushed'}
							fontSize={14}
							onChange={(e) => setComment(e.target.value)}
							value={comment}
							ref={commentRef}
						/>
						<InputRightElement>
							<Button
								color={'blue.500'}
								bg={'transparent'}
								_hover={{ color: 'white' }}
								fontWeight={600}
								cursor={'pointer'}
								fontSize={14}
								isLoading={isCommenting}
								onClick={handlePostComment}
							>
								Post
							</Button>
						</InputRightElement>
					</InputGroup>
				</Flex>
			)}
		</Box>
	);
}

PostFooter.propTypes = {
	post: PropTypes.object,
	username: PropTypes.string,
	isProfilePage: PropTypes.bool,
	creatorProfile: PropTypes.object,
};
export default PostFooter;

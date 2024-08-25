import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import { Box, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
function Posts({ post }) {
	const { userProfile } = useGetUserProfileById(post.createdBy);

	return (
		<>
            <PostHeader post={post} creatorProfile={userProfile} />
			<Box my={2} overflow={'hidden'} borderRadius={4}>
				<Image src={post.imageUrl} alt="Image" />
			</Box>
			<PostFooter post={post} creatorProfile={userProfile} />
		</>
	);
}
Posts.propTypes = {
	post: PropTypes.object,
};

export default Posts;

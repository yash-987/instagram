import {
	Avatar,
	Box,
	Button,
	Flex,
	Skeleton,
	SkeletonCircle,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useFollowUser from '../../hooks/useFollowUser';
import { timeAgo } from '../../../utils/timeAgo';
function PostHeader({ post, creatorProfile }) {
	const { isFollowing, isUpdating, handleFollower } = useFollowUser(
		post.createdBy
	);
	return (
		<Flex
			justifyContent={'space-between'}
			alignItems={'center'}
			w={'full'}
			my={2}
		>
			<Flex alignItems={'center'} gap={2}>
				{/* profile image */}
				{creatorProfile ? (
					<Link to={`/${creatorProfile.username}`}>
						<Avatar
							src={creatorProfile.profilePicUrl}
							size={'sm'}
							alt="user profile pic"
						/>
					</Link>
				) : (
					<SkeletonCircle size="10" />
				)}

				<Flex fontSize={12} fontWeight={'bold'} gap={2}>
					{creatorProfile ? (
						<Link to={`/${creatorProfile.username}`}>
							{creatorProfile.username}
						</Link>
					) : (
						<Skeleton w={'100px'} h={'10px'} />
					)}

					<Box color={'gray.500'}>• {timeAgo(post.createdAt)} </Box>
				</Flex>
			</Flex>
			<Box cursor={'pointer'}>
				<Button
					size={'xs'}
					bg={'transparent'}
					fontSize={12}
					color={'blue.500'}
					fontWeight={'bold'}
					_hover={{
						color: 'white',
					}}
					transition={'0.2s ease-in-out'}
					onClick={handleFollower}
					isLoading={isUpdating}
				>
					{isFollowing ? 'Unfollow' : 'Follow'}
				</Button>
			</Box>
		</Flex>
	);
}

PostHeader.propTypes = {
	post: PropTypes.object.isRequired,
	creatorProfile: PropTypes.object,
};

export default PostHeader;

import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import useFollowUser from '../../hooks/useFollowUser';
import { useRecoilValue } from 'recoil';
import { AuthStore } from '../../store/authStore';

function SuggestedUser({ user, setUser }) {
	const { isFollowing, isUpdating, handleFollower } = useFollowUser(user.uid);

	const authUser = useRecoilValue(AuthStore);

	const onFollowUser = async () => {
		await handleFollower();

		setUser({
			...user,
			followers: isFollowing
				? user.followers.filter((follower) => follower.uid !== authUser.uid)
				: [...user.followers, authUser],
		});
	};

	return (
		<Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
			<Flex alignItems={'center'} gap={2}>
				<Link to={`/${user.username}`}>
					<Avatar src={user.profilePicUrl} name={user.username} size={'md'} />
				</Link>
				<VStack spacing={2} alignItems={'flex-start'}>
					<Link to={`/${user.username}`}>
						<Box fontSize={12} fontWeight={'bold'}>
							{user.username}
						</Box>
					</Link>
					<Box fontSize={11} color={'gray.500'}>
						{user.followers.length} followers
					</Box>
				</VStack>
			</Flex>

			{authUser.uid !== user.uid && (
				<Button
					fontSize={13}
					bg={'transparent'}
					p={0}
					h={'max-content'}
					fontWeight={'medium'}
					cursor={'pointer'}
					color={'blue.400'}
					_hover={{ color: 'white' }}
					isLoading={isUpdating}
					onClick={onFollowUser}
				>
					{isFollowing ? 'Unfollow' : 'Follow'}
				</Button>
			)}
		</Flex>
	);
}

SuggestedUser.propTypes = {
	user: PropTypes.object,
	setUser: PropTypes.func,
};
export default SuggestedUser;

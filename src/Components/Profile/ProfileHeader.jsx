import {
	Avatar,
	AvatarGroup,
	Flex,
	VStack,
	Text,
	Button,
	useDisclosure,
} from '@chakra-ui/react';
import { UserProfile } from '../../store/userProfile';
import { useRecoilValue } from 'recoil';

import { AuthStore } from '../../store/authStore';
import EditProfile from './EditProfile';
import useFollowUser from '../../hooks/useFollowUser';

function ProfileHeader() {
	const userProfile = useRecoilValue(UserProfile);
	const authUser = useRecoilValue(AuthStore);
    //  console.log(userProfile)
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {isUpdating,isFollowing,handleFollower} = useFollowUser(userProfile.uid)

	// console.log(userProfile);
	// console.log(authUser);
	const visitingOwnProfileAndAuth =
		authUser && authUser.username === userProfile.username;
	const visitingAnotherProfileAndAuth =
		authUser && authUser.username !== userProfile.username;
	return (
		<Flex
			gap={{ base: 4, sm: 10 }}
			py={10}
			direction={{ base: 'column', sm: 'row' }}
		>
			<AvatarGroup
				size={{ base: 'xl', md: '2xl' }}
				justifySelf={'center'}
				alignSelf={'flex-start'}
				mx={'auto'}
			></AvatarGroup>
			<Avatar
				name={userProfile.username}
				src={userProfile.profilePicUrl}
				alt={'ayoitsyash'}
			/>

			<VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
				<Flex
					gap={4}
					direction={{ base: 'column', sm: 'row' }}
					justifyContent={{ base: 'center', sm: 'flex-start' }}
					alignItems={'center'}
					w={'full'}
				>
					<Text fontSize={{ base: 'sm', md: 'lg' }}>
						{userProfile.username}
					</Text>
					{visitingOwnProfileAndAuth && (
						<Flex gap={4} alignItems={'center'} justifyContent={'center'}>
							<Button
								bg={'white'}
								color={'black'}
								_hover={{ bg: 'whiteAlpha.800' }}
								size={{ base: 'xs', md: 'sm' }}
								onClick={onOpen}
							>
								Edit Profile
							</Button>
						</Flex>
					)}
					{visitingAnotherProfileAndAuth && (
						<Flex gap={4} alignItems={'center'} justifyContent={'center'}>
							<Button
								bg={'blue.500'}
								color={'white'}
								_hover={{ bg: 'blue.600' }}
								size={{ base: 'xs', md: 'sm' }}
								onClick={handleFollower}
								isLoading={isUpdating}
								
							>
								{isFollowing? 'Unfollow' : "Follow"}
							</Button>
						</Flex>
					)}
				</Flex>

				<Flex alignItems={'center'} gap={{ base: 2, sm: 4 }}>
					<Text fontSize={{ base: 'xs', md: 'sm' }}>
						<Text as="span" fontWeight={'bold'} mr={1}>
							{userProfile.posts.length}
						</Text>
						Posts
					</Text>
					<Text fontSize={{ base: 'xs', md: 'sm' }}>
						<Text as="span" fontWeight={'bold'} mr={1}>
							{userProfile.followers.length}
						</Text>
						followers
					</Text>
					<Text fontSize={{ base: 'xs', md: 'sm' }}>
						<Text as="span" fontWeight={'bold'} mr={1}>
							{userProfile.following.length}
						</Text>
						following
					</Text>
				</Flex>
				<Flex alignItems={'center'} gap={4}>
					<Text fontSize={'sm'} fontWeight={'bold'}>
						{userProfile.fullName}
					</Text>
				</Flex>
				<Text fontSize={'sm'}>{userProfile.bio}</Text>
			</VStack>
			{isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
		</Flex>
	);
}

export default ProfileHeader;

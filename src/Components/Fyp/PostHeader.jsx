import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types'
 function PostHeader({ username, avatar }) {
	return (
		<Flex
			justifyContent={'space-between'}
			alignItems={'center'}
			w={'full'}
			my={2}
		>
			<Flex alignItems={'center'} gap={2}>
				{/* profile image */}
				<Avatar src={avatar} size={'sm'} alt="user profile pic" />
				<Flex fontSize={12} fontWeight={'bold'} gap={2}>
					{username}
					<Box color={'gray.500'}>•1w </Box>
				</Flex>
			</Flex>
			<Box cursor={'pointer'}>
				<Text
					fontSize={12}
					color={'blue.500'}
					fontWeight={'bold'}
					_hover={{
						color: 'white',
					}}
					transition={'0.2s ease-in-out'}
				>
					Unfollow
				</Text>
			</Box>
		</Flex>
	);
}

PostHeader.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
}

export default PostHeader;

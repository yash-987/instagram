import {
	Box,
	Button,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
	CommentLogo,
	NotificationsLogo,
	UnlikeLogo,
} from '../../assets/Constants';
import PropTypes from 'prop-types';
function PostFooter({ username, isProfilePage }) {
	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(0);

	function handleLike() {
		if (liked) {
			setLiked(false);
			setLikeCount((prev) => prev - 1);
		} else {
			setLiked(true);
			setLikeCount((prev) => prev + 1);
		}
	}

	return (
		<Box mb={10}>
			<Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={'4'}>
				<Box onClick={handleLike} cursor={'pointer'} fontSize={18}>
					{!liked ? <NotificationsLogo /> : <UnlikeLogo />}
				</Box>
				<Box cursor={'pointer'} fontSize={18}>
					<CommentLogo />
				</Box>
			</Flex>
			<Text fontWeight={600} fontSize={'sm'}>
				{likeCount === 1 || likeCount == 0
					? `${likeCount} like`
					: `${likeCount} likes`}
			</Text>
			{!isProfilePage && (
				<>
					<Text fontSize={'sm'} fontWeight={700}>
						{username}{' '}
						<Text as={'span'} fontWeight={400}>
							Feeling good
						</Text>
					</Text>
					<Text fontSize={'sm'} color={'gray'}>
						View all 1,000 comments
					</Text>
				</>
			)}

			<Flex alignItems={'center'} gap={2} justifyContent={'center'} w={'full'}>
				<InputGroup>
					<Input
						placeholder="Add a comment..."
						variant={'flushed'}
						fontSize={14}
					/>
					<InputRightElement>
						<Button
							color={'blue.500'}
							bg={'transparent'}
							_hover={{ color: 'white' }}
							fontWeight={600}
							cursor={'pointer'}
							fontSize={14}
						>
							Post
						</Button>
					</InputRightElement>
				</InputGroup>
			</Flex>
		</Box>
	);
}

PostFooter.propTypes = {
	username: PropTypes.string,
	isProfilePage: PropTypes.bool,
};
export default PostFooter;

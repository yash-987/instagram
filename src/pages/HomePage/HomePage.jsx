import { Box, Container, Flex } from '@chakra-ui/react';
import Feed from '../../Components/Fyp/Feed';
import AllSuggestedUsers from '../../Components/SuggestedUsers/AllSuggestedUsers';

function HomePage() {
	return (
		<Container maxW={'container.lg'}>
			<Flex gap={20}>
				{/* feed posts */}
				<Box flex={2} py={10}>
					{/* posts */}
					<Feed />
				</Box>
				{/* Suggested accounts */}
				<Box
					flex={3}
					mr={20}
					display={{ base: 'none', md: 'block' }}
					maxW={'300px'}
				>
					<AllSuggestedUsers />
				</Box>
			</Flex>
		</Container>
	);
}

export default HomePage;

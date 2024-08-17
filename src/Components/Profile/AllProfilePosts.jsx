import { Box, Grid, Skeleton, VStack, Flex, Text } from '@chakra-ui/react';

import ProfilePost from './ProfilePost';
import useGetUserPosts from '../../hooks/useGetUserPosts';
import { useEffect } from 'react';

function AllProfilePosts() {
	const { isLoading, posts } = useGetUserPosts();
	console.log('posts ',posts)
   
	
	const noPostFound = !isLoading && posts?.length === 0;
	
	
	
	if (noPostFound) return <NoPostsFound />;

	return (
		<Grid
			templateColumns={{
				sm: 'repeat(1,1fr)',
				md: 'repeat(3,1fr)',
			}}
			gap={1}
			columnGap={1}
		>
			{isLoading ?
				[0, 1, 2, ].map((_, index) => (
					<VStack key={index} alignItems={'flex-start'} gap={4}>
						<Skeleton w={'full'}>
							<Box h={'300px'}>contents weapped</Box>
						</Skeleton>
					</VStack>
				)):''}

			{!isLoading &&
			
				posts?.map((post) => <ProfilePost key={post.id} post={post} />)}
		</Grid>
	);
}

export default AllProfilePosts;

const NoPostsFound = () => {
	return (
		<Flex flexDir="column" textAlign={'center'} mx={'auto'} mt={10}>
			<Text fontSize={'2xl'}>No Posts Found🤔</Text>
		</Flex>
	);
};

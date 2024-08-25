import { Box,Text, Container, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import Posts from './Posts'

import useGetFeedPosts from '../../hooks/useGetFeedPosts'

function Feed() {
  const { isLoading, posts } = useGetFeedPosts()
  // console.log(posts)
  return (
      <Container maxW={'container.sm'} py={10} px={2}>
      {isLoading && [0, 1, 2, 3].map((_, index) => (
        <VStack key={index} gap={4} alignItems={'flex-start'} mb={10}>
          <Flex gap={2}>
            <SkeletonCircle size={10} />
            <VStack  gap={2} alignItems={'flex-start'}>
                <Skeleton height={'10px'} w={'200px'}/>
                <Skeleton height={'10px'} w={'100px'}/>
            </VStack>
            
          </Flex>
          <Skeleton w={'full'} >
            <Box h={'400px'}>contents wrapped</Box>
          </Skeleton>
          
           </VStack>
          ))}
      

      {!isLoading &&   (
       
        posts.map((post) => (
          <Posts key={post.id} post={post} />
        ))
      )}
      {!isLoading && posts.length === 0 && (
				<>
					<Text fontSize={"md"} color={"red.400"}>
						Dayuum. Looks like you don&apos;t have any friends.
					</Text>
					<Text color={"red.400"}>Stop coding and go make some!!</Text>
				</>
			)}
    </Container>
  )
}

export default Feed
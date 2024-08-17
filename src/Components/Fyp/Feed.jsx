import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import Posts from './Posts'
import { useEffect, useState } from 'react'

function Feed() {
  const [isLoading, setLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 0.5 *1000);
  },[])
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
            <Box h={'500px'}>contents wrapped</Box>
          </Skeleton>
          
           </VStack>
          ))}
      

      {!isLoading && (
        <>
        
        <Posts username='yash' img='/img1.png' avatar='/img1.png'/>
          <Posts username='john doe' img='/img2.png' avatar='/img2.png'/>
          <Posts username='asprogrammer' img='/img3.png' avatar='/img3.png'/>
          <Posts username='harkirat' img='/img4.png' avatar='/img4.png' />
        </>
         )}
    </Container>
  )
}

export default Feed
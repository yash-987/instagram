import { Box, Container, Flex, Image,  VStack } from '@chakra-ui/react'
import AuthForm from '../../Components/Authentication/AuthForm'
import {  } from 'react'
function AuthPage() {
 
  return (
    <Flex minH={'100vh'} justifyContent={'center'} alignItems={'center'} px={4}>
      <Container maxW={'container.md'} padding={0}>
        <Flex justifyContent={'center'} alignItems={'center'} gap={10}>
          {/* Left hand image */}
          <Box display={{base:'none',md:'block'}}>
            <Image src='/auth.png' h={'650'} alt='Phone img' />
          </Box>

          {/* Right hand side */}
          <VStack spacing={4} align={'stretch'}>
            <AuthForm/>
            <Box textAlign={'center'}>
             Get the app.
            
            </Box>
            <Flex justifyContent={'cetner'} gap={5}>
              <Image src='/playstore.png' h={10} alt='Playstore log'/>
              <Image src='/microsoft.png' h={10} alt='Microsoft logo '/>
                  </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  )
}

export default AuthPage
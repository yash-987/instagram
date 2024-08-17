import {  Flex, Image, Text } from "@chakra-ui/react"
import PropTypes from 'prop-types'
import useGoogleAuth from "../../hooks/useSignInWithGoogle"
function GoogleAuth({ prefix }) {
  const { handleGoogleAuth } = useGoogleAuth()
  
    return (
      <>
      
        <Flex
    onClick={handleGoogleAuth}
          alignItems={'center'} cursor={'pointer'}>
    <Image src="/google.png" w={5} alt="Google" />
    <Text color={'blue.500'} mx={2}>
        {prefix} with Google
    </Text>
</Flex>
      </>
  )
}

GoogleAuth.propTypes = {
  prefix: PropTypes.string
}

export default GoogleAuth
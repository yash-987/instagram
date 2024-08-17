import { Avatar, Box, Button, Flex, VStack,Link } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import {Link as RouterLink} from 'react-router-dom'

import useFollowUser from '../../hooks/useFollowUser'
import { useRecoilValue } from 'recoil'
import { AuthStore } from '../../store/authStore'

function SuggestedUser({user,setUser }) {
  
  const { isFollowing, isUpdating, handleFollower } = useFollowUser(user.uid)
  
  
  const authUser = useRecoilValue(AuthStore)

  const onFollowUser = async () => {
    await handleFollower();
  
    setUser({
      ...user,
      followers: isFollowing? user.followers.filter((follower)=>follower.uid !== authUser.uid) : [...user.followers,authUser]
        
        
    })
  }
  
  return (
    

    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Link as={RouterLink} to={user.username}
      textDecoration={'none'}  
      >
      
      <Flex alignItems={'center'} gap={2}>
        <Avatar src={user.profilePicUrl} name={user.username} size={'md'} />
        <VStack spacing={2} alignItems={'flex-start'}>
          <Box fontSize={12} fontWeight={'bold'}>
            {user.username}
         </Box>
          <Box fontSize={11} color={'gray.500'}>
            {user.followers.length} followers
         </Box>
        </VStack>
      </Flex>
      </Link>

      {authUser.uid !== user.uid && <Button
        fontSize={13}
        bg={'transparent'}
        p={0}
        h={'max-content'}
        fontWeight={'medium'}
        cursor={
          'pointer'
        }
        color={'blue.400'}a
        _hover={{ color:'white'}}
        isLoading={isUpdating}
        onClick={onFollowUser}
      >
        {isFollowing? 'Unfollow' : 'Follow'}

      </Button>}
      
      
    </Flex>
  )
}

SuggestedUser.propTypes = {
  user: PropTypes.object,
  setUser:PropTypes.func,

}
export default SuggestedUser


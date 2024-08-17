import { Avatar, Text, Flex,  Button } from "@chakra-ui/react";
import useSignout from "../../hooks/useSignout";
import {Link} from 'react-router-dom'


import { useRecoilValue } from "recoil";
import { AuthStore } from "../../store/authStore";
export default function SuggestedHeader() {
  const { handleLogout } = useSignout()
  const LoggedUser = useRecoilValue(AuthStore)
  
  
  if(!LoggedUser) return null
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`${LoggedUser.username}`}>
          
        <Avatar  size={'lg'} src={LoggedUser.profilePicUrl} />
        </Link>
        <Link to={`${LoggedUser.username}`}>
        
        <Text fontSize={12} fontWeight={'bold'}>
            {LoggedUser.username}
        </Text>
        </Link>
      </Flex>
      <Button
        size={'xs'}
        background={'transparent'}
        _hover={{background:'transparent'}}
        fontSize={14}
        fontWeight={'medium'}
        color={'blue.400'}
        style={{ textDecoration: 'none' }}
        onClick={handleLogout}
        cursor={'pointer'}
      >
        Log out
      
      </Button>
    </Flex>
  )
}

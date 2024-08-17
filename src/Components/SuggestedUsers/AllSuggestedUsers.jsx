import { Flex, VStack,Text, Box, Link } from "@chakra-ui/react"
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from "./SuggestedUser"
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers"
export default function AllSuggestedUsers() {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers()
 console.log(`isloading ${isLoading}`)
 console.log(`suggestedUsers ${suggestedUsers.length}`)
  if (isLoading) return null;
 
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
     {suggestedUsers.length>0 && ( <Flex justify={'space-between'} alignItems={'center'} w={'full'}>
        <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
          Suggested for you
      </Text>
        <Text fontSize={12} fontWeight={'bold'} _hover={{color:'gray.400'}} cursor={'pointer'}>
          See All
      </Text>
      </Flex>)}

      {/* Suggested users */}
      {suggestedUsers.length >0 ? suggestedUsers.map((user) => {
        return <SuggestedUser key={user.id} user={user} />
       
      }) :
       <p>No Users</p>
     
     }
      
      {/* Built by */}
      <Box alignSelf={'start'} fontSize={12} mt={5} color={'gray.500'}>
      © 2023 Built By{" "}
        <Link href="https://github.com/yash-987" target="_blank" color={'blue.500'} fontSize={14}>
        Yash
        </Link>
      </Box>
      

    </VStack>
  )
}

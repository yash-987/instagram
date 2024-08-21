import {  Flex, Text } from "@chakra-ui/react";

import PropTypes from 'prop-types'



export default function Caption({post}) {
   
  return (
    <Flex>
    
            <Text fontSize={14}>{post.caption}</Text>
     
       
 
</Flex>
  )
}


Caption.propTypes = {
    post: PropTypes.object.isRequired
}
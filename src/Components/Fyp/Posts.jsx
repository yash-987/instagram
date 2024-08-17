import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"
import { Box, Image } from '@chakra-ui/react'
import PropTypes from 'prop-types'
function Posts({username,img,avatar}) {
  return (
      <>
          <PostHeader username={username} avatar={avatar} />
          <Box my={2}  overflow={'hidden'}  borderRadius={4} >
              <Image
                  
              
                src={img} alt="User profile pic" />
          </Box>
          <PostFooter pusername={username}/>
      </>
  )
}
Posts.propTypes = {
    username: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
}

export default Posts
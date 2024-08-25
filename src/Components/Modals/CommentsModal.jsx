import {
	Button,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
    
} from '@chakra-ui/react';
import PropTypes from 'prop-types'
import Comment from '../Comments/Comment';
import { useEffect, useRef,  } from 'react';
import { useSetRecoilState } from 'recoil';
import { PostStore } from '../../store/postStore';
import useCreateComment from '../../hooks/useCreateComment';
const CommentsModal = ({ isOpen, onClose,post }) => {
    const { isCommenting, handleComment } = useCreateComment();
    const commentsRef = useRef(null)
    const setPosts = useSetRecoilState(PostStore)
    const commentsContainerRef = useRef(null)
    const addCommentToPostStore = (postId, comment) => {
		setPosts((prevPosts) =>
			prevPosts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						comments: [...post.comments, comment],
					};
				}
				return post;
			})
		);
		
    };
    async function handlePostComment(e) {
		e.preventDefault();
		await handleComment(post.id, commentsRef.current.value);
		addCommentToPostStore(post.id, commentsRef.current.value)
		
		commentsRef.current.value = ''

    }
    
    useEffect(() => {
        function ScrollToBottom() {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }
        setTimeout(() => {
           ScrollToBottom()
       },[1000])
    },[post.comments.length])


	return (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
			<ModalOverlay />
			<ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
				<ModalHeader>Comments</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
                    <Flex
                        ref={commentsContainerRef}
						mb={4}
						gap={4}
						flexDir={'column'}
						maxH={'250px'}
						overflowY={'auto'}
                    >
                        {post.comments?.map((comment,idx) => (
							<Comment key={idx} comment={comment} />
							
                        ))}

                    </Flex>
					<form onSubmit={handlePostComment} style={{ marginTop: '2rem' }}>
						<Input placeholder="Comment" size={'sm'} />
						<Flex w={'full'} justifyContent={'flex-end'} ref={commentsRef}>
							<Button type="submit" ml={'auto'} size={'sm'} my={4}  isLoading={isCommenting}>
								Post
							</Button>
						</Flex>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

CommentsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

export default CommentsModal;

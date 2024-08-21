import { Avatar, Skeleton,SkeletonCircle ,Flex, Text } from '@chakra-ui/react';

import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import { timeAgo } from '../../../utils/timeAgo';
export default function Comment({ comment }) {
	

	const {isLoading,userProfile} = useGetUserProfileById(comment?.createdBy);

	if(isLoading) return <CommentSkeleton/>
	
	return (
		<Flex gap={4}>
			<Link to={`/${userProfile?.username}`}>
			<Avatar src={userProfile?.profilePicUrl}  size={'sm'} />
			</Link>
			<Flex direction={'column'}>
				<Flex gap={2} alignItems={
					'center'
				}>
					<Link to={`/${userProfile?.username}`}>
					<Text fontWeight={'bold'} fontSize={12}>
						{userProfile?.username}
					</Text>
					</Link>
					<Text fontSize={14}>{comment?.comment}</Text>
				</Flex>
				<Text fontSize={12} color={'gray'}>
					{timeAgo(comment?.createdAt)}
				</Text>
			</Flex>
		</Flex>
	);
}
Comment.propTypes = {
	comment:PropTypes.object,
	
    text: PropTypes.string,
};


const CommentSkeleton = () => {
	return (
		<Flex gap={4} w={"full"} alignItems={"center"}>
			<SkeletonCircle h={10} w='10' />
			<Flex gap={1} flexDir={"column"}>
				<Skeleton height={2} width={100} />
				<Skeleton height={2} width={50} />
			</Flex>
		</Flex>
	);
};
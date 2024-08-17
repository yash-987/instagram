// COPY AND PASTE IT AS THE STARTED EDIT PROFILE MODAL
import {
	Avatar,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
} from '@chakra-ui/react';

import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
// import { UpdateProfile } from '../../hooks/useUpdateProfile';
import { useRecoilValue } from 'recoil';


import { AuthStore } from '../../store/authStore';
import usePreviewImg from '../../hooks/usePreviewImg';
import useEditProfile from '../../hooks/useEditProfile';
import useShowToast from '../../hooks/useShowToast';

const EditProfile = ({ isOpen, onClose }) => {
	const user = useRecoilValue(AuthStore);
	const [inputs, setInputs] = useState({
		fullName: user.fullName,
		username: user.username,
		bio:user.bio
	});

	
	

	const fileRef = useRef(null);
	const showToast = useShowToast();
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();

	// const {handleUpdateProfile} = UpdateProfile()
	// optimizing the input fields. if user doesn't want to do any change in any of the field then it's gonna take the previous value of the inputs

	const { isUpdating, EditProfile } = useEditProfile();
	const handleEditProfile = async () => {
		try {
			await EditProfile(inputs, selectedFile);
			setSelectedFile(null);
			onClose();
			
		} catch (error) {
			showToast('Error', error.message, 'error');
		}
	};
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent
					bg={'black'}
					boxShadow={'xl'}
					border={'1px solid gray'}
					mx={3}
				>
					<ModalHeader />
					<ModalCloseButton />
					<ModalBody>
						{/* Container Flex */}
						<Flex bg={'black'}>
							<Stack
								spacing={4}
								w={'full'}
								maxW={'md'}
								bg={'black'}
								p={6}
								my={0}
							>
								<Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
									Edit Profile
								</Heading>
								<FormControl>
									<Stack direction={['column', 'row']} spacing={6}>
										<Center>
											<Avatar
												size="xl"
												src={selectedFile || user.profilePicUrl}
												border={'2px solid white '}
											/>
										</Center>
										<Center w="full">
											<Button w="full" onClick={() => fileRef.current.click()}>
												Edit Profile Picture
											</Button>
										</Center>
										<Input
											type="file"
											hidden
											ref={fileRef}
											onChange={handleImageChange}
										/>
									</Stack>
								</FormControl>

								<FormControl>
									<FormLabel fontSize={'sm'}>Full Name</FormLabel>
									<Input
										placeholder={'Full Name'}
										onBlur={(e) => {
											if (e.target.value === '') {
												setInputs({ ...inputs, fullName: user.fullName });
											}
										}}
										value={
											inputs.fullName
										}
										onChange={(e) =>
											setInputs({ ...inputs, fullName: e.target.value })
										}
										size={'sm'}
										type={'text'}
									/>
								</FormControl>

								<FormControl>
									<FormLabel fontSize={'sm'}>Username</FormLabel>
									<Input
										placeholder={'Username'}
										value={
											inputs.username
										}
										onBlur={(e) => {
											if (e.target.value === '') {
												setInputs({...inputs,username:user.username})
											}
										}}
										onChange={(e) =>
											setInputs({ ...inputs, username: e.target.value })
										}
										size={'sm'}
										type={'text'}
									/>
								</FormControl>

								<FormControl>
									<FormLabel fontSize={'sm'}>Bio</FormLabel>
									<Input
										placeholder={'Bio'}
										value={inputs.bio}
										onBlur={(e) => {
											if (e.target.value === '') setInputs({ ...inputs, bio:user.bio})
										}}
										onChange={(e) =>
											setInputs({ ...inputs, bio: e.target.value })
										}
										size={'sm'}
										type={'text'}
									/>
								</FormControl>

								<Stack spacing={6} direction={['column', 'row']}>
									<Button
										bg={'red.400'}
										color={'white'}
										w="full"
										size="sm"
										_hover={{ bg: 'red.500' }}
									>
										Cancel
									</Button>
									<Button
										bg={'blue.400'}
										color={'white'}
										size="sm"
										w="full"
										_hover={{ bg: 'blue.500' }}
										onClick={handleEditProfile}
										isLoading={isUpdating}
									>
										Submit
									</Button>
								</Stack>
							</Stack>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

EditProfile.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default EditProfile;

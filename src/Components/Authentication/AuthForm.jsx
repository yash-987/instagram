import { useState } from 'react';
import {
	Box,
	
	Flex,
	Image,
	
	Text,
	VStack,
} from '@chakra-ui/react';
import Login from './Login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth';

function AuthForm() {
	const [isLogin, setIsLogin] = useState(true);

	
	return (
		<>
			<Box border={'1px solid gray'} borderRadius={4} padding={5}>
				<VStack spacing={4}>
					<Image src="/logo.png" h={24} cursor={'pointer'} alt="Instagram" />
				
                  {isLogin? <Login/>: <Signup/>}
					

					{/* --------OR-------- */}
					<Flex
						w={'full'}
						justifyContent={'center'}
						alignItems={'center'}
						gap={2}
						my={4}
					>
						<Box bg={'gray.400'} flex={2} h={'1px'} />
						<Text>OR</Text>
						<Box bg={'gray.400'} flex={2} h={'1px'} />
					</Flex>

					{/* Google Authentication */}
				<GoogleAuth prefix={isLogin? 'Login':'Sign Up'} />
				</VStack>
			</Box>

			{/* DOn't have an account */}
			<Box border={'1px solid gray'} padding={5} borderRadius={4}>
				<Flex alignItems={'center'}>
					<Box mx={2} fontSize={14}>
						{isLogin ? `Don't have an Account?` : 'Alrady have an Account?'}
					</Box>
					<Box
						color={'blue.500'}
						cursor={'pointer'}
						onClick={() => setIsLogin(!isLogin)}
					>
						{isLogin ? 'Sign Up' : 'Log in'}
					</Box>
				</Flex>
			</Box>
		</>
	);
}

export default AuthForm;

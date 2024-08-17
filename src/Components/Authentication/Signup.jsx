import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Alert,
	AlertIcon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useSignupWithEmailAndPassword from '../../hooks/useSignupWithEmailAndPassword';
function Signup() {
	const [inputs, setInputs] = useState({
		username: '',
		fullName: '',
		email: '',
		password: '',
	});

	const [showPass, setShowPass] = useState(false);
	const { signup, loading, error }  = useSignupWithEmailAndPassword();
	return (
		<>
			<Input
				size={'sm'}
				placeholder="Email"
				fontSize={14}
				type="email"
				value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
			/>

			<Input
				size={'sm'}
				placeholder="Username"
				fontSize={14}
				type="email"
				value={inputs.username}
				onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
			/>
			<Input
				size={'sm'}
				placeholder="Full Name"
				fontSize={14}
				type="email"
				value={inputs.fullName}
				onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
			/>
			<InputGroup>
				<Input
					size={'sm'}
					value={inputs.password}
					onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
					placeholder="Password"
					fontSize={14}
					type={showPass ? 'text' : 'password'}
				/>
				<InputRightElement h={'full'}>
					<Button
						variant={'ghost'}
						size={'sm'}
						onClick={() => setShowPass(!showPass)}
					>
						{showPass ? <ViewIcon /> : <ViewOffIcon />}
					</Button>
				</InputRightElement>
			</InputGroup>

			{error && (
				<Alert status="error" fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					{error.message}
				</Alert>
			)}

			<Button
				w={'full'}
				isLoading={loading}
				size={'sm'}
				fontSize={14}
                colorScheme='blue'
				onClick={() => signup(inputs)}
			>
				Sign up
			</Button>
		</>
	);
}

export default Signup;

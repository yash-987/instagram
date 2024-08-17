import { Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import useSignIn from '../../hooks/useSignIn';
export default function Login() {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const { handleLogin,loading}=useSignIn()
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
				value={inputs.password}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
				placeholder="Password"
				fontSize={14}
				type="password"
			/>
			<Button
				onClick={()=>handleLogin(inputs)}
				isLoading={loading}
				w={'full'} colorScheme="blue" size={'sm'} fontSize={14}>
				Log in
			</Button>
		</>
	);
}

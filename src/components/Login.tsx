import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { LOGIN_MUTATION } from '../GraphQL/Mutations';
import { useMutation } from '@apollo/client';
import { useAuthToken } from '../customHooks/authHook';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const [inputValues, setInputValues] = useState({ email: '', password: '' });
	const [loginUser] = useMutation(LOGIN_MUTATION);
	const [_, setAuthToken] = useAuthToken();
	const navigate = useNavigate();

	const handleFormChange = (e: any) => {
		const v: 'email' | 'password' = e.target.id;
		setInputValues({
			...inputValues,
			[v as 'email' | 'password']: e.target.value as string,
		});
	};
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const response = await loginUser({ variables: inputValues }).catch(
			(err) => {
				console.log('handle login error', err);
			}
		);
		setAuthToken(response?.data.loginUser.token);
		navigate('/');
	};

	return (
		<Box
			component='form'
			onChange={(e) => handleFormChange(e)}
			onSubmit={handleSubmit}>
			<Box
				display={'flex'}
				sx={{
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Typography component='h1' variant='h4'>
					Login
				</Typography>
				<TextField
					required
					id='email'
					label='Email'
					variant='standard'
					value={inputValues.email}
					sx={{}}
				/>
				<TextField
					required
					id='password'
					label='Password'
					variant='standard'
					type='password'
					value={inputValues.password}
					sx={{}}
				/>
				<Button
					variant='contained'
					sx={{
						marginTop: '20px',
					}}
					type='submit'>
					Login
				</Button>
			</Box>
		</Box>
	);
}

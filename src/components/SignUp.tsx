import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { CREATE_USER } from '../GraphQL/Mutations';
import { useAuthToken } from '../customHooks/authHook';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface iState {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	avatar: File | FormData | string | null;
}
export default function SignUp() {
	const [inputValues, setInputValues] = useState<iState>({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		avatar: null,
	});
	const navigate = useNavigate();

	const [addUser, { error }] = useMutation(CREATE_USER);
	const [_, setAuthToken] = useAuthToken();

	useEffect(() => {
		if (error) alert(`Error from sign up ${error}`);
	}, [error]);

	const handleFormChange = (e: any) => {
		type iInput = 'email' | 'password' | 'firstName' | 'lastName' | 'avatar';
		const v: iInput = e.target.id;
		if (v === 'avatar') {
			console.log('e.target.files[0]', e.target.files[0]);
			setInputValues({
				...inputValues,
				avatar: e.target.files[0],
			});
			return;
		}
		setInputValues({
			...inputValues,
			[v as iInput]: e.target.value as string,
		});
	};
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const response = await addUser({ variables: inputValues }).catch((err) => {
			console.log('handleSignUp error', err);
		});
		setAuthToken(response?.data.addUser.token);
		navigate('/');
	};
	const textFieldStyle = {
		'& .MuiInput-root': {
			'& fieldset': {
				borderColor: 'var(--outline)',
				borderStyle: 'dashed',
				borderWidth: '1px',
			},
			'&.Mui-focused fieldset': {
				borderColor: '#0969da',
			},

			color: 'var(--text-color)',
		},
		'& .MuiFormLabel-root': {
			color: 'var(--text-color)',
		},
		backgroundColor: 'var(--input-background)',
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
					Create an account.
				</Typography>
				<TextField
					required
					id='firstName'
					label='First Name'
					variant='standard'
					value={inputValues.firstName}
					sx={textFieldStyle}
				/>
				<TextField
					required
					id='lastName'
					label='Last Name'
					variant='standard'
					value={inputValues.lastName}
					sx={textFieldStyle}
				/>

				<TextField
					required
					id='email'
					label='Email'
					variant='standard'
					value={inputValues.email}
					sx={textFieldStyle}
				/>
				<TextField
					required
					id='password'
					label='Password'
					variant='standard'
					type='password'
					value={inputValues.password}
					sx={textFieldStyle}
				/>
				<Button variant='contained' component='label'>
					Upload File
					<input type='file' id='avatar' hidden />
				</Button>
				<Button
					variant='contained'
					sx={{
						marginTop: '20px',
					}}
					type='submit'>
					Sign Up
				</Button>
			</Box>
		</Box>
	);
}

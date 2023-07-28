import './App.css';
import { Routes, Route } from 'react-router-dom';
import PortalLandingPage from './components/PortalLandingPage';
import Post from './components/Post';
import { useThemeContext } from './customHooks/themeContext';
import { useEffect, useMemo, useState } from 'react';
import { createUploadLink } from 'apollo-upload-client';
import {
	AppBar,
	Box,
	Button,
	Drawer,
	IconButton,
	Switch,
	Toolbar,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import Login from './components/Login';
import { useAuthToken } from './customHooks/authHook';
import SignUp from './components/SignUp';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
	width: 62,
	height: 34,
	padding: 7,
	'& .MuiSwitch-switchBase': {
		margin: 1,
		padding: 0,
		transform: 'translateX(6px)',
		'&.Mui-checked': {
			color: '#fff',
			transform: 'translateX(22px)',
			'& .MuiSwitch-thumb:before': {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					'#fff'
				)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
			},
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
			},
		},
	},
	'& .MuiSwitch-thumb': {
		backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
		width: 32,
		height: 32,
		'&:before': {
			content: "''",
			position: 'absolute',
			width: '100%',
			height: '100%',
			left: 0,
			top: 0,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
				'#fff'
			)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
		},
	},
	'& .MuiSwitch-track': {
		opacity: 1,
		backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
		borderRadius: 20 / 2,
	},
}));

//Apollo Client Setup

const errorLink = onError(({ graphQLErrors, networkError }) => {});
const getLink = (authToken: string) =>
	from([
		errorLink,
		createUploadLink({
			uri: 'http://localhost:8080/graphql',
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		}),
	]);

const useApolloClient = () => {
	const [authToken] = useAuthToken();
	console.log('testing testing')
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: getLink(authToken),
	});
};

function App() {
	const client = useApolloClient();
	const { darkTheme, toggleTheme } = useThemeContext();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const white = '#ffffff';
	const dark = '#0d1117';
	const themedStyle = useMemo(
		() => ({
			'--background-color': darkTheme ? dark : white,
			'--text-color': darkTheme ? '#c9d1d9' : dark,
			'--outline': darkTheme ? '#30363d' : '#d0d7de',
			'--input-background': darkTheme ? '#010409' : '#f6f8fa',
		}),
		[darkTheme]
	);

	useEffect(() => {
		Object.entries(themedStyle).forEach(([key, value]) => {
			document.documentElement.style.setProperty(key, value);
		});
	}, [themedStyle]);

	const DrawerMenu = () => {
		return (
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					width: '300px',
				}}>
				<Button
					variant='outlined'
					href='/'
					sx={{
						marginTop: '20px',
					}}>
					Portal
				</Button>
				<Button
					variant='outlined'
					href='/login'
					sx={{
						marginTop: '20px',
					}}>
					Login
				</Button>
				<Button
					variant='outlined'
					href='/signUp'
					sx={{
						marginTop: '20px',
					}}>
					Sign Up
				</Button>
			</Box>
		);
	};

	return (
		<ApolloProvider client={client}>
			<div className='App'>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position='static'>
						<Toolbar>
							<IconButton
								size='large'
								edge='start'
								color='inherit'
								aria-label='open drawer'
								sx={{ mr: 2 }}
								onClick={() => setDrawerOpen(true)}>
								<MenuIcon />
							</IconButton>
							<Drawer
								anchor={'left'}
								open={drawerOpen}
								onClose={() => {
									setDrawerOpen(false);
								}}>
								{<DrawerMenu />}
							</Drawer>
							<Typography
								variant='h6'
								noWrap
								component='div'
								sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
								Portal
							</Typography>
							<MaterialUISwitch
								checked={darkTheme}
								onChange={toggleTheme}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						</Toolbar>
					</AppBar>
				</Box>
				<Routes>
					<Route path='/' element={<PortalLandingPage />} />
					<Route path='/details/:id' element={<Post />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signUp' element={<SignUp />} />
				</Routes>
			</div>
		</ApolloProvider>
	);
}

export default App;

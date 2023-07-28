import { Alert, TextField } from '@mui/material';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import { useEffect, useState, useRef } from 'react';
import { IPost } from '../Types/PostTypes';
import PostList from './PostList';
import { ADD_POST_MUTATION } from '../GraphQL/Mutations';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { LOAD_POSTS } from '../GraphQL/Queries';
import ReactDOM from 'react-dom/client';

export default function PortalLandingPage() {
	const [post, setPost] = useState('');
	const alertElementRef = useRef<HTMLDivElement>(null);
	const [posts, setPosts] = useState<IPost[]>([]);
	const [addPost] = useMutation(ADD_POST_MUTATION);
	const loadedPosts = useQuery(LOAD_POSTS);

	useEffect(() => {
		if (!loadedPosts.loading) {
			setPosts(loadedPosts.data?.posts);
		}
	}, [loadedPosts]);
	const handleError = (error: ApolloError) => {
		const alertContainer = document.createElement('div');
		const id = `${(alertElementRef.current?.children?.length as number) + 1}`;
		alertContainer.id = id;
		const alertComponent = (
			<Alert
				severity='error'
				onClose={() => {
					document.getElementById(id)?.remove();
				}}>
				{error.message}
			</Alert>
		);
		// @ts-ignore
		ReactDOM.createRoot(alertContainer).render(alertComponent);
		alertElementRef.current?.appendChild(alertContainer);
	};

	const updateLoadedPosts = () => {
		loadedPosts.refetch();
	};

	const handlePostInput = (event: any) => {
		event.preventDefault();
		setPost(event.target.value);
	};

	const handlePost = async (event: any) => {
		event.preventDefault();
		await addPost({ variables: { post } }).catch(handleError);
		setPost('');
		updateLoadedPosts();
	};
	return (
		<div>
			<form onSubmit={handlePost} style={{ marginBottom: '20px' }}>
				<div ref={alertElementRef}></div>

				<Container
					sx={{
						display: 'flex',
						flexDirection: 'column',
						margin: '0px auto',
						marginTop: '100px',
						padding: '20px',
						width: '800px',
						borderColor: 'var(--outline)',
						borderStyle: 'dashed',
						borderWidth: '1px',
					}}>
					<TextField
						sx={{
							'& .MuiOutlinedInput-root': {
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
							display: 'flex',
							margin: '0px auto',
							marginTop: '20px',
							width: '700px',
							backgroundColor: 'var(--input-background)',
						}}
						className='post-input'
						id='outlined-multiline-flexible'
						type='text'
						multiline
						value={post}
						placeholder='Your post goes here'
						onChange={handlePostInput}
					/>
					<div className='buttons-container'>
						<Button variant='outlined' onClick={() => setPost('')}>
							Clear
						</Button>
						<Button type='submit' variant='contained' onClick={handlePost}>
							Post
						</Button>
					</div>
				</Container>
			</form>
			<PostList posts={posts} />
		</div>
	);
}

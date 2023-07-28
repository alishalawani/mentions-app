import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IPost } from '../Types/PostTypes';

function PostList({ posts }: IProps) {

	const PostItem = ({ post, index }: { post: IPost; index: number }) => (
		<>
			<ListItem
				alignItems='flex-start'
				sx={{
					backgroundColor: 'var(--input-background)',
				}}>
				<ListItemAvatar>
					<Avatar
						alt={`${post.user?.firstName || 'FName'} - ${
							post.user?.lastName || 'LName'
						}`}
						src={
							post.user?.avatar
								? `http://localhost:8080/${post.user?.avatar}`
								: '/static/images/avatar/1.jpg'
						}
					/>
				</ListItemAvatar>
				<ListItemText
					primary='Alisha'
					secondary={
						<Typography
							sx={{
								display: 'inline',
								'& .MuiOutlinedInput-root': {
									color: 'var(--text-input)',
								},
							}}
							component='span'
							variant='body2'>
							{post.post}
						</Typography>
					}
				/>
			</ListItem>
			{posts.length - 1 !== index && (
				<Divider component='li' sx={{ bgcolor: 'var(--outline)' }} />
			)}
		</>
	);

	const ListItems = () => (
		<>
			{posts?.map((post, i) => (
				<PostItem post={post} index={i} key={post.id} />
			))}
		</>
	);

	return (
		<List
			sx={{
				width: '700px',
				margin: '0 auto',
			}}>
			<ListItems />
		</List>
	);
}

interface IProps {
	posts: IPost[];
}

export default PostList;

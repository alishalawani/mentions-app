import { gql } from '@apollo/client';

export const LOAD_USERS = gql`
	{
		users {
			email
			id
			firstName
			lastName
			avatar
		}
	}
`;

export const LOAD_POSTS = gql`
	{
		posts {
			id
			post
			user { 
				firstName
				lastName
				email
				avatar
				id
			}
			created
		}
	}
`;

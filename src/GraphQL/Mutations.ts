import { gql } from '@apollo/client';

export const CREATE_USER = gql`
	mutation addUser(
			$firstName: String!
			$lastName:  String!
			$email:  String!
			$avatar: Upload
			$password:  String!
		) {
			addUser(
                firstName: $firstName
                lastName:  $lastName
                email: $email
                avatar: $avatar
                password: $password
		    ) {
                firstName
                lastName
                email
				token
				avatar
		    }
		}
`;

export const LOGIN_MUTATION = gql`
	mutation loginUser(
		$email: String!
		$password: String!
	) {
		loginUser(
			email: $email
			password: $password
		) {
            id
			firstName
			lastName
			email
            token
		}
	}
`;

export const ADD_POST_MUTATION = gql`
	mutation addPost($post: String!) {
		addPost(post: $post) {
			post
		}
	}
`;

export const UPDATE_POST_MUTATION = gql`
	mutation updatePost($userId: String!, $post: String!) {
		addPost(userId: $userId, post: $post) {
			id
			post
		}
	}
`;

export const DELETE_POST_MUTATION = gql`
	mutation deletePost($id: String!) {
		addPost(id: $id) {
			id
		}
	}
`;

import axios from 'axios';
import { Dispatch, AnyAction } from 'redux';

interface User {
	username?: string;
	firstname?: string;
	lastname?: string;
	email: string
}

interface CreateUser extends User {
	password: string;
}

interface HttpError {
	message: string;
	status: number;
}

export function typedAction<T extends string>(type: T): { type: T };

export function typedAction<T extends string, P extends any>(
	type: T,
	payload: P
): { type: T; payload: P };

export function typedAction(type: string, payload?: any) {
	return { type, payload };
}

type UserState = {
	username: string | null;
	user: User;
	error?: HttpError | null;
};



const initialState: UserState = {
	username: null,
	user: {
		username: "",
		email: "",
		firstname: "",
		lastname: "",
	},
	error: null
};

export const loginSuccess = (user:User) => {
	return typedAction('user/LOGIN_SUCCESS', user);
};

export const loginFailure = (error:HttpError) => {
	return typedAction('user/LOGIN_FAILURE', error);
};

export const registerSuccess = (user:User) => {
	return typedAction('user/REGISTER_SUCCESS', user);
};

export const registerFailure = (error:HttpError) => {
	return typedAction('user/REGISTER_FAILURE', error)
};

export const login = (username: string) => {
	// return typedAction('user/LOGIN', username);
	return (dispatch: Dispatch<AnyAction>) => {
		axios.post<User>('https://localhost:3000/api/v1/auth/login/',{
			"username": username,
			"password": "1123"
		}
		// 	{withCredentials: true
		//
		// }
		).then((u) => {
			console.log(u)
			dispatch(
				loginSuccess(u.data)
			)
		}).catch((err) => {
			dispatch(
				loginFailure(err.response.data)
			)
		});
	}
};

export const registerNewUser = (user:CreateUser) => {

	return (dispatch: Dispatch<AnyAction>) => {
		axios.post<any>('https://localhost:3000/api/v1/auth/register', user)
			.then((response) => {
				dispatch(
					registerSuccess(response.data)
				)
		}).catch((err) => {
			dispatch(
				registerFailure(err.response.data)
			)
		})
	}
}


export const logout = () => {
	return typedAction('user/LOGOUT');
};


type UserAction = ReturnType<typeof loginSuccess | typeof loginFailure | typeof registerSuccess | typeof registerFailure | typeof logout>;
export function userReducer(
	state = initialState,
	action: UserAction
): UserState {
	switch (action.type) {
		case 'user/LOGIN_SUCCESS':
			return { ...state, user: action.payload, error: null };
		case 'user/LOGIN_FAILURE':
			return { ...state, error: action.payload};
		case 'user/REGISTER_SUCCESS':
			return { ...state, user: action.payload, error: null };
		case 'user/REGISTER_FAILURE':
			return { ...state, error: action.payload};
		case 'user/LOGOUT':
			return { ...state, username: null };
		default:
			return state;
	}
}

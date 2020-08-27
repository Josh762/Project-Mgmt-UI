import axios from 'axios';
import { Dispatch, AnyAction } from 'redux';

interface Board {

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



type BoardsState = {

}

const initialState: BoardsState = {

};

// export const loginSuccess = (user:User) => {
//   return typedAction('user/LOGIN_SUCCESS', user);
// };
//
// export const loginFailure = (error:HttpError) => {
//   return typedAction('user/LOGIN_FAILURE', error);
// };
//
// export const registerSuccess = (user:User) => {
//   return typedAction('user/REGISTER_SUCCESS', user);
// };
//
// export const registerFailure = (error:HttpError) => {
//   return typedAction('user/REGISTER_FAILURE', error)
// };

export const fetchBoardStubs = () => {
  // return typedAction('user/LOGIN', username);
  return (dispatch: Dispatch<AnyAction>) => {
    axios.get<Board>('https://localhost:3000/api/v1/workflows')
      .then((u) => {
      console.log(u)
      dispatch(
        fetchStubsSuccess() // todo send data
      )
    }).catch((err) => {
      dispatch(
        fetchStubsFailure(err.response.data)
      )
    });
  }
};

export const createWorkflow = () => {
  // return typedAction('user/LOGIN', username);
  return (dispatch: Dispatch<AnyAction>) => {
    axios.post<Board>('https://localhost:3000/api/v1/workflows', {
      "type": 'board'
    },{withCredentials: true})
      .then((u) => {
        console.log(u)
        dispatch(
          fetchStubsSuccess() // todo send data
        )
      }).catch((err) => {
      dispatch(
        fetchStubsFailure(err.response.data)
      )
    });
  }
};

export const fetchStubsSuccess = () => {
  return typedAction('boards/FETCH_STUBS_SUCCESS')
}

export const fetchStubsFailure = (error:HttpError) => {
  return typedAction('boards/FETCH_STUBS_FAILURE', error)
}
// export const registerNewUser = (user:CreateUser) => {
//
//   return (dispatch: Dispatch<AnyAction>) => {
//     axios.post<any>('http://localhost:3000/api/v1/auth/register', user)
//       .then((response) => {
//         dispatch(
//           registerSuccess(response.data)
//         )
//       }).catch((err) => {
//       dispatch(
//         registerFailure(err.response.data)
//       )
//     })
//   }
// }




export const logout = () => {
  return typedAction('user/LOGOUT');
};


type UserAction = ReturnType<typeof fetchStubsSuccess | typeof fetchStubsFailure>;
export function userReducer(
  state = initialState,
  action: UserAction
): BoardsState {
  switch (action.type) {
    case 'boards/FETCH_STUBS_SUCCESS':
      return { ...state, error: null };
    case 'boards/FETCH_STUBS_FAILURE':
      return { ...state, error: action.payload};
    default:
      return state;
  }
}

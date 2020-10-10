import axios from 'axios';
import { Dispatch, AnyAction } from 'redux';
import Any = jasmine.Any;


// todo all interfaces needs to go in their own file/folder
interface BoardDetails {
  _id: string;
  title: string;
  workflow: Workflow;
}

interface Workflow {
  userID: string;
  type: string;
  nodes: Task[];
}

interface Task {
  title: string;
  description: string;
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



export const fetchBoardDetails = (boardId:string) => {
  return (dispatch: Dispatch<AnyAction>) => {
    axios.get<BoardDetails>(`http://localhost:3001/api/v1/boards/${boardId}`)
        .then((resp) => {
          dispatch(
              fetchBoardStubsSuccess()
          );
          console.log(resp.data);
        }).catch((err) => {
          dispatch(
              fetchBoardStubsFailure(err.response.data)
          );
    })
  }
}

export const fetchBoardStubs = () => {
  // return typedAction('user/LOGIN', username);
  return (dispatch: Dispatch<AnyAction>) => {
    axios.get<BoardDetails>('http://localhost:3000/api/v1/boards')
      .then((u) => {
      console.log(u)
      dispatch(
          fetchBoardDetailsSuccess() // todo send data
      )
    }).catch((err) => {
      dispatch(
          fetchBoardDetailsFailure(err.response.data)
      )
    });
  }
};

export const createWorkflow = () => {
  // return typedAction('user/LOGIN', username);
  return (dispatch: Dispatch<AnyAction>) => {
    axios.post<BoardDetails>('http://localhost:3000/api/v1/workflows', {
      "type": 'board'
    },{})
      .then((u) => {
        console.log(u)
        dispatch(
            fetchBoardStubsSuccess() // todo send data
        )
      }).catch((err) => {
      dispatch(
          fetchBoardStubsFailure(err.response.data)
      )
    });
  }
};


const fetchDetailsSuccess = 'boards/FETCH_BOARD_DETAILS_SUCCESS';
const fetchDetailsFailure = 'boards/FETCH_BOARD_DETAILS_FAILURE';

const fetchStubsSuccess = 'boards/FETCH_BOARD_STUBS_SUCCESS';
const fetchStubsFailure = 'boards/FETCH_STUBS_FAILURE';

export const fetchBoardDetailsSuccess = () => {
  return typedAction(fetchDetailsSuccess)
}

export const fetchBoardDetailsFailure = (error:HttpError) => {
  return typedAction(fetchDetailsFailure, error);
}

export const fetchBoardStubsSuccess = () => {
  return typedAction(fetchStubsSuccess);
}

export const fetchBoardStubsFailure = (error:HttpError) => {
  return typedAction(fetchStubsFailure, error)
}

type UserAction = ReturnType<typeof fetchBoardDetailsSuccess | typeof fetchBoardDetailsFailure | typeof fetchBoardStubsSuccess | typeof fetchBoardStubsFailure>;
export function userReducer(
  state = initialState,
  action: UserAction
): BoardsState {
  switch (action.type) {
    case fetchDetailsSuccess:
      return { ...state, error: null };
    case fetchDetailsFailure:
      return { ...state, error: action.payload };
    case fetchStubsSuccess:
      return { ...state, error: null };
    case fetchStubsFailure:
      return { ...state, error: action.payload};
    default:
      return state;
  }
}


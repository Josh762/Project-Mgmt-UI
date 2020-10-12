import axios from 'axios';
import { Dispatch, AnyAction } from 'redux';
import { HttpError } from "../types/http-error.interface";
import { typedAction } from "../types/typed-action.interface";
import { BoardDetails, BoardStub } from "../types/boards.interface";





type BoardsState = {
  board: BoardDetails;
  boardStubs: BoardStub[];
  error: HttpError;
}

const initialState: BoardsState = {
  board: {
    _id: '',
    title: '',
    description: '',
    workflow: {
      userID: '',
      type: '',
      nodes: []
    }
  },
  boardStubs: [],
  error: {
    message: '',
    status: 0
  }
};



export const fetchBoardDetails = (boardId:string) => {
  return (dispatch: Dispatch<AnyAction>) => {
    axios.get<BoardDetails>(`http://localhost:3001/api/v1/boards/${boardId}`)
        .then((resp) => {
          dispatch(
              fetchBoardDetailsSuccess(resp.data)
          );
          console.log(resp.data);
        }).catch((err) => {
          dispatch(
              fetchBoardDetailsFailure(err.response.data)
          );
    })
  }
}

export const fetchBoardStubs = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    axios.get<BoardStub[]>('http://localhost:3000/api/v1/boards')
      .then((resp) => {
      dispatch(
          fetchBoardStubsSuccess(resp.data) // todo send data
      )
    }).catch((err) => {
      dispatch(
          fetchBoardStubsFailure(err.response.data)
      )
    });
  }
};

export const createBoard = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    axios.post<BoardStub>('http://localhost:3000/api/v1/workflows', {
      "type": 'board'
    },{})
      .then((resp) => {
        dispatch(
            createBoardSuccess(resp.data) // todo send data
        )
      }).catch((err) => {
      dispatch(
          createBoardFailure(err.response.data)
      )
    });
  }
};


const fetchDetailsSuccessType = 'boards/FETCH_BOARD_DETAILS_SUCCESS';
const fetchDetailsFailureType = 'boards/FETCH_BOARD_DETAILS_FAILURE';

const fetchStubsSuccessType = 'boards/FETCH_BOARD_STUBS_SUCCESS';
const fetchStubsFailureType = 'boards/FETCH_STUBS_FAILURE';

const createBoardSuccessType = 'boards/CREATE_BOARD_SUCCESS';
const createBoardFailureType = 'boards/CREATE_BOARD_FAILURE';

export const fetchBoardDetailsSuccess = (board: BoardDetails) => {
  return typedAction(fetchDetailsSuccessType, board);
}

export const fetchBoardDetailsFailure = (error:HttpError) => {
  return typedAction(fetchDetailsFailureType, error);
}

export const fetchBoardStubsSuccess = (boardStubs: BoardStub[]) => {
  return typedAction(fetchStubsSuccessType, boardStubs);
}

export const fetchBoardStubsFailure = (error:HttpError) => {
  return typedAction(fetchStubsFailureType, error)
}

export const createBoardSuccess = (boardStub: BoardStub) => {
  return typedAction(createBoardSuccessType, boardStub);
}

export const createBoardFailure = (error:HttpError) => {
  return typedAction(createBoardFailureType, error);
}

type UserAction = ReturnType<
    typeof fetchBoardDetailsSuccess |
    typeof fetchBoardDetailsFailure |
    typeof fetchBoardStubsSuccess   |
    typeof fetchBoardStubsFailure   |
    typeof createBoardSuccess       |
    typeof createBoardFailure>;
export function userReducer(
  state = initialState,
  action: UserAction
): BoardsState {
  switch (action.type) {
    case fetchDetailsSuccessType:
      return {
        ...state,
        board: action.payload
      };
    case fetchDetailsFailureType:
      return {
        ...state,
        error: action.payload
      };
    case fetchStubsSuccessType:
      return {
        ...state,
        boardStubs: action.payload
      };
    case fetchStubsFailureType:
      return {
        ...state,
        error: action.payload
      };
    case createBoardSuccessType:
      return {
        ...state,
        boardStubs: [
            ...state.boardStubs
        ]
      };
    case createBoardFailureType:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}


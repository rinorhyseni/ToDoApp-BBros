import { Todo } from "../../models";
import { User } from "../../models/user.model";

/**
 * Notes: Consider use the enum with type is string to debug
 */
export enum TodoActionTypes {
  FetchTodosRequest,
  FetchTodosSuccess,
  FetchTodosFailed,
  AddTodoRequest,
  AddTodoSuccess,
  AddTodoFailed,
  DeleteTodoRequest,
  DeleteTodoSuccess,
  DeleteTodoFailed,
  UpdateTodoRequest,
  UpdateTodoSuccess,
  UpdateTodoFailed,
}

export interface Error {
  error: string;
}

export interface FetchTodosRequestPayload {
  type: TodoActionTypes.FetchTodosRequest;
}

export interface FetchTodosSuccessPayload {
  type: TodoActionTypes.FetchTodosSuccess;
  payload: Todo[];
}

export interface FetchTodosFailedPayload {
  type: TodoActionTypes.FetchTodosFailed;
  payload: Error;
}

export interface AddTodoRequestPayload {
  type: TodoActionTypes.AddTodoRequest;
}

export interface AddTodoSuccessPayload {
  type: TodoActionTypes.AddTodoSuccess;
  payload: Todo;
}

export interface AddTodoFailedPayload {
  type: TodoActionTypes.AddTodoFailed;
  payload: Error;
}

export interface DeleteTodoRequestPayload {
  type: TodoActionTypes.DeleteTodoRequest;
}

export interface DeleteTodoSuccessPayload {
  type: TodoActionTypes.DeleteTodoSuccess;
  payload: number;
}

export interface DeleteTodoFailedPayload {
  type: TodoActionTypes.DeleteTodoFailed;
  payload: Error;
}

export interface UpdateTodoRequestPayload {
  type: TodoActionTypes.UpdateTodoRequest;
}

export interface UpdateTodoSuccessPayload {
  type: TodoActionTypes.UpdateTodoSuccess;
  payload: Todo;
}

export interface UpdateTodoFailedPayload {
  type: TodoActionTypes.UpdateTodoFailed;
  payload: Error;
}

export type TodoAction =
  | FetchTodosRequestPayload
  | FetchTodosSuccessPayload
  | FetchTodosFailedPayload
  | AddTodoRequestPayload
  | AddTodoSuccessPayload
  | AddTodoFailedPayload
  | DeleteTodoRequestPayload
  | DeleteTodoSuccessPayload
  | DeleteTodoFailedPayload
  | UpdateTodoRequestPayload
  | UpdateTodoSuccessPayload
  | UpdateTodoFailedPayload;


  export type UserAction =
  | FetchUsersRequestPayload
  | FetchUsersSuccessPayload
  | FetchUsersFailedPayload;


  export interface FetchUsersRequestPayload {
    type: UserActionTypes.FetchUsersRequest;
  }
  
  export interface FetchUsersSuccessPayload {
    type: UserActionTypes.FetchUsersSuccess;
    payloadUser: User[];
  }
  
  export interface FetchUsersFailedPayload {
    type: UserActionTypes.FetchUsersFailed;
    payloadUser: Error;
  }

  export enum UserActionTypes {
    FetchUsersRequest,
    FetchUsersSuccess,
    FetchUsersFailed,
  }
import { Todo } from "../../models";
import { User } from "../../models/user.model";
import { TodoActionTypes, TodoAction, UserAction, UserActionTypes } from "./types";

export type TodoState = {
  loading: boolean;
  count: number;
  list: Todo[];
};

const TODO_DEFAULT_STATE: TodoState = {
  loading: false,
  count: 0,
  list: [],
};

export const todoReducers = (
  state: TodoState = TODO_DEFAULT_STATE,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.FetchTodosRequest:
    case TodoActionTypes.AddTodoRequest:
    case TodoActionTypes.DeleteTodoRequest:
      return {
        ...state,
        loading: true,
      };
    case TodoActionTypes.FetchTodosSuccess:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case TodoActionTypes.AddTodoSuccess:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };
    case TodoActionTypes.DeleteTodoSuccess:
      return {
        ...state,
        list: state.list.filter((todo: Todo) => todo.id !== action.payload),
        loading: false,
      };
    case TodoActionTypes.UpdateTodoSuccess:
      return {
        ...state,
        list: state.list.map((todo: Todo) => {
          if (todo.id === action.payload.id) {
            todo = action.payload;
          }
          return todo;
        }),
      };
    default:
      return state;
  }
};

export type UserState = {
  loadingUsers: boolean;
  count: number;
  listUser: User[];
};

const USER_DEFAULT_STATE: UserState = {
  loadingUsers: false,
  count: 0,
  listUser: [],
};

export const userReducers = (
  userState: UserState = USER_DEFAULT_STATE,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.FetchUsersRequest:
      return {
        ...userState,
        loadingUsers: true,
      };
    case UserActionTypes.FetchUsersSuccess:
      return {
        ...userState,
        listUser: action.payloadUser,
        loadingUsers: false,
      };
    default:
      return userState;
  }
};
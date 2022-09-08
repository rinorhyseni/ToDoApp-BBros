import { combineReducers } from "redux";
import { todoReducers, TodoState, userReducers, UserState } from "./todo";

export interface RootState {
  todos: TodoState,
  users: UserState
}

export const rootReducer = combineReducers<RootState>({
  todos: todoReducers,
  users: userReducers
});
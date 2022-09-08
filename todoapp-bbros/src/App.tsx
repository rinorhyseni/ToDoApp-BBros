import React, { FC } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./store";
import "./App.css";
import { TodoList } from "./pages/todos";
import thunk from "redux-thunk";

// Enable redux-devtools-extension
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const initialState = {};

const middleware = [thunk];

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

const App: FC = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default App;
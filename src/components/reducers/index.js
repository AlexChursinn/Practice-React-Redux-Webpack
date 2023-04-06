/* Объединяет все reducers которые есть в приложении */
import { combineReducers } from "redux";
/* createStore позволяет создать Store а второй поключить redux-thunk  */
import { createStore, applyMiddleware } from "redux";
import reposReducer from "./reposReducer";
/* Отвечает за redux-devtools */
import { composeWithDevTools } from "redux-devtools-extension";
/* redux thunk решает задачи с асинхронностью */
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  repos: reposReducer,
});

/* Создаем сам store */
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

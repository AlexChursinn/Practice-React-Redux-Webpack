/* У каждого action есть type и хорошая практика выносить всё это в отдельную переменную */
/* Загрузка данных с GitHub */
const SET_REPOS = "SET_REPOS";
/* Loader */
const SET_IS_FETCHING = "SET_IS_FETCHING";
/* Текущая страница */
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
/* Есть ошибка или нет */
const SET_FETCH_ERROR = "SET_FETCH_ERROR";

const defaultState = {
  /* items полученные данные с github */
  items: [],
  /* isFetching когда получим данные */
  isFetching: true,
  /* Номер текущей страницы */
  currentPage: 1,
  /* Колличество репозиториев на странице */
  perPage: 10,
  /* Все полученные от gitHub репозитории */
  totalCount: 0,
  /* Найдена ошибка или нет */
  isFetchError: false,
};

export default function reposReducer(state = defaultState, action) {
  switch (action.type) {
    /* Загрузка данных с GitHub */
    case SET_REPOS:
      return {
        ...state,
        items: action.payload.items,
        totalCount: action.payload.total_count,
        isFetching: false,
      };
    case SET_IS_FETCHING:
      /* Loader */
      return {
        ...state,
        isFetching: action.payload,
      };
    case SET_CURRENT_PAGE:
      /* Текущая страница */
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_FETCH_ERROR:
      /* Есть ошибка или нет */
      return {
        ...state,
        isFetchError: action.payload,
      };
    default:
      return state;
  }
}

/* Также создадим Action creator это функция которая возращаем нам action 
Это объект у которого есть поле type и какие либо данные
*/
/* Загрузка данных с GitHub */
export const setRepos = (repos) => ({ type: SET_REPOS, payload: repos });
/* Loader */
export const setIsFetching = (bool) => ({
  type: SET_IS_FETCHING,
  payload: bool,
});
/* Текущая страница */
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});
/* Есть ошибка или нет */
export const setFetchError = (bool) => ({
  type: SET_FETCH_ERROR,
  payload: bool,
});

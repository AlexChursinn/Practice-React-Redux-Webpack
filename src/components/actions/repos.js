import axios from "axios";
import {
  setFetchError,
  setIsFetching,
  setRepos,
} from "../reducers/reposReducer";

export const getRepos = (searchQuery = "stars:%3E1", currentPage, perPage) => {
  /* Так как используем redux-thunk нужно создать ещё одну функцию */
  /* Если инпут пустой то присвоим дефотное значение */
  if (searchQuery == "") {
    searchQuery = "stars:%3E1";
  }
  return async (dispatch) => {
    /* Чтобы обрабатывать ошибки необходимо поместить код в блок try catch */
    try {
      dispatch(setIsFetching(true));
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`
      );
      dispatch(setRepos(response.data));
    } catch (e) {
      dispatch(setFetchError(true));
      dispatch(setIsFetching(false));
      /* Убираем сообщение об ошибке через две секунды */
      setTimeout(() => {
        dispatch(setFetchError(false));
      }, 2000);
    }
  };
};

/* Берем с API отдельно взятый репозиторий и информацию о нём */
export const getCurrentRepo = async (username, reponame, setRepo) => {
  const response = await axios.get(
    `https://api.github.com/repos/${username}/${reponame}`
  );
  setRepo(response.data);
};

/* Берем с API contributors */
export const getCotributors = async (username, reponame, setContributors) => {
  const response = await axios.get(
    `https://api.github.com/repos/${username}/${reponame}/contributors?page=1&per_page=10`
  );
  setContributors(response.data);
};

import React, { useEffect, useState } from "react";
import "./main.less";
import { useDispatch, useSelector } from "react-redux";
import { getRepos } from "../actions/repos";
import Repo from "./repo/repo";
import { setCurrentPage } from "../reducers/reposReducer";
import { cratePages } from "../utils/pagesCreator";

function Main() {
  const dispatch = useDispatch();
  /* Получаю данные с GitHub */
  const repos = useSelector((state) => state.repos.items);
  /* Loader */
  const isFetching = useSelector((state) => state.repos.isFetching);
  /* Текущая страница */
  const currentPage = useSelector((state) => state.repos.currentPage);
  /*Всего страниц */
  const totalCount = useSelector((state) => state.repos.totalCount);
  /* Колличество репозиториев на странице */
  const perPage = useSelector((state) => state.repos.perPage);
  /* Есть ошибка или нет */
  const isFetchError = useSelector((state) => state.repos.isFetchError);
  /* Общее колличество страниц */
  const pagesCount = Math.ceil(totalCount / perPage);

  /* Страницы */
  const pages = [];

  /* Вызываем функцию с логикой переключения страниц 
  передадим массив страниц, общее колличество страниц и текущую страницу
  */
  cratePages(pages, pagesCount, currentPage);

  /* Делаем поисковый инпут управляемым */
  const [searchValue, setSearchValue] = useState("");

  /* Если [] зависимости пустой то вызовится один раз
  нужна для сайд эффектов */

  /* currentPage добавили для того что при изменение наша зависимсоть изменяется */
  useEffect(() => {
    dispatch(getRepos(searchValue, currentPage, perPage));
  }, [currentPage]);

  /* При нажатии на кнопку будет получать репозиторий но с нашим поисковым запросом*/
  function searchHandler() {
    dispatch(setCurrentPage(1));
    dispatch(getRepos(searchValue, currentPage, perPage));
  }

  /* Если условие с ошибкой true То редирект на страницу с ошибкой */
  /*   if (isFetchError) {
    return <Redirect to="/error" />;
  } */

  return (
    <div>
      {/* Если isFetchError то отображаем alert с ошибкой из bootstrap */}
      {isFetchError && (
        <div class="alert alert-danger" role="alert">
          Произишла ошибка! Пожалуйста обновите страницу!
        </div>
      )}
      <div className="search">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Input repo name"
          className="search-input"
        />
        <button onClick={() => searchHandler()} className="search-btn">
          Search
        </button>
      </div>
      {isFetching === false ? (
        repos.map((repo) => <Repo repo={repo} />)
      ) : (
        <div className="fetching"></div>
      )}
      {/* Отображаем наши страницы */}
      <div className="pages">
        {pages.map((page, index) => (
          <span
            key={index}
            /* Если текущая страница то свой класс */
            className={currentPage == page ? "current-page" : "page"}
            /* При нажатии изменяем номер страницы */
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Main;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCotributors, getCurrentRepo } from "../actions/repos";
import "./card.less";

function Card() {
  /* Навигация по страницам */
  const navigate = useNavigate();

  /* Позволяет получать параметры из url */
  const { username, reponame } = useParams();
  /*  console.log(username, reponame);
   */
  /* Сам репоизторий */
  const [repo, setRepo] = useState({ owner: {} });

  /* Контребьютерс */
  const [contributors, setContributors] = useState();

  /* Вызовем функцию получающую репозиторий  и передадим в неё все необходимые параметры*/
  useEffect(() => {
    getCurrentRepo(username, reponame, setRepo);
    getCotributors(username, reponame, setContributors);
  }, []);

  return (
    <div>
      {/* При клике возвращаемся на предыдущую страницу */}
      <button onClick={() => navigate(-1)} className="back-btn">
        BACK
      </button>
      {/* Отобразим информацию о пользователе репозитория */}
      <div className="card">
        <img src={repo.owner.avatar_url} alt="" />
        <div className="name">{repo.name}</div>
        <div className="stars">{repo.stargazers_count}</div>
      </div>
      {/* Показываем Контребьютерс */}
      {contributors &&
        contributors.map((c, index) => (
          <div key={index}>
            {index + 1}. {c.login}
          </div>
        ))}
    </div>
  );
}

export default Card;

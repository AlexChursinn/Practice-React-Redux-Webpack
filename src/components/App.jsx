import React from "react";
import "./app.less";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from "./main/Main";
import Card from "./card/Card";
import Error from "./main/Error";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Main />} />
          {/* Получим :username/:reponame через хук useParams */}
          <Route path="/card/:username/:reponame" element={<Card />} />
          {/* При ошибке */}
          <Route path="/error" element={<Error />} />
          {/* Редирект если вбиваем не точный адерсс */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";

function Error(props) {
  /* Навигация по страницам */
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={() => navigate(-1)}>GO TO MAIN PAGE</button>Error
    </div>
  );
}

export default Error;

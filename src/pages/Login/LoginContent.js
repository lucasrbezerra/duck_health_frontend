import React from "react";
import { Link } from "react-router-dom";

export default function LoginContent() {
  const id = 163;
  const location = {
    pathname: `/doctor/list/${id}`,
    state: { fromLogin: true, id },
  };
  return (
    <Link to={location}>
      <button type="submit">Logar</button>
    </Link>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    if (
      email === "admin@alivvi.com" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: 0,
          name: "Administrador",
          email: "admin@alivvi.com",
          role: "admin"
        })
      );


  navigate("/home");
  return;
}

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!foundUser) {
      setError("Email ou senha invalidos.");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );

    setError("");

    alert(
      `Bem vindo, ${foundUser.name}!`
    );

    navigate("/home");
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Bem vindo</h1>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button type="submit">
            Login
          </button>
        </form>

        <div className="login-footer">
          <p>
            Ainda nao tem uma conta?
            <Link to="/register">
              {" "}
              Cadastro
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
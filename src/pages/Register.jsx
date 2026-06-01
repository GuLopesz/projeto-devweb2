import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  validateEmail,
  validatePassword,
  validateName,
} from "../utils/validation";

import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleRegister(event) {
    event.preventDefault();

    if (!validateName(name)) {
      setError("Nome deve conter pelo menos 3 caracteres.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Insira um email valido.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Senha deve conter pelo menos 8 caracteres, uma letra maiuscula e um numero."
      );
      return;
    }

    const savedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const emailAlreadyExists = savedUsers.some(
      (user) => user.email === email
    );

    if (emailAlreadyExists) {
      setError("Email ja cadastrado.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    savedUsers.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(savedUsers)
    );

    setError("");

    alert("Conta criada com sucesso!");

    navigate("/login");
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Create Account</h1>

        <form
          className="register-form"
          onSubmit={handleRegister}
        >
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
          />

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
            Register
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
import { Link } from "react-router-dom";
import "../styles/login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Bem vindo</h1>

        <form className="login-form">
          <input type="email" placeholder="Email" />

          <input type="password" placeholder="Senha" />

          <button type="submit">
            Login
          </button>
        </form>

        <div className="login-footer">
          <p>
            Ainda não tem uma conta?
            <Link to="/register">
              {" "}Cadastro
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
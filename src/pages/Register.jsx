import { Link } from "react-router-dom";
import "../styles/register.css";

function Register() {
  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Criar Conta</h1>

        <form className="register-form">
          <input type="text" placeholder="Nome" />

          <input type="email" placeholder="Email" />

          <input type="password" placeholder="Senha" />

          <button type="submit">
            Cadastro
          </button>
        </form>

        <div className="register-footer">
          <p>
            Já possui uma conta?
            <Link to="/login">
              {" "}Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
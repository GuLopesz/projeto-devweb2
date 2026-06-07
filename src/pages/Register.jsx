import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dados from '../services/dados.json'; // IMPORTAÇÃO DO JSON

import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateBirthDate,
  validateExperienceLevel,
} from "../utils/validation";

import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [physicalRestrictions, setPhysicalRestrictions] = useState("");

  const [error, setError] = useState("");

  function formatPhone(value) {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2,7)}-${numbers.slice(7, 11)}`;
  }

  function handlePhoneChange(event) {
    let value = event.target.value.replace(/\D/g, "");
    value = value.slice(0, 11);
    if (value.length <= 2) {
      value = value;
    } else if (value.length <= 7) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      value = `(${value.slice(0, 2)}) ${value.slice(2,7)}-${value.slice(7)}`;
    }
    setPhone(value);
  }

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
      setError("Senha deve conter pelo menos 8 caracteres, uma letra maiuscula e um numero.");
      return;
    }
    if (!validatePhone(phone)) {
      setError("Informe um telefone válido.");
      return;
    }
    if (!validateBirthDate(birthDate)) {
      setError("Informe sua data de nascimento.");
      return;
    }
    if (!validateExperienceLevel(experienceLevel)) {
      setError("Selecione seu nível de experiência.");
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailAlreadyExists = savedUsers.some((user) => user.email === email);

    if (emailAlreadyExists) {
      setError("Email ja cadastrado.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      phone,
      birthDate,
      experienceLevel,
      physicalRestrictions,
      role: "student",
    };

    savedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(savedUsers));

    const aulaYoga = dados.catalogo_explorar.find(aula => aula.id === 1);
    const aulaPilates = dados.catalogo_explorar.find(aula => aula.id === 3);

    const reservasAtuais = JSON.parse(localStorage.getItem('alivvi_reservas')) || [];

    const reserva1 = {
      id: Date.now() + 1,
      id_aula: aulaYoga.id,
      nome: aulaYoga.nome,
      categoria: aulaYoga.categoria,
      instrutor: aulaYoga.instrutor,
      horario: aulaYoga.horariosDisponiveis[0], 
      imagem: aulaYoga.imagem,
      horariosDisponiveis: aulaYoga.horariosDisponiveis
    };

    const reserva2 = {
      id: Date.now() + 2,
      id_aula: aulaPilates.id,
      nome: aulaPilates.nome,
      categoria: aulaPilates.categoria,
      instrutor: aulaPilates.instrutor,
      horario: aulaPilates.horariosDisponiveis[0],
      imagem: aulaPilates.imagem,
      horariosDisponiveis: aulaPilates.horariosDisponiveis
    };

    localStorage.setItem('alivvi_reservas', JSON.stringify([...reservasAtuais, reserva1, reserva2]));
    window.dispatchEvent(new Event("reservasUpdate"));

    setError("");
    alert("Conta criada com sucesso! Preparamos duas aulas iniciais para você conhecer a plataforma.");
    navigate("/login");
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Criar Conta</h1>

        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="tel"
            placeholder="(11) 91234-5678"
            value={phone}
            onChange={handlePhoneChange}
          />
          <input
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
          />
          <select
            value={experienceLevel}
            onChange={(event) => setExperienceLevel(event.target.value)}
          >
            <option value="">Selecione seu nível de experiência</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <textarea
            placeholder="Informações de saúde e restrições físicas (opcional)"
            value={physicalRestrictions}
            onChange={(event) => setPhysicalRestrictions(event.target.value)}
            rows="4"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <p className="error-message">{error}</p>}

          <button type="submit">Cadastrar</button>
        </form>

        <div className="register-footer">
          <p>
            Ja tem uma conta?
            <Link to="/login"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
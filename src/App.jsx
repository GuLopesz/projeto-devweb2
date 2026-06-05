import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Explorar from './pages/Explorar';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Questionario from "./pages/Questionario";
import Sobre from './pages/Sobre';
import Historias from './pages/Historias';
import ClassDetail from './pages/ClassDetail';
import MinhasReservas from './pages/MinhasReservas';

// Importando os dados iniciais do JSON para popular o state
import dados from './services/dados.json';

function App() {
  // Ao iniciar, busca do Local Storage.
  // Se não encontrar nada, puxa o padrão do JSON.
  const [reservas, setReservas] = useState(() => {
    const reservasSalvas = localStorage.getItem('alivvi_reservas');
    if (reservasSalvas) {
      return JSON.parse(reservasSalvas);
    }
    return dados.usuario_logado.proximas_aulas;
  });

  // Ao mudar o estado 'reservas', salva automaticamente no Local Storage do navegador.
  useEffect(() => {
    localStorage.setItem('alivvi_reservas', JSON.stringify(reservas));
  }, [reservas]);

  // Função CREATE
  const adicionarReserva = (novaReserva) => {
    setReservas([...reservas, novaReserva]);
  };

  // Função UPDATE
  const atualizarReserva = (idReserva, novoHorario) => {
    setReservas(reservas.map(reserva => 
      reserva.id === idReserva ? { ...reserva, horario: novoHorario } : reserva
    ));
  };

  // Função DELETE
  const excluirReserva = (idReserva) => {
    setReservas(reservas.filter(reserva => reserva.id !== idReserva));
  };

  return (
    <Router>
      <ScrollToTop />
      <Header />
      
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home reservas={reservas} />} />
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/questionario" element={<Questionario />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/historias" element={<Historias />} />
          
          <Route path="/aula/:id" element={
            <ClassDetail 
              adicionarReserva={adicionarReserva} 
              reservas={reservas} 
            />
          } />

          <Route path="/minhas-reservas" element={
            <MinhasReservas 
              reservas={reservas} 
              atualizarReserva={atualizarReserva} 
              excluirReserva={excluirReserva} 
            />
          } />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
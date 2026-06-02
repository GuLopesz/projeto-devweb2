import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dados from '../services/dados.json';

const Home = () => {
  const [aulas, setAulas] = useState([]);
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    // Carrega as aulas do JSON
    setAulas(dados.usuario_logado.proximas_aulas);

    // Busca o usuário logado no cache do navegador
    const userCache = localStorage.getItem('currentUser');
    if (userCache) {
      const parsedUser = JSON.parse(userCache);
      setUsuario(parsedUser.name);
    }
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Boas-vindas */}
      <section style={{ marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--alivvi-olive)', fontSize: '2.2rem' }}>
          Olá, {usuario || 'Visitante'}!
        </h1>
        <p style={{ color: '#666' }}>Sua jornada de bem-estar começa agora.</p>
      </section>

      {/* Card acolhimento*/}
      <div style={{
        background: 'var(--alivvi-olive)', color: 'white', padding: '30px',
        borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '50px', boxShadow: '0 10px 25px rgba(162, 166, 60, 0.25)'
      }}>
        <div style={{ maxWidth: '65%' }}>
          <h2 style={{ margin: '0 0 10px 0' }}>Questionário de Acolhimento</h2>
          <p style={{ margin: 0, opacity: 0.9 }}>Responda algumas perguntas para encontrarmos a prática ideal para o seu momento.</p>
        </div>
        <Link to="/questionario" className="btn-primary" style={{ backgroundColor: 'var(--alivvi-purple)' }} >Iniciar</Link>
      </div>

      {/* Atalhos*/}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '50px' }}>
        {['Yoga', 'Meditação', 'Pilates', 'Nutrição'].map(servico => (
          <div key={servico} style={{
            background: 'white', padding: '25px', borderRadius: '20px', textAlign: 'center',
            border: '1px solid #eee', cursor: 'pointer', transition: '0.3s'
          }}>
            <div style={{ color: 'var(--alivvi-purple)', fontSize: '1.5rem', marginBottom: '10px' }}>✧</div>
            <span style={{ fontWeight: 'bold' }}>{servico}</span>
          </div>
        ))}
      </div>

      {/* Listagem de Aulas*/}
      <h3 style={{ marginBottom: '25px', color: 'var(--alivvi-olive)' }}>PRÓXIMAS AULAS</h3>
      <div style={{ display: 'grid', gap: '15px' }}>
        {aulas.map(aula => (
          <div key={aula.id} style={{
            background: 'white', padding: '20px', borderRadius: '20px',
            display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #eee'
          }}>
            <img src={aula.imagem} alt={aula.nome} style={{ width: '80px', height: '80px', borderRadius: '15px', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <span style={{ color: 'var(--alivvi-purple)', fontWeight: 'bold', fontSize: '0.75rem' }}>{aula.tipo}</span>
              <h4 style={{ margin: '5px 0', fontSize: '1.2rem' }}>{aula.nome}</h4>
              <p style={{ margin: 0, color: '#777', fontSize: '0.9rem' }}>Com {aula.instrutor}</p>
            </div>
            <button style={{ 
              background: 'none', border: '1px solid var(--alivvi-purple)', 
              color: 'var(--alivvi-purple)', padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold' 
            }}>Reservar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
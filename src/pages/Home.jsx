import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = ({ reservas }) => {
  const [usuario, setUsuario] = useState('');
  const navigate = useNavigate();

useEffect(() => {
    const userCache = localStorage.getItem('currentUser');
    if (!userCache) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userCache);
    setUsuario(parsedUser.name);
    
  }, [navigate]);

  const obterProximasAulas = () => {
    if (!reservas || reservas.length === 0) return [];
    return reservas.slice(0, 2);
  };

  const proximasAulas = obterProximasAulas();

  const formatarHorarioExibicao = (horarioStr) => {
    if (!horarioStr) return "A definir";
    if (horarioStr.includes('T')) {
      const [data, hora] = horarioStr.split('T');
      const [ano, mes, dia] = data.split('-');
      return `${dia}/${mes}/${ano} às ${hora}`;
    }
    return horarioStr;
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      
      {/* Boas-vindas */}
      <section style={{ marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--alivvi-olive)', fontSize: '2.2rem' }}>
          Olá, {usuario || 'Visitante'}!
        </h1>
        <p style={{ color: '#666' }}>Sua jornada de bem-estar começa agora.</p>
      </section>

      {/* Card acolhimento */}
      <div style={{
        background: 'var(--alivvi-olive)', color: 'white', padding: '30px',
        borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '50px', boxShadow: '0 10px 25px rgba(162, 166, 60, 0.25)'
      }}>
        <div style={{ maxWidth: '65%' }}>
          <h2 style={{ margin: '0 0 10px 0' }}>Questionário de Acolhimento</h2>
          <p style={{ margin: 0, opacity: 0.9 }}>Responda algumas perguntas para encontrarmos a prática ideal para o seu momento.</p>
        </div>
        <Link to="/questionario" className="btn-primary" style={{ backgroundColor: 'var(--alivvi-purple)', padding: '10px 25px', borderRadius: '20px', color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
          Iniciar
        </Link>
      </div>

      {/* Listagem de Aulas do Usuário */}
      <h3 style={{ marginBottom: '25px', color: 'var(--alivvi-olive)' }}>SUAS PRÓXIMAS AULAS</h3>
      
      {proximasAulas.length === 0 ? (
        <div style={{ background: '#f9f9f9', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px dashed #ccc' }}>
          <p style={{ color: '#666', marginBottom: '15px' }}>Você ainda não possui aulas agendadas.</p>
          <button 
            onClick={() => navigate('/explorar')}
            style={{ background: 'var(--alivvi-purple)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Explorar Catálogo
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {proximasAulas.map(aula => (
            <div key={aula.id} style={{
              background: 'white', padding: '20px', borderRadius: '20px',
              display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #eee'
            }}>
              <img src={aula.imagem} alt={aula.nome} style={{ width: '80px', height: '80px', borderRadius: '15px', objectFit: 'cover' }} />
              
              <div style={{ flex: 1 }}>
                <span style={{ color: 'var(--alivvi-purple)', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  {aula.categoria}
                </span>
                <h4 style={{ margin: '5px 0', fontSize: '1.2rem', color: '#333' }}>{aula.nome}</h4>
                <p style={{ margin: 0, color: '#777', fontSize: '0.9rem' }}>
                  🗓️ {formatarHorarioExibicao(aula.horario)} • Prof. {aula.instrutor}
                </p>
              </div>
              
              <button 
                onClick={() => navigate('/minhas-reservas')}
                style={{ 
                background: 'transparent', border: '1px solid var(--alivvi-purple)', 
                color: 'var(--alivvi-purple)', padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' 
              }}>
                Gerenciar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
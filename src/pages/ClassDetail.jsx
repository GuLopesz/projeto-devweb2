import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dados from '../services/dados.json';

const ClassDetail = ({ adicionarReserva, reservas }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const found = dados.catalogo_explorar.find(item => item.id === Number(id));
    if (!found) {
      navigate('/explorar');
      return;
    }
    setClassData(found);

    const jaReservado = reservas.some(r => r.nome === found.nome);
    setIsBooked(jaReservado);
  }, [id, navigate, reservas]);

  if (!classData) return null;

  // Lógica botão "Reservar Aula"
  const handleReservar = () => {
    const novaReserva = {
      id: Date.now(), // Gera um ID único simulado para a reserva
      id_aula: classData.id,
      nome: classData.nome,
      categoria: classData.categoria,
      instrutor: classData.instrutor,
      horario: "A definir", // Horário padrão, o usuário pode editar
      imagem: classData.imagem
    };

    adicionarReserva(novaReserva);
    setIsBooked(true);
  };

  const infoCards = [
    { label: 'Duração', value: classData.duracao },
    { label: 'Nível', value: classData.nivel },
    { label: 'Categoria', value: classData.categoria },
  ];

  return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>

        <button
          onClick={() => navigate('/explorar')}
          style={{ background: 'none', border: 'none', color: 'var(--alivvi-purple)',
            fontWeight: 'bold', cursor: 'pointer', marginBottom: '24px', fontSize: '0.95rem' }}
        >
          ← Voltar para Explorar
        </button>

        <img
          src={classData.imagem}
          alt={classData.nome}
          style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '24px', marginBottom: '32px' }}
        />

        <span style={{ color: 'var(--alivvi-purple)', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>
          {classData.categoria}
        </span>
        <h1 style={{ color: 'var(--alivvi-olive)', fontSize: '2rem', margin: '8px 0 4px 0' }}>
          {classData.nome}
        </h1>
        <p style={{ color: '#777', marginBottom: '32px' }}>Com Prof. {classData.instrutor}</p>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {infoCards.map(info => (
            <div key={info.label} style={{
              background: 'white', border: '1px solid #eee', borderRadius: '16px',
              padding: '16px 24px', textAlign: 'center', flex: '1', minWidth: '120px'
            }}>
              <p style={{ margin: 0, color: '#999', fontSize: '0.8rem' }}>{info.label}</p>
              <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#2D2D2D' }}>{info.value}</p>
            </div>
          ))}
        </div>

        {!isBooked ? (
          <button
            onClick={handleReservar}
            style={{
              background: 'var(--alivvi-purple)', color: 'white', border: 'none',
              padding: '16px 40px', borderRadius: '30px', fontSize: '1rem',
              fontWeight: 'bold', cursor: 'pointer', width: '100%'
            }}
          >
            Reservar Aula
          </button>
        ) : (
          <div style={{
            background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '16px',
            padding: '20px', textAlign: 'center'
          }}>
            <p style={{ color: '#16a34a', fontWeight: 'bold', margin: 0, fontSize: '1.1rem' }}>
              ✓ Aula reservada com sucesso!
            </p>
            <p style={{ color: '#555', margin: '8px 0 0 0', fontSize: '0.9rem' }}>
              Você pode acompanhar sua reserva em Meu Histórico.
            </p>
            <button 
              onClick={() => navigate('/minhas-reservas')}
              style={{ marginTop: '15px', padding: '8px 20px', borderRadius: '10px', border: '1px solid #16a34a', background: 'transparent', color: '#16a34a', cursor: 'pointer', fontWeight: 'bold' }}>
              Ver Minhas Reservas
            </button>
          </div>
        )}

      </div>
  );
};

export default ClassDetail;
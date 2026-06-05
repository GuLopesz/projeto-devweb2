import React, { useState } from 'react';

const MinhasReservas = ({ reservas, atualizarReserva, excluirReserva }) => {
  const [editandoId, setEditandoId] = useState(null);
  const [novoHorario, setNovoHorario] = useState("");

  const iniciarEdicao = (reserva) => {
    setEditandoId(reserva.id);
    
    const formatoValidoProCalendario = reserva.horario.includes('T') ? reserva.horario : "";
    setNovoHorario(formatoValidoProCalendario);
  };

  const salvarEdicao = (id) => {
    if (novoHorario !== "") {
      atualizarReserva(id, novoHorario);
    }
    setEditandoId(null);
  };

  const formatarHorarioExibicao = (horarioStr) => {
    if (horarioStr.includes('T')) {
      const [data, hora] = horarioStr.split('T');
      const [ano, mes, dia] = data.split('-');
      return `${dia}/${mes}/${ano} às ${hora}`;
    }
    return horarioStr;
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', minHeight: '70vh' }}>
      <h1 style={{ color: 'var(--alivvi-olive)', fontSize: '2.5rem', marginBottom: '10px' }}>
        Meu Histórico e Reservas
      </h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>
        Gerencie as suas próximas aulas de bem-estar. Altere os horários ou cancele reservas se necessário.
      </p>

      {reservas.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999', padding: '40px', background: '#f9f9f9', borderRadius: '15px' }}>
          Você ainda não possui aulas reservadas. Visite a página Explorar!
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
            <thead style={{ backgroundColor: 'var(--alivvi-purple)', color: '#fff' }}>
              <tr>
                <th style={{ padding: '15px', textAlign: 'left' }}>Aula (Yoga, Pilates, etc)</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Instrutor</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Horário</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                  
                  <td style={{ padding: '15px', color: '#333', fontWeight: 'bold' }}>
                    {reserva.nome} <br/>
                    <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 'normal' }}>{reserva.categoria}</span>
                  </td>
                  
                  <td style={{ padding: '15px', color: '#555' }}>
                    {reserva.instrutor}
                  </td>
                  
                  <td style={{ padding: '15px' }}>
                    {editandoId === reserva.id ? (
                      <input 
                        type="datetime-local" 
                        value={novoHorario} 
                        onChange={(e) => setNovoHorario(e.target.value)}
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', fontFamily: 'inherit' }}
                      />
                    ) : (
                      <span style={{ color: '#555' }}>
                        {formatarHorarioExibicao(reserva.horario)}
                      </span>
                    )}
                  </td>
                  
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    {editandoId === reserva.id ? (
                      <button 
                        onClick={() => salvarEdicao(reserva.id)}
                        style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
                        Salvar
                      </button>
                    ) : (
                      <button 
                        onClick={() => iniciarEdicao(reserva)}
                        style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
                        Editar Horário
                      </button>
                    )}
                    
                    <button 
                      onClick={() => excluirReserva(reserva.id)}
                      style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                      Cancelar Aula
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MinhasReservas;
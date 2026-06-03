import React, { useState } from 'react';

const Questionario = () => {
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const perguntas = [
    {
      id: 'estresse',
      titulo: 'Como você avalia o seu nível de estresse e ansiedade no dia a dia?',
      opcoes: [
        { texto: 'Baixo - Consigo me manter calmo na maioria dos dias.', peso: 'baixe' },
        { texto: 'Moderado - Sinto picos de estresse em dias corridos.', peso: 'meditacao' },
        { texto: 'Alto - Sinto-me constantemente ansioso(a) e sobrecarregado(a).', peso: 'yoga' }
      ]
    },
    {
      id: 'corpo',
      titulo: 'Com que frequência você sente dores físicas, tensões ou indisposição?',
      opcoes: [
        { texto: 'Raramente sinto dores e tenho bastante energia.', peso: 'baixe' },
        { texto: 'Sinto tensões leves nas costas ou ombros pelo trabalho.', peso: 'pilates' },
        { texto: 'Sinto dores constantes, rigidez ou muito cansaço físico.', peso: 'yoga' }
      ]
    },
    {
      id: 'sono',
      titulo: 'Como é a qualidade do seu sono na maioria das noites?',
      opcoes: [
        { texto: 'Excelente - Durmo rápido e acordo descansado(a).', peso: 'baixe' },
        { texto: 'Instável - Demoro um pouco para dormir ou acordo no meio da noite.', peso: 'meditacao' },
        { texto: 'Ruim - Tenho insônia frequente e acordo exausto(a).', peso: 'meditacao' }
      ]
    },
    {
      id: 'alimentacao',
      titulo: 'Como você descreveria a sua rotina e hábitos alimentares?',
      opcoes: [
        { texto: 'Equilibrada - Consigo comer de forma saudável e natural.', peso: 'baixe' },
        { texto: 'Regular - Tento comer bem, mas pulo refeições ou recorro a ultraprocessados.', peso: 'nutricao' },
        { texto: 'Desregulada - Sinto falta de energia e desconto a ansiedade na comida.', peso: 'nutricao' }
      ]
    }
  ];

  // salvar
  const handleResposta = (peso) => {
    const novasRespostas = { ...respostas, [perguntas[passo].id]: peso };
    setRespostas(novasRespostas);

    if (passo < perguntas.length - 1) {
      setPasso(passo + 1);
    } else {
      setMostrarResultado(true);
    }
  };

  // calcula feedback
  const calcularResultado = () => {
    const pontos = { yoga: 0, meditacao: 0, pilates: 0, nutricao: 0, baixe: 0 };
    
    Object.values(respostas).forEach(peso => {
      pontos[peso] = (pontos[peso] || 0) + 1;
    });

    if (pontos.baixe >= 3) {
      return {
        status: 'Equilibrado e Saudável',
        descricao: 'Parabéns! Os seus hábitos e o seu nível de energia mostram que você já possui uma excelente base de autocuidado no seu dia a dia.',
        pilar: 'Meditação Guiada',
        icone: 'ri-rest-time-line',
        dica: 'O foco agora é manutenção e performance mental. Práticas curtas de Mindfulness vão ajudar a blindar o seu foco e manter essa consistência fantástica.'
      };
    }

    let pilarRecomendado = '';
    
    if (pontos.yoga >= pontos.meditacao && pontos.yoga >= pontos.pilates && pontos.yoga >= pontos.nutricao) {
      pilarRecomendado = 'yoga';
    } else if (pontos.meditacao >= pontos.pilates && pontos.meditacao >= pontos.nutricao) {
      pilarRecomendado = 'meditacao';
    } else if (pontos.pilates >= pontos.nutricao) {
      pilarRecomendado = 'pilates';
    } else {
      pilarRecomendado = 'nutricao';
    }

    const feedbacks = {
      yoga: {
        status: 'Sinais de sobrecarga física e mental',
        descricao: 'O seu corpo e a sua mente estão pedindo uma pausa. Níveis elevados de tensão acumulada e ansiedade precisam de uma abordagem integrativa.',
        pilar: 'Yoga Restaurativo',
        icone: 'ri-rest-time-line',
        dica: 'Recomendamos que comece pelas aulas de Yoga. Elas vão ajudar a alinhar a respiração, acalmar o sistema nervoso e aliviar as dores físicas de forma imediata.'
      },
      meditacao: {
        status: 'Mente acelerada e sono instável',
        descricao: 'A sua maior queixa está relacionada com a dificuldade em desconectar, gerando agitação mental e impactando diretamente a qualidade do seu descanso.',
        pilar: 'Meditação e Mindfulness',
        icone: 'ri-mental-health-line',
        dica: 'Começar com sessões de 5 a 10 minutos de meditação guiada antes de dormir mudará totalmente o seu jogo. O foco inicial será acalmar os pensamentos.'
      },
      pilates: {
        status: 'Necessidade de fortalecimento e postura',
        descricao: 'O seu ritmo diário está causando pequenos desconfortos posturais e tensões localizadas, o que drena a sua energia ao longo do dia.',
        pilar: 'Pilates Solo',
        icone: 'ri-body-scan-line',
        dica: 'As aulas de Pilates Solo serão perfeitas para você. Elas vão devolver a mobilidade à sua coluna e fortalecer a musculatura para evitar o cansaço muscular.'
      },
      nutricao: {
        status: 'Oscilação de energia e metabolismo',
        descricao: 'A sua alimentação está diretamente ligada aos seus picos de cansaço ou ansiedade. Ajustar o combustível do seu corpo trará clareza mental rápida.',
        pilar: 'Orientação Nutricional',
        icone: 'ri-apple-line',
        dica: 'Não estamos falando de dietas restritivas! Comece organizando pequenos lanches estratégicos para evitar que a fome acumule e gere ansiedade no fim do dia.'
      }
    };

    return feedbacks[pilarRecomendado];
  };

  const resultado = mostrarResultado ? calcularResultado() : null;

  return (
    <>
    <div className="explore-main-container">
      
      {/*PERGUNTAS */}
      {!mostrarResultado ? (
        <div className="controls-wrapper" style={{ minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* barra de progresso*/}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#999', marginBottom: '10px' }}>
              <span>Pergunta {passo + 1} de {perguntas.length}</span>
              <span>{Math.round(((passo) / perguntas.length) * 100)}% concluído</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: '#EAEAEA', borderRadius: '2px', marginBottom: '30px' }}>
              <div style={{ width: `${((passo) / perguntas.length) * 100}%`, height: '100%', background: '#A2A63C', borderRadius: '2px', transition: '0.3s' }}></div>
            </div>

            <h3 style={{ fontSize: '1.35rem', color: '#2D2D2D', marginBottom: '25px', fontWeight: '600', lineHeight: '1.4' }}>
              {perguntas[passo].titulo}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {perguntas[passo].opcoes.map((opcao, index) => (
              <button
                key={index}
                onClick={() => handleResposta(opcao.peso)}
                className="filter-btn"
                style={{ 
                  textAlign: 'left', 
                  padding: '16px 20px', 
                  borderRadius: '12px', 
                  fontSize: '0.95rem',
                  width: '100%',
                  justifyContent: 'flex-start'
                }}
              >
                {opcao.texto}
              </button>
            ))}
          </div>
        </div>
      ) : (
        
        /*FEEDBACK*/
        <div className="controls-wrapper" style={{ textAlign: 'center', padding: '40px 30px' }}>
          <div className="pillar-icon-wrapper" style={{ marginBottom: '15px' }}>
            <i className={resultado.icone} style={{ fontSize: '3.5rem', color: '#A6377F' }}></i>
          </div>
          
          <span className="section-badge" style={{ marginBottom: '5px' }}>Seu Diagnóstico Alivvi</span>
          <h2 style={{ color: '#2D2D2D', fontSize: '1.8rem', fontWeight: '700', marginTop: '5px' }}>
            {resultado.status}
          </h2>
          
          <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '650px', margin: '15px auto 30px auto' }}>
            {resultado.descricao}
          </p>

          <div style={{ 
            backgroundColor: '#FFFFFF', 
            border: '1px solid #E0E0E0', 
            borderRadius: '16px', 
            padding: '24px', 
            maxWidth: '600px', 
            margin: '0 auto 30px auto',
            textAlign: 'left',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#A2A63C', fontSize: '1.1rem', fontWeight: '700' }}>
              Recomendação: {resultado.pilar}
            </h4>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              {resultado.dica}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button 
              className="btn-conhecer" 
              style={{ position: 'static', transform: 'none', padding: '12px 30px', fontSize: '0.95rem' }}
              onClick={() => window.location.href = '/explorar'}
            >
              Ir para o Catálogo de Aulas
            </button>
            <button 
              className="filter-btn" 
              style={{ padding: '12px 25px' }}
              onClick={() => {
                setPasso(0);
                setRespostas({});
                setMostrarResultado(false);
              }}
            >
              Refazer Questionário
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Questionario;
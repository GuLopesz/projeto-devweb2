import React, { useState, useEffect, useRef } from 'react';
import dados from '../services/dados.json';

const Historias = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  
  const carrosselRef = useRef(null);

  useEffect(() => {
    if (dados && dados.avaliacoes) {
      setAvaliacoes(dados.avaliacoes);
    }
  }, []);

  // Descobre a largura atual do card na tela para rolar a quantia exata
  const obterTamanhoDoPulo = () => {
    if (carrosselRef.current && carrosselRef.current.children.length > 0) {
      const larguraDoCard = carrosselRef.current.children[0].offsetWidth;
      const gap = 20;
      return larguraDoCard + gap;
    }
    return 340;
  };

  const rolarEsquerda = () => {
    if (carrosselRef.current) {
      const pulo = obterTamanhoDoPulo();
      carrosselRef.current.scrollBy({ left: -pulo, behavior: 'smooth' });
    }
  };

  const rolarDireita = () => {
    if (carrosselRef.current) {
      const pulo = obterTamanhoDoPulo();
      carrosselRef.current.scrollBy({ left: pulo, behavior: 'smooth' });
    }
  };

  const renderizarEstrelas = (nota) => {
    const estrelas = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= nota) {
        estrelas.push(<span key={i} style={{ color: '#FFD700', fontSize: '1.2rem' }}>★</span>);
      } else {
        estrelas.push(<span key={i} style={{ color: '#EAEAEA', fontSize: '1.2rem' }}>★</span>);
      }
    }
    return estrelas;
  };

  const estiloBotaoSeta = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#FFFFFF',
    border: '1px solid #EAEAEA',
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    zIndex: 10,
    fontSize: '1.2rem',
    color: '#A6377F',
    transition: 'background 0.3s ease'
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '60px 20px', minHeight: '70vh' }}>
      
      {/* Cabeçalho da Página */}
      <section style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span className="section-badge" style={{ display: 'inline-block', marginBottom: '10px' }}>Comunidade Alivvi</span>
        <h1 style={{ color: 'var(--alivvi-olive)', fontSize: '2.5rem', fontWeight: '700', margin: '0 0 15px 0' }}>
          Histórias de Sucesso
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Veja como as nossas aulas estão ajudando pessoas reais a encontrarem equilíbrio, saúde e leveza no dia a dia.
        </p>
      </section>

      {/* Wrapper do Carrossel com as Setas */}
      <div style={{ position: 'relative', padding: '0 20px' }}>
        
        <button onClick={rolarEsquerda} style={{ ...estiloBotaoSeta, left: '-15px' }} aria-label="Rolar para a esquerda">
          ❮
        </button>

        {/* Grid de Avaliações */}
        <div 
          ref={carrosselRef}
          className="esconder-scrollbar"
          style={{ 
            display: 'flex', 
            gap: '20px', 
            overflowX: 'auto', 
            padding: '10px', 
            scrollSnapType: 'x mandatory', 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
          }}
        >
          {avaliacoes.length > 0 ? (
            avaliacoes.map((av) => (
              <div 
                key={av.id} 
                className="carrossel-card"
                style={{ 
                  background: '#FFFFFF', 
                  padding: '30px', 
                  borderRadius: '20px', 
                  border: '1px solid #EAEAEA',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  scrollSnapAlign: 'start', 
                }}>
                
                {/* Cabeçalho do Card */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <img 
                    src={`https://ui-avatars.com/api/?name=${av.nome}&background=A6377F&color=fff&rounded=true`} 
                    alt={`Foto de ${av.nome}`} 
                    style={{ width: '55px', height: '55px', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#2D2D2D', fontSize: '1.1rem' }}>{av.nome}</h4>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {renderizarEstrelas(av.estrelas)}
                    </div>
                  </div>
                </div>
                
                {/* Comentário */}
                <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6', fontStyle: 'italic', flexGrow: 1, marginBottom: '20px' }}>
                  "{av.comentario}"
                </p>
                
                {/* Rodapé */}
                <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: '15px', marginTop: 'auto' }}>
                  <span style={{ display: 'inline-block', backgroundColor: 'rgba(162, 166, 60, 0.15)', color: 'var(--alivvi-olive)', padding: '6px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600' }}>
                    {av.aula}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%', color: '#999' }}>Carregando histórias...</p>
          )}
        </div>

        <button onClick={rolarDireita} style={{ ...estiloBotaoSeta, right: '-15px' }} aria-label="Rolar para a direita">
          ❯
        </button>

      </div>
    </div>
  );
};

export default Historias;
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import dados from '../services/dados.json';

const STORAGE_KEY = 'alivvi_avaliacoes';

const Historias = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Form state
  const [formNota, setFormNota] = useState(0);
  const [formNotaHover, setFormNotaHover] = useState(0);
  const [formAula, setFormAula] = useState('');
  const [formComentario, setFormComentario] = useState('');
  const [formSucesso, setFormSucesso] = useState(false);

  const carrosselRef = useRef(null);

  // Load reviews: localStorage first, fallback to JSON
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setAvaliacoes(JSON.parse(saved));
    } else if (dados?.avaliacoes) {
      setAvaliacoes(dados.avaliacoes);
    }
  }, []);

  // Load logged-in user
  useEffect(() => {
    const userCache = localStorage.getItem('currentUser');
    setCurrentUser(userCache ? JSON.parse(userCache) : null);
  }, []);

  // Persist reviews to localStorage whenever they change
  useEffect(() => {
    if (avaliacoes.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(avaliacoes));
    }
  }, [avaliacoes]);

  const getScrollStep = () => {
    if (carrosselRef.current && carrosselRef.current.children.length > 0) {
      return carrosselRef.current.children[0].offsetWidth + 20;
    }
    return 340;
  };

  const scrollLeft = () => {
    carrosselRef.current?.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
  };

  const scrollRight = () => {
    carrosselRef.current?.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#FFD700' : '#EAEAEA', fontSize: '1.2rem' }}>★</span>
    ));

  const handleSubmit = () => {
    if (!formNota || !formAula.trim() || !formComentario.trim()) return;

    const newReview = {
      id: Date.now(),
      nome: currentUser.name,
      aula: formAula.trim(),
      estrelas: formNota,
      comentario: formComentario.trim(),
    };

    setAvaliacoes(prev => [newReview, ...prev]);
    setFormNota(0);
    setFormAula('');
    setFormComentario('');
    setFormSucesso(true);
    setTimeout(() => setFormSucesso(false), 3000);
  };

  const arrowButtonStyle = {
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
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '60px 20px', minHeight: '70vh' }}>

      {/* Page header */}
      <section style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span className="section-badge" style={{ display: 'inline-block', marginBottom: '10px' }}>
          Comunidade Alivvi
        </span>
        <h1 style={{ color: 'var(--alivvi-olive)', fontSize: '2.5rem', fontWeight: '700', margin: '0 0 15px 0' }}>
          Histórias de Sucesso
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Veja como as nossas aulas estão ajudando pessoas reais a encontrarem equilíbrio, saúde e leveza no dia a dia.
        </p>
      </section>

      {/* Carousel */}
      <div style={{ position: 'relative', padding: '0 20px', marginBottom: '70px' }}>
        <button onClick={scrollLeft} style={{ ...arrowButtonStyle, left: '-15px' }} aria-label="Rolar para a esquerda">❮</button>

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
                }}
              >
                {/* Card header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${av.nome}&background=A6377F&color=fff&rounded=true`}
                    alt={`Foto de ${av.nome}`}
                    style={{ width: '55px', height: '55px', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#2D2D2D', fontSize: '1.1rem' }}>{av.nome}</h4>
                    <div style={{ display: 'flex', gap: '2px' }}>{renderStars(av.estrelas)}</div>
                  </div>
                </div>

                {/* Comment */}
                <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6', fontStyle: 'italic', flexGrow: 1, marginBottom: '20px' }}>
                  "{av.comentario}"
                </p>

                {/* Footer */}
                <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: '15px', marginTop: 'auto' }}>
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(162, 166, 60, 0.15)',
                    color: 'var(--alivvi-olive)',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                  }}>
                    {av.aula}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%', color: '#999' }}>Carregando histórias...</p>
          )}
        </div>

        <button onClick={scrollRight} style={{ ...arrowButtonStyle, right: '-15px' }} aria-label="Rolar para a direita">❯</button>
      </div>

      {/* Review form section */}
      <section style={{ maxWidth: '650px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span className="section-badge" style={{ display: 'inline-block', marginBottom: '10px' }}>
            Sua opinião importa
          </span>
          <h2 style={{ color: 'var(--alivvi-olive)', fontSize: '1.8rem', fontWeight: '700', margin: '0 0 10px 0' }}>
            Deixe sua avaliação
          </h2>
          <p style={{ color: '#666', fontSize: '1rem' }}>
            {currentUser
              ? 'Conte como foi sua experiência com uma das nossas aulas.'
              : 'Faça login para compartilhar sua experiência com a comunidade.'}
          </p>
        </div>

        {currentUser ? (
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #EAEAEA',
            borderRadius: '20px',
            padding: '35px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}>

            {/* Star rating */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                Sua nota
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {Array.from({ length: 5 }, (_, i) => {
                  const value = i + 1;
                  return (
                    <span
                      key={value}
                      onClick={() => setFormNota(value)}
                      onMouseEnter={() => setFormNotaHover(value)}
                      onMouseLeave={() => setFormNotaHover(0)}
                      style={{
                        fontSize: '2rem',
                        cursor: 'pointer',
                        color: value <= (formNotaHover || formNota) ? '#FFD700' : '#EAEAEA',
                        transition: 'color 0.15s ease',
                        userSelect: 'none',
                      }}
                    >
                      ★
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Class name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Aula avaliada
              </label>
              <input
                type="text"
                value={formAula}
                onChange={(e) => setFormAula(e.target.value)}
                placeholder="Ex: Vinyasa Flow, Pilates Solo..."
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  border: '1px solid #EAEAEA',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* Comment */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Comentário
              </label>
              <textarea
                value={formComentario}
                onChange={(e) => setFormComentario(e.target.value)}
                placeholder="Como foi sua experiência? O que você mais gostou?"
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  border: '1px solid #EAEAEA',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  lineHeight: '1.5',
                }}
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!formNota || !formAula.trim() || !formComentario.trim()}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: (!formNota || !formAula.trim() || !formComentario.trim()) ? '#ccc' : '#A6377F',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: (!formNota || !formAula.trim() || !formComentario.trim()) ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s ease',
              }}
            >
              Enviar avaliação
            </button>

            {/* Success message */}
            {formSucesso && (
              <p style={{
                marginTop: '15px',
                textAlign: 'center',
                color: 'var(--alivvi-olive)',
                fontWeight: '600',
                fontSize: '0.95rem',
              }}>
                ✓ Avaliação enviada! Obrigado pelo seu feedback.
              </p>
            )}
          </div>
        ) : (
          /* Not logged in — CTA */
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #EAEAEA',
            borderRadius: '20px',
            padding: '40px 35px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🌿</div>
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6', marginBottom: '25px' }}>
              Entre na sua conta para compartilhar sua experiência e inspirar outras pessoas na jornada de bem-estar.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <Link
                to="/login"
                style={{
                  padding: '12px 28px',
                  backgroundColor: '#A6377F',
                  color: '#fff',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                }}
              >
                Entrar
              </Link>
              <Link
                to="/register"
                style={{
                  padding: '12px 28px',
                  backgroundColor: 'transparent',
                  color: '#A6377F',
                  border: '1.5px solid #A6377F',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                }}
              >
                Cadastrar
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Historias;
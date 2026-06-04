import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import dados from '../services/dados.json';
import '../App.css';
import '../index.css';

const Explorar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [classList, setClassList] = useState([]);

  const categories = ['Todas', 'Yoga', 'Meditação', 'Pilates solo', 'Orientação nutricional'];

  useEffect(() => {
    if (dados?.catalogo_explorar) {
      const filtered = dados.catalogo_explorar.filter(item => {
        const term = searchTerm.toLowerCase();
        const matchesText = item.nome.toLowerCase().includes(term) ||
                            item.instrutor.toLowerCase().includes(term);
        const matchesCategory = activeCategory === 'Todas' || item.categoria === activeCategory;
        return matchesText && matchesCategory;
      });
      setClassList(filtered);
    }
  }, [searchTerm, activeCategory]);

  return (
      <div className="explore-main-container">

        {/* Controls */}
        <div className="controls-wrapper">
          <h2 className="explore-title">Explorar Aulas</h2>

          <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="Busque por aula, técnica ou professor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Class cards */}
        <div className="explore-grid">
          {classList.length > 0 ? (
            classList.map(item => (
              <div key={item.id} className="course-card">

                <div className="card-image-wrapper">
                  <img src={item.imagem} alt={item.nome} />
                </div>

                <div className="card-content">
                  <div className="card-text-main">
                    <span style={{
                      color: '#A6377F',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {item.categoria}
                    </span>
                    <h4 style={{ margin: '6px 0 2px 0', fontSize: '1.2rem', color: '#2D2D2D', fontWeight: '600' }}>
                      {item.nome}
                    </h4>
                    <p style={{ color: '#777', fontSize: '0.9rem', margin: 0 }}>
                      Prof. {item.instrutor}
                    </p>
                  </div>

                  <div className="card-action-row" style={{ marginTop: 'auto' }}>
                    <span style={{ fontSize: '0.85rem', color: '#A2A63C', fontWeight: '700' }}>
                      {item.duracao}
                    </span>
                  </div>

                  <button
                    className="btn-conhecer"
                    onClick={() => navigate(`/aula/${item.id}`)}
                  >
                    Conhecer
                  </button>

                </div>

              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', background: '#FEFEFE', borderRadius: '16px', border: '1px solid #E0E0E0' }}>
              <p style={{ color: '#999', margin: 0, fontSize: '1rem' }}>
                Ops! Não encontramos nenhuma aula correspondente para os termos digitados.
              </p>
            </div>
          )}
        </div>

      </div>
  );
};

export default Explorar;
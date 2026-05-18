import React, { useState, useEffect } from 'react';
import dados from '../services/dados.json';
import '../App.css';
import '../index.css';

const Explorar = () => {
  const [busca, setBusca] = useState('');
  const [catAtiva, setCatAtiva] = useState('Todas');
  const [lista, setLista] = useState([]);

  const categorias = ['Todas', 'Yoga', 'Meditação', 'Pilates solo', 'Orientação nutricional'];

  useEffect(() => {
    if (dados && dados.catalogo_explorar) {
      const resultado = dados.catalogo_explorar.filter(item => {
        const termo = busca.toLowerCase();
        
        // Busca por nome ou instrutor
        const matchTexto = item.nome.toLowerCase().includes(termo) || 
                           item.instrutor.toLowerCase().includes(termo);
        
        // Filtro por categoria
        const matchCat = catAtiva === 'Todas' || item.categoria === catAtiva;
        
        return matchTexto && matchCat;
      });
      setLista(resultado);
    }
  }, [busca, catAtiva]);

  return (
    <div className="explore-main-container">
      
      {/*Controles*/}
      <div className="controls-wrapper">
        <h2 className="explore-title">Explorar Aulas</h2>
        
        <div className="search-container">
          <input 
            className="search-input"
            type="text" 
            placeholder="Busque por aula, técnica ou professor..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="filter-group">
          {categorias.map(c => (
            <button 
              key={c}
              className={`filter-btn ${catAtiva === c ? 'active' : ''}`}
              onClick={() => setCatAtiva(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Listagem cards*/}
      <div className="explore-grid">
        {lista.length > 0 ? (
          lista.map(item => (
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

                  <button className="btn-conhecer">
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

export default Explorar;import React, { useState, useEffect } from 'react';
import dados from '../services/dados.json';



const Explorar = () => {
    <h1 style={{color: 'red'}}>TESTE: </h1>
 
  const [busca, setBusca] = useState('');
  const [catAtiva, setCatAtiva] = useState('Todas');
  
  const [lista, setLista] = useState([]);

  const categorias = ['Todas', 'Yoga', 'Meditação', 'Pilates solo', 'Orientação nutricional'];

  useEffect(() => {
    if (dados && dados.catalogo_explorar) {
      const resultado = dados.catalogo_explorar.filter(item => {
        const termo = busca.toLowerCase();
        
        // Busca 
        const matchTexto = item.nome.toLowerCase().includes(termo) || 
                           item.instrutor.toLowerCase().includes(termo);
        
        // Filtro categoria
        const matchCat = catAtiva === 'Todas' || item.categoria === catAtiva;
        
        return matchTexto && matchCat;
      });
      
      setLista(resultado);
    }
  }, [busca, catAtiva]); 

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ textAlign: 'center', color: '#2D2D2D', marginBottom: '10px' }}>Explorar Alivvi</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Descubra a prática perfeita para o seu bem-estar</p>

      {/*Busca */}
      <div className="search-container">
        <input 
          className="search-input"
          type="text" 
          placeholder="Busque por aula, técnica ou professor..." 
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ border: '2px solid var(--alivvi-olive)' }}
        />
      </div>

      {/*Filtro */}
      <div className="filter-group">
        {categorias.map(c => (
          <button 
            key={c}
            className={`filter-btn ${catAtiva === c ? 'active' : ''}`}
            onClick={() => setCatAtiva(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="explore-grid">
        {lista.length > 0 ? (
          lista.map(item => (
            <div key={item.id} className="course-card">
              <img src={item.imagem} alt={item.nome} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <span style={{ color: '#A6377F', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {item.categoria}
                </span>
                <h4 style={{ margin: '8px 0', fontSize: '1.1rem', color: '#333' }}>{item.nome}</h4>
                <p style={{ color: '#777', fontSize: '0.85rem', marginBottom: '15px' }}>Prof. {item.instrutor}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#A2A63C', fontWeight: '700' }}>{item.duracao}</span>
                  <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Conhecer</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px' }}>
            <p style={{ color: '#999' }}>Nenhuma aula encontrada para esses filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explorar;

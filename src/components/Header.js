import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header-alivvi">

      <div style={{ color: '#A6377F', fontSize: '1.6rem', fontWeight: 'bold' }}>
        alivvi
      </div>

      <nav style={{ display: 'flex', gap: '25px' }}>
        <Link to="/" className="nav-link-main">Início</Link>
        <Link to="/explorar" className="nav-link-main">Explorar</Link>
        
      </nav>

      <div 
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#A6377F', fontWeight: '500' }}>nomeUser</span>
          <span style={{ fontSize: '1.1rem', color: '#666' }}>☰</span>
        </div>

        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item"><span>Meu perfil</span> <span style={{color: '#A6377F'}}>›</span></div>
            <div className="dropdown-item"><span>Meus resultados</span> <span style={{color: '#A6377F'}}>›</span></div>
            <div className="dropdown-item"><span>Meu histórico</span> <span style={{color: '#A6377F'}}>›</span></div>
            <div className="dropdown-item"><span>Indicações</span> <span style={{color: '#A6377F'}}>›</span></div>
            <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '5px 0' }} />
            <div className="dropdown-item" style={{ color: '#999', fontSize: '0.85rem' }}>Sair</div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logoMenu.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header-alivvi">

      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={logoImg} 
          alt="Alivvi Logo" 
          style={{ height: '50px', width: 'auto', objectFit: 'contain' }} 
        />
      </Link>

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
            <Link to="/profile" className="dropdown-item"><span>Meu perfil</span><span style={{ color: '#A6377F' }}>›</span></Link>
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

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../assets/logoMenu.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userCache = localStorage.getItem('currentUser');
    if (userCache) {
      setCurrentUser(JSON.parse(userCache));
    } else {
      setCurrentUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <header className="header-alivvi">
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={logoImg} 
          alt="Alivvi Logo" 
          style={{ height: '50px', width: 'auto', objectFit: 'contain' }} 
        />
      </Link>

      <nav style={{ display: 'flex', gap: '25px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        
        <Link to={currentUser ? "/home" : "/"} className="nav-link-main">
          Início
        </Link>
        <Link to="/explorar" className="nav-link-main">Explorar</Link>
      </nav>

      {currentUser ? (
        <div 
          style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#A6377F', fontWeight: '500' }}>{currentUser.name}</span>
            <span style={{ fontSize: '1.1rem', color: '#666' }}>☰</span>
          </div>

          {isOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item"><span>Meu perfil</span><span style={{ color: '#A6377F' }}>›</span></Link>
              
              <Link to="/minhas-reservas" className="dropdown-item" style={{ textDecoration: 'none' }}>
                <span style={{ color: '#333' }}>Minhas reservas</span> 
                <span style={{ color: '#A6377F' }}>›</span>
              </Link>
              
              <div className="dropdown-item"><span>Indicações</span> <span style={{color: '#A6377F'}}>›</span></div>
              <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '5px 0' }} />
              <div 
                className="dropdown-item" 
                onClick={handleLogout}
                style={{ color: '#999', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Sair
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Link to="/login" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Entrar</Link>
          <Link to="/register" style={{ textDecoration: 'none', color: '#A6377F', fontWeight: 'bold' }}>Cadastrar</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
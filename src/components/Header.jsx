import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../assets/logoMenu.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
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
    setIsMobileMenuOpen(false); 
  }, [location]);

  useEffect(() => {
    const atualizarNomeHeader = () => {
      const userCache = localStorage.getItem('currentUser');
      setCurrentUser(userCache ? JSON.parse(userCache) : null);
    };

    window.addEventListener('userUpdate', atualizarNomeHeader);
    
    return () => {
      window.removeEventListener('userUpdate', atualizarNomeHeader);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <header className="header-alivvi" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', position: 'relative' }}>
      <button 
        className="mobile-menu-btn" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={logoImg} 
          alt="Alivvi Logo" 
          style={{ height: '40px', width: 'auto', objectFit: 'contain' }} 
        />
      </Link>

      <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to={currentUser ? "/home" : "/"} className="nav-link-main">Início</Link>
        <Link to="/explorar" className="nav-link-main">Explorar</Link>
        <Link to="/historias" className="nav-link-main">Avaliações</Link>
      </nav>

      {currentUser ? (
        <div 
          style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="user-name-hide" style={{ color: '#a6377f', fontWeight: '500' }}>
              <span style={{ 
                maxWidth: '150px', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                display: 'inline-block',
                verticalAlign: 'bottom'
              }}>
                {currentUser.name}
              </span>
            </span>

            <span style={{ fontSize: '1.1rem', color: '#a6377f' }}>
              <i className="ri-user-line" style={{ fontSize: '1.3rem', color: '#a6377f' }}></i>
            </span>
          </div>

          {isOpen && (
            <div className="dropdown-menu" style={{ position: 'absolute', right: 0, top: '100%', background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '10px', zIndex: 100 }}>
              <Link to="/profile" className="dropdown-item" style={{ display: 'block', padding: '8px', textDecoration: 'none', color: '#333' }}>
                Meu perfil
              </Link>
              <Link to="/minhas-reservas" className="dropdown-item" style={{ display: 'block', padding: '8px', textDecoration: 'none', color: '#333' }}>
                Minhas reservas
              </Link>
              <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '5px 0' }} />
              <div 
                className="dropdown-item" 
                onClick={handleLogout}
                style={{ color: '#999', fontSize: '0.85rem', cursor: 'pointer', padding: '8px' }}
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
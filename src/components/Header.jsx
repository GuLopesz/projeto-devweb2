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

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="header-alivvi" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', position: 'relative' }}>
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
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
      </div>

      <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to={currentUser ? "/home" : "/"} className={`nav-link-main ${isActive('/home') || isActive('/')}`}>Início</Link>
        <Link to="/explorar" className={`nav-link-main ${isActive('/explorar')}`}>Explorar</Link>
        <Link to="/historias" className={`nav-link-main ${isActive('/historias')}`}>Avaliações</Link>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {currentUser ? (
          <div 
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="user-chip" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="user-name-hide" style={{ color: '#a6377f', fontWeight: '600' }}>
                <span style={{ 
                  maxWidth: '130px', 
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  display: 'inline-block',
                  verticalAlign: 'bottom'
                }}>
                  {currentUser.name}
                </span>
              </span>

              <span style={{ fontSize: '1.1rem', color: '#a6377f', display: 'flex', alignItems: 'center' }}>
                <i className="ri-user-line" style={{ fontSize: '1.3rem' }}></i>
              </span>
            </div>

            {isOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  Meu perfil
                </Link>
                <Link to="/minhas-reservas" className="dropdown-item">
                  Minhas reservas
                </Link>
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
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <Link to="/login" className="auth-link-entrar" style={{ textDecoration: 'none', fontWeight: '600' }}>Entrar</Link>
            <Link to="/register" className="auth-link-cadastrar" style={{ textDecoration: 'none', fontWeight: '600' }}>Cadastrar</Link>
          </div>
        )}
      </div>

    </header>
  );
};

export default Header;
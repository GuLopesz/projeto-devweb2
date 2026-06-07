import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logoMenu.png';
import '../styles/landing.css'; 

const Footer = () => {
  return (
    <footer className="landing-footer">
      <div className="footer-grid">
        {/*descrição */}
        <div className="footer-col-main">
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logoImg}
              alt="Alivvi Logo"
              style={{
                height: "50px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Link>
          <p className="footer-description">
            Seu espaço completo de saúde integrativa, conectando você às
            melhores práticas de bem-estar onde quer que você esteja.
          </p>
        </div>

        {/*pilares*/}
        <div className="footer-col">
          <h4>Práticas</h4>
          <ul>
            <li>
              <Link to="/explorar" state={{ category: 'Yoga' }}>Aulas de Yoga</Link>
            </li>
            <li>
              <Link to="/explorar" state={{ category: 'Meditação' }}>Meditação Guiada</Link>
            </li>
            <li>
              <Link to="/explorar" state={{ category: 'Pilates solo' }}>Pilates Solo</Link>
            </li>
            <li>
              <Link to="/explorar" state={{ category: 'Orientação nutricional' }}>Planos Alimentares</Link>
            </li>
          </ul>
        </div>

        {/*suporte */}
        <div className="footer-col">
          <h4>Comunidade</h4>
          <ul>
            <li>
              <Link to="/sobre">Quem Somos</Link>
            </li>
            <li>
              <Link to="/historias">Histórias de Sucesso</Link>
            </li>
          </ul>
        </div>

        {/*contato */}
        <div className="footer-col">
          <h4>Fale Conosco</h4>
          <div className="pillar-icon-wrapper2">
            <i className="ri-mail-line"></i>
          </div>
          <p className="footer-info">suporte@alivvi.com.br</p>
          <div className="pillar-icon-wrapper2">
            <i className="ri-phone-line"></i>
          </div>
          <p className="footer-info">(11) 99999-5555</p>
          <div className="pillar-icon-wrapper2">
            <i className="ri-map-pin-line"></i>
          </div>
          <p className="footer-info">São Paulo - SP</p>
        </div>
      </div>

      {/*direitos autorais*/}
      <div className="footer-bottom">
        <p>© 2026 Alivvi Bem-estar. Todos os direitos reservados.</p>
        <div className="footer-bottom-links">
        </div>
      </div>
    </footer>
  );
};

export default Footer;
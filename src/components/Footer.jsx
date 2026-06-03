import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logoMenu.png';
import '../styles/landing.css'; // Importando o CSS para manter os estilos originais

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

        {/*pilares */}
        <div className="footer-col">
          <h4>Práticas</h4>
          <ul>
            <li>
              <a href="#pilares">Aulas de Yoga</a>
            </li>
            <li>
              <a href="#pilares">Meditação Guiada</a>
            </li>
            <li>
              <a href="#pilares">Pilates Solo</a>
            </li>
            <li>
              <a href="#pilares">Planos Alimentares</a>
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
              <a href="#ajuda">Central de Ajuda</a>
            </li>
            <li>
              <a href="#blog">Dicas de Saúde</a>
            </li>
            <li>
              <a href="#depoimentos">Histórias de Sucesso</a>
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
          <a href="#privacidade">Termos de Serviço</a>
          <a href="#privacidade">Políticas de Privacidade</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
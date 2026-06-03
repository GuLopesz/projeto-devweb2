import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sobre = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica se o usuário está logado assim que a página carrega
  useEffect(() => {
    const userCache = localStorage.getItem('currentUser');
    if (userCache) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
      
      {/* Hero Section da Página */}
      <section style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span className="section-badge" style={{ display: 'inline-block', marginBottom: '10px' }}>Conheça a Alivvi</span>
        <h1 style={{ color: 'var(--alivvi-olive)', fontSize: '2.5rem', fontWeight: '700', margin: '0 0 20px 0' }}>
          Nossa Missão é Trazer Leveza para a Sua Rotina
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto' }}>
          A Alivvi nasceu do desejo de criar um refúgio diário de bem-estar. Acreditamos que a saúde integrativa 
          deve ser acessível, prática e acolhedora, permitindo que cada pessoa encontre seu equilíbrio sem sair de casa.
        </p>
      </section>

      {/* Nossa História */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '60px', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: '#2D2D2D', fontSize: '1.8rem', marginBottom: '15px', fontWeight: '600' }}>
            Como tudo começou:
          </h2>
          <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '15px', textAlign: 'justify'}}>
            Em um mundo cada vez mais acelerado, percebemos que o estresse, a ansiedade diária e a falta de tempo 
            estavam afastando as pessoas do autocuidado básico. Cuidar da mente e do corpo virou um challenge complexo.
          </p>
          <p style={{ color: '#555', lineHeight: '1.6', textAlign: 'justify'}}>
            Foi assim que idealizamos a <strong>Alivvi</strong>: uma plataforma unificada que conecta profissionais 
            capacitados a pessoas que buscam constância e qualidade de vida. Combinamos práticas corporais e mentais 
            para oferecer um acompanhamento humanizado e adaptável ao ritmo de cada um.
          </p>
        </div>
        <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80" 
            alt="Prática de bem-estar Alivvi" 
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', marginBottom: '60px' }}>
        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '20px', border: '1px solid #EAEAEA' }}>
          <h3 style={{ color: '#2D2D2D', margin: '0 0 10px 0', fontSize: '1.25rem', textAlign: 'center'}}>Missão</h3>
          <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5', margin: 0, textAlign: 'justify'}}>
            Democratizar o acesso à saúde integrativa, promovendo bem-estar físico e mental por meio de ferramentas práticas e personalizadas.
          </p>
        </div>

        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '20px', border: '1px solid #EAEAEA' }}>
          <h3 style={{ color: '#2D2D2D', margin: '0 0 10px 0', fontSize: '1.25rem', textAlign: 'center'}}>Visão</h3>
          <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5', margin: 0, textAlign: 'justify'}}>
            Ser a principal plataforma de acolhimento e transformação em hábitos saudáveis, reconhecida pela leveza e respeito à individualidade.
          </p>
        </div>

        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '20px', border: '1px solid #EAEAEA' }}>
          <h3 style={{ color: '#2D2D2D', margin: '0 0 10px 0', fontSize: '1.25rem', textAlign: 'center'}}>Valores</h3>
          <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5', margin: 0, textAlign: 'justify'}}>
            Acolhimento humanizado, equilíbrio integral, constância sem neuras, inovação acessível e transparência com a nossa comunidade.
          </p>
        </div>
      </section>

      {/* CTA Final Dinâmico */}
      <section style={{ 
        background: 'var(--alivvi-olive)', color: 'white', padding: '40px 30px', 
        borderRadius: '24px', textAlign: 'center', boxShadow: '0 10px 25px rgba(162, 166, 60, 0.25)' 
      }}>
        <h2>
          {isLoggedIn ? "Que bom ver você evoluindo na sua jornada!" : "Pronto para começar a sua transformação?"}
        </h2>
        <p style={{ margin: '0 0 25px 0', opacity: 0.9, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          {isLoggedIn 
            ? "Aproveite para acessar o seu painel de controle e agendar as suas próximas práticas e consultas." 
            : "Faça parte da nossa comunidade e experimente uma nova forma de cuidar de si, respeitando o seu tempo."}
        </p>
        
        {isLoggedIn ? (
          <Link 
            to="/home" 
            className="btn-primary" 
            style={{ backgroundColor: 'var(--alivvi-purple)', textDecoration: 'none', display: 'inline-block', padding: '12px 30px' }}
          >
            Meu Painel
          </Link>
        ) : (
          <Link 
            to="/register" 
            className="btn-primary" 
            style={{ backgroundColor: 'var(--alivvi-purple)', textDecoration: 'none', display: 'inline-block', padding: '12px 30px' }}
          >
            Cadastre-se Gratuitamente
          </Link>
        )}
      </section>

    </div>
  );
};

export default Sobre;
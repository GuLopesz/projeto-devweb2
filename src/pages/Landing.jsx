import React from "react";
import "../styles/landing.css";

const Landing = () => {
  return (
    <div className="l">
      <div className="home-container">
        {/* 1 SEÇÃO */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">O seu refúgio diário de bem-estar</h1>
            <p className="hero-subtitle">
              Encontre o seu equilíbrio sem sair de casa. A Alivvi combina Yoga,
              Meditação, Pilates solo e Orientação Nutricional em um único lugar
              para transformar a sua mente e o seu corpo.
            </p>
            <a href="#planos" className="btn-hero-cta">
              Descubra sua prática
            </a>
          </div>
        </section>

        {/* 2 SEÇÃO*/}
        <section className="context-section">
          <div className="section-grid">
            <div className="context-text">
              <span className="section-badge">Sua Rotina com Mais Leveza</span>
              <h2 className="section-title">
                Desconecte do estresse, reconecte com você
              </h2>
              <p>
                Sabemos o quão corrida a vida pode ser. O acúmulo de tarefas, a
                ansiedade diária e a falta de tempo muitas vezes nos afastam do
                autocuidado.
              </p>
              <p>
                A <strong>Alivvi</strong> foi feita para ser o seu momento do
                dia. Com aulas dinâmicas e acompanhamento humanizado, ajudamos
                você a construir hábitos saudáveis de forma leve, respeitando o
                seu próprio ritmo e tempo.
              </p>
            </div>
            <div className="context-image">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80"
                alt="Pessoa praticando yoga em casa com tranquilidade"
              />
            </div>
          </div>
        </section>

        {/*PILARES */}
        <section className="pillars-section">
          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-wrapper">
                <i className="ri-rest-time-line"></i>
              </div>
              <h3>Yoga</h3>
              <p>
                Aumente sua flexibilidade, alivie as dores nas costas e aprenda
                técnicas de respiração.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrapper">
                <i className="ri-mental-health-line"></i>
              </div>
              <h3>Meditação</h3>
              <p>
                Práticas guiadas simples de mindfulness para reduzir a ansiedade
                e dormir melhor.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrapper">
                <i className="ri-body-scan-line"></i>
              </div>
              <h3>Pilates Solo</h3>
              <p>
                Fortaleça a musculatura do corpo, melhore a sua postura e ganhe
                mais disposição.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrapper">
                <i className="ri-apple-line"></i>
              </div>
              <h3>Nutrição</h3>
              <p>
                Orientações alimentares sem neuras para uma vida cheia de
                energia e imunidade alta.
              </p>
            </div>
          </div>
        </section>

        {/*METRICAS*/}
        <section className="metrics-section">
          <div className="section-grid">
            <div className="metrics-numbers">
              <div className="metric-box">
                <span className="metric-big">8 sem.</span>
                <p>
                  para sentir uma redução significativa nos níveis de ansiedade
                  e insônia.
                </p>
              </div>
              <div className="metric-box accent">
                <span className="metric-big">+100</span>
                <p>
                  aulas gravadas e ao vivo guiadas por profissionais
                  acolhedores.
                </p>
              </div>
            </div>
            <div className="metrics-text">
              <span className="section-badge">Sua Jornada Evolutiva</span>
              <h2 className="section-title">
                Sinta a transformação no seu bem-estar
              </h2>
              <p>
                Nossa metodologia foi desenhada por especialistas para que você
                crie constância. Não importa se você tem 15 minutos ou uma hora
                livre, a plataforma se adapta à sua rotina.
              </p>
              <p>
                Acompanhe a evolução do seu bem-estar através do seu painel
                exclusivo, trace metas e tenha o suporte de profissionais
                capacitados para te guiar a cada passo.
              </p>
            </div>
          </div>
        </section>

        {/*PLANOS*/}
        <section id="planos" className="cta-section">
          <div className="cta-box">
            <h2>Comece a cuidar de você hoje mesmo</h2>
            <p>
              Escolha o primeiro passo para a sua transformação. Cadastre-se
              para receber um período de teste gratuito nas nossas aulas
              presenciais ou online.
            </p>

            <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Seu nome completo" required />
              <input type="email" placeholder="Seu melhor e-mail" required />
              <select required defaultValue="">
                <option value="" disabled>
                  Qual o seu principal objetivo?
                </option>
                <option value="estresse">Reduzir estresse e ansiedade</option>
                <option value="postura">
                  Melhorar postura e dores físicas
                </option>
                <option value="alimentacao">
                  Ter uma alimentação mais saudável
                </option>
                <option value="todos">Todos os anteriores</option>
              </select>
              <button type="submit" className="btn-submit">
                Garantir Meu Teste Gratuito
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
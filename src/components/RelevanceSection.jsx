import React from 'react';
import { motion } from 'framer-motion';

const RelevanceSection = () => {
  const connections = [
    {
      concept: 'Evolução',
      ais: 'Seleção clonal e hipermutação',
      ga: 'Seleção natural e mutação',
      description: 'Ambos utilizam princípios evolutivos para otimizar soluções',
      icon: '🧬',
      color: '#00D4FF'
    },
    {
      concept: 'Diversidade',
      ais: 'Hipermutação somática',
      ga: 'Crossover e mutação',
      description: 'Mantêm diversidade populacional para explorar o espaço de soluções',
      icon: '🌈',
      color: '#4ECDC4'
    },
    {
      concept: 'Seleção',
      ais: 'Afinidade antígeno-anticorpo',
      ga: 'Função de fitness',
      description: 'Critérios de qualidade guiam a evolução das populações',
      icon: '⭐',
      color: '#00FF88'
    },
    {
      concept: 'Memória',
      ais: 'Células de memória',
      ga: 'Elitismo',
      description: 'Preservam as melhores soluções encontradas',
      icon: '🧠',
      color: '#8B5CF6'
    }
  ];

  const applications = [
    {
      area: 'Engenharia de Software',
      ais_uses: ['Detecção de bugs', 'Análise de código', 'Teste automatizado'],
      ga_uses: ['Otimização de código', 'Geração de casos de teste', 'Arquitetura de software'],
      synergy: 'Combinação para sistemas de qualidade completos',
      icon: '💻',
      color: '#00D4FF'
    },
    {
      area: 'Segurança Cibernética',
      ais_uses: ['Detecção de intrusão', 'Análise de malware', 'Monitoramento de rede'],
      ga_uses: ['Otimização de firewalls', 'Geração de senhas', 'Configuração de segurança'],
      synergy: 'Sistemas de defesa adaptativos e inteligentes',
      icon: '🛡️',
      color: '#FF6B35'
    },
    {
      area: 'Otimização',
      ais_uses: ['Problemas multiobjetivo', 'Otimização dinâmica', 'Busca local'],
      ga_uses: ['Busca global', 'Problemas combinatoriais', 'Otimização contínua'],
      synergy: 'Algoritmos híbridos com melhor performance',
      icon: '⚡',
      color: '#4ECDC4'
    }
  ];

  const timeline = [
    {
      year: '1975',
      event: 'Teoria da Seleção Clonal',
      description: 'Jerne propõe a base teórica dos sistemas imunológicos',
      type: 'ais'
    },
    {
      year: '1975',
      event: 'Algoritmos Genéticos',
      description: 'Holland formaliza os algoritmos genéticos',
      type: 'ga'
    },
    {
      year: '1990',
      event: 'Primeiros AIS',
      description: 'Implementações práticas de sistemas imunológicos artificiais',
      type: 'ais'
    },
    {
      year: '1995',
      event: 'AIS para Otimização',
      description: 'Aplicação de AIS em problemas de otimização',
      type: 'both'
    },
    {
      year: '2000',
      event: 'Algoritmos Híbridos',
      description: 'Combinação de AIS e GA para problemas complexos',
      type: 'both'
    },
    {
      year: '2010',
      event: 'AIS em Software',
      description: 'Aplicação massiva em engenharia de software',
      type: 'ais'
    },
    {
      year: '2020',
      event: 'IA e Bioinspiração',
      description: 'Integração com machine learning e deep learning',
      type: 'both'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="relevance-section">
      <div className="relevance-container">
        {/* Header */}
        <motion.div 
          className="relevance-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Relevância para Algoritmos Genéticos</h2>
          <p className="section-subtitle">
            Explorando as conexões profundas entre Sistemas Imunológicos Artificiais e Computação Evolutiva
          </p>
        </motion.div>

        {/* Conexões conceituais */}
        <motion.div 
          className="connections-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="subsection-title">Princípios Compartilhados</h3>
          
          <div className="connections-grid">
            {connections.map((connection, index) => (
              <motion.div
                key={index}
                className="connection-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                style={{ '--accent-color': connection.color }}
              >
                <div className="connection-header">
                  <div className="connection-icon" style={{ color: connection.color }}>
                    {connection.icon}
                  </div>
                  <h4 className="connection-concept">{connection.concept}</h4>
                </div>
                
                <div className="connection-comparison">
                  <div className="comparison-side ais">
                    <h5>AIS</h5>
                    <p>{connection.ais}</p>
                  </div>
                  
                  <div className="comparison-arrow">
                    <motion.div 
                      className="arrow"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⟷
                    </motion.div>
                  </div>
                  
                  <div className="comparison-side ga">
                    <h5>GA</h5>
                    <p>{connection.ga}</p>
                  </div>
                </div>
                
                <p className="connection-description">{connection.description}</p>
                
                <div className="card-glow" style={{ backgroundColor: connection.color }}></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Aplicações práticas */}
        <motion.div 
          className="applications-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="subsection-title">Aplicações Complementares</h3>
          
          <div className="applications-grid">
            {applications.map((app, index) => (
              <motion.div
                key={index}
                className="application-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                style={{ '--accent-color': app.color }}
              >
                <div className="app-header">
                  <div className="app-icon" style={{ color: app.color }}>
                    {app.icon}
                  </div>
                  <h4 className="app-title">{app.area}</h4>
                </div>
                
                <div className="app-content">
                  <div className="app-uses">
                    <div className="uses-section">
                      <h5 className="uses-title ais-title">AIS</h5>
                      <ul className="uses-list">
                        {app.ais_uses.map((use, i) => (
                          <li key={i}>{use}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="uses-section">
                      <h5 className="uses-title ga-title">GA</h5>
                      <ul className="uses-list">
                        {app.ga_uses.map((use, i) => (
                          <li key={i}>{use}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="synergy-section">
                    <h5 className="synergy-title">Sinergia</h5>
                    <p className="synergy-text">{app.synergy}</p>
                  </div>
                </div>
                
                <div className="app-glow" style={{ backgroundColor: app.color }}></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline histórica */}
        <motion.div 
          className="timeline-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="subsection-title">Evolução Histórica</h3>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`timeline-item ${item.type}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="timeline-marker">
                  <span className="timeline-year">{item.year}</span>
                </div>
                
                <div className="timeline-content">
                  <h4 className="timeline-event">{item.event}</h4>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Futuro da área */}
        <motion.div 
          className="future-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h3 className="subsection-title">Direções Futuras</h3>
          
          <div className="future-content">
            <div className="future-trends">
              <div className="trend-item">
                <div className="trend-icon">🤖</div>
                <h4>IA Híbrida</h4>
                <p>Integração com deep learning e redes neurais para sistemas mais inteligentes</p>
              </div>
              
              <div className="trend-item">
                <div className="trend-icon">🌐</div>
                <h4>Computação Distribuída</h4>
                <p>AIS e GA em ambientes de nuvem e edge computing para escalabilidade</p>
              </div>
              
              <div className="trend-item">
                <div className="trend-icon">🔬</div>
                <h4>Bioinspiração Avançada</h4>
                <p>Novos modelos baseados em descobertas recentes da imunologia</p>
              </div>
              
              <div className="trend-item">
                <div className="trend-icon">🎯</div>
                <h4>Aplicações Específicas</h4>
                <p>Soluções especializadas para IoT, blockchain e computação quântica</p>
              </div>
            </div>
            
            <div className="future-vision">
              <h4 className="vision-title">Visão 2030</h4>
              <p className="vision-text">
                A convergência entre AIS e GA promete revolucionar a computação bioinspirada, 
                criando sistemas adaptativos que combinam a robustez imunológica com a 
                eficiência evolutiva, resultando em soluções mais inteligentes e resilientes 
                para os desafios computacionais do futuro.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .relevance-section {
          padding: 4rem 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(10, 22, 40, 0.9));
          border-radius: 24px;
          margin: 2rem 0;
          position: relative;
          overflow: hidden;
        }

        .relevance-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .relevance-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-family: 'Orbitron', monospace;
          font-size: 2.5rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 1rem;
          text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: #E2E8F0;
          max-width: 700px;
          margin: 0 auto;
        }

        .subsection-title {
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          color: #8B5CF6;
          text-align: center;
          margin-bottom: 3rem;
          text-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
        }

        .connections-section {
          margin-bottom: 5rem;
        }

        .connections-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }

        .connection-card {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.4s ease;
          cursor: pointer;
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .connection-card:hover {
          border-color: var(--accent-color);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .connection-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .connection-icon {
          font-size: 2.5rem;
          filter: drop-shadow(0 0 15px currentColor);
        }

        .connection-concept {
          font-family: 'Orbitron', monospace;
          font-size: 1.3rem;
          color: #FFFFFF;
          margin: 0;
        }

        .connection-comparison {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .comparison-side {
          padding: 1rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          text-align: center;
        }

        .comparison-side.ais {
          border-left: 3px solid #00D4FF;
        }

        .comparison-side.ga {
          border-left: 3px solid #FF6B35;
        }

        .comparison-side h5 {
          font-family: 'Orbitron', monospace;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          color: #4ECDC4;
        }

        .comparison-side p {
          font-size: 0.85rem;
          color: #E2E8F0;
          line-height: 1.4;
        }

        .comparison-arrow {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .arrow {
          font-size: 1.5rem;
          color: var(--accent-color);
          filter: drop-shadow(0 0 10px currentColor);
        }

        .connection-description {
          color: #E2E8F0;
          font-size: 0.95rem;
          line-height: 1.6;
          text-align: center;
          font-style: italic;
        }

        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          filter: blur(30px);
          border-radius: 20px;
          z-index: -1;
          transition: opacity 0.4s ease;
        }

        .connection-card:hover .card-glow {
          opacity: 0.1;
        }

        .applications-section {
          margin-bottom: 5rem;
        }

        .applications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 2rem;
        }

        .application-card {
          position: relative;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.4s ease;
          overflow: hidden;
        }

        .application-card:hover {
          border-color: var(--accent-color);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .app-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .app-icon {
          font-size: 2.5rem;
          filter: drop-shadow(0 0 15px currentColor);
        }

        .app-title {
          font-family: 'Orbitron', monospace;
          font-size: 1.3rem;
          color: #FFFFFF;
          margin: 0;
        }

        .app-uses {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .uses-section {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 12px;
        }

        .uses-title {
          font-family: 'Orbitron', monospace;
          font-size: 1rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .uses-title.ais-title {
          color: #00D4FF;
        }

        .uses-title.ga-title {
          color: #FF6B35;
        }

        .uses-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .uses-list li {
          color: #E2E8F0;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          position: relative;
        }

        .uses-list li::before {
          content: '▶';
          position: absolute;
          left: 0;
          color: var(--accent-color);
          font-size: 0.7rem;
        }

        .synergy-section {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }

        .synergy-title {
          font-family: 'Orbitron', monospace;
          color: #8B5CF6;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .synergy-text {
          color: #E2E8F0;
          font-size: 0.9rem;
          line-height: 1.5;
          font-style: italic;
        }

        .app-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          filter: blur(30px);
          border-radius: 20px;
          z-index: -1;
          transition: opacity 0.4s ease;
        }

        .application-card:hover .app-glow {
          opacity: 0.1;
        }

        .timeline-section {
          margin-bottom: 5rem;
        }

        .timeline-container {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #00D4FF, #8B5CF6, #FF6B35);
          transform: translateX(-50%);
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }

        .timeline-item {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 3rem;
          transition: all 0.3s ease;
        }

        .timeline-item:nth-child(even) {
          flex-direction: row-reverse;
        }

        .timeline-item:nth-child(even) .timeline-content {
          text-align: right;
        }

        .timeline-marker {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 80px;
          background: rgba(0, 0, 0, 0.8);
          border: 3px solid #8B5CF6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
        }

        .timeline-year {
          font-family: 'Orbitron', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: #8B5CF6;
        }

        .timeline-content {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          margin: 0 3rem;
          transition: all 0.3s ease;
        }

        .timeline-item:hover .timeline-content {
          border-color: #8B5CF6;
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.2);
        }

        .timeline-event {
          font-family: 'Orbitron', monospace;
          font-size: 1.1rem;
          color: #8B5CF6;
          margin-bottom: 0.75rem;
        }

        .timeline-description {
          color: #E2E8F0;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .timeline-item.ais .timeline-marker {
          border-color: #00D4FF;
        }

        .timeline-item.ga .timeline-marker {
          border-color: #FF6B35;
        }

        .timeline-item.both .timeline-marker {
          border: 3px solid transparent;
          background: linear-gradient(135deg, #00D4FF, #FF6B35);
          background-clip: padding-box;
        }

        .future-section {
          background: rgba(139, 92, 246, 0.1);
          border: 2px solid rgba(139, 92, 246, 0.3);
          border-radius: 20px;
          padding: 3rem;
        }

        .future-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .future-trends {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .trend-item {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .trend-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.2);
        }

        .trend-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 10px #8B5CF6);
        }

        .trend-item h4 {
          font-family: 'Orbitron', monospace;
          color: #8B5CF6;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .trend-item p {
          color: #E2E8F0;
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .future-vision {
          background: rgba(0, 0, 0, 0.4);
          border-radius: 16px;
          padding: 2rem;
          border-left: 4px solid #8B5CF6;
        }

        .vision-title {
          font-family: 'Orbitron', monospace;
          color: #8B5CF6;
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .vision-text {
          color: #E2E8F0;
          line-height: 1.7;
          font-size: 0.95rem;
          text-align: justify;
        }

        @media (max-width: 768px) {
          .connections-grid {
            grid-template-columns: 1fr;
          }

          .applications-grid {
            grid-template-columns: 1fr;
          }

          .app-uses {
            grid-template-columns: 1fr;
          }

          .timeline-line {
            left: 30px;
          }

          .timeline-item {
            flex-direction: row !important;
            padding-left: 80px;
          }

          .timeline-item .timeline-content {
            text-align: left !important;
            margin: 0 0 0 1rem;
          }

          .timeline-marker {
            left: 30px !important;
            transform: none !important;
            width: 60px;
            height: 60px;
          }

          .future-content {
            grid-template-columns: 1fr;
          }

          .future-trends {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 2rem;
          }

          .subsection-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default RelevanceSection;


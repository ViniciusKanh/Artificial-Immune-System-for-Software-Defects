import React from 'react';
import { motion } from 'framer-motion';

const ConceptsSection = () => {
  const concepts = [
    {
      id: 'cin',
      title: 'Computação Inspirada pela Natureza',
      icon: '🌿',
      description: 'Campo interdisciplinar que desenvolve algoritmos baseados em processos naturais como evolução, comportamento de enxames e sistemas imunológicos.',
      details: [
        'Algoritmos Genéticos e Evolutivos',
        'Otimização por Enxame de Partículas',
        'Redes Neurais Artificiais',
        'Sistemas Imunológicos Artificiais'
      ],
      color: '#00FF88'
    },
    {
      id: 'biological',
      title: 'Sistema Imunológico Biológico',
      icon: '🦠',
      description: 'Mecanismo de defesa natural que protege organismos contra patógenos através de reconhecimento, memória e resposta adaptativa.',
      details: [
        'Reconhecimento de antígenos',
        'Produção de anticorpos específicos',
        'Memória imunológica',
        'Resposta adaptativa e evolução'
      ],
      color: '#4ECDC4'
    },
    {
      id: 'ais',
      title: 'Mecanismos do AIS',
      icon: '⚙️',
      description: 'Algoritmos que simulam processos imunológicos para resolver problemas de classificação, detecção de anomalias e otimização.',
      details: [
        'Seleção clonal e hipermutação',
        'Teoria da seleção negativa',
        'Redes imunológicas artificiais',
        'Algoritmos de maturação de afinidade'
      ],
      color: '#8B5CF6'
    },
    {
      id: 'defects',
      title: 'Detecção de Defeitos',
      icon: '🐛',
      description: 'Aplicação do AIS para identificar bugs, vulnerabilidades e anomalias em código-fonte através de padrões aprendidos.',
      details: [
        'Análise estática de código',
        'Detecção de padrões anômalos',
        'Classificação de severidade',
        'Evolução contínua dos detectores'
      ],
      color: '#FF6B35'
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="concepts-section">
      <div className="concepts-container">
        {/* Header */}
        <motion.div 
          className="concepts-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Conceitos Fundamentais</h2>
          <p className="section-subtitle">
            Compreenda os pilares teóricos que sustentam o Sistema Imunológico Artificial
          </p>
        </motion.div>

        {/* Grid de conceitos */}
        <motion.div 
          className="concepts-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {concepts.map((concept) => (
            <motion.div
              key={concept.id}
              className="concept-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              style={{
                '--accent-color': concept.color
              }}
            >
              <div className="card-header">
                <div className="concept-icon" style={{ color: concept.color }}>
                  {concept.icon}
                </div>
                <h3 className="concept-title">{concept.title}</h3>
              </div>
              
              <p className="concept-description">{concept.description}</p>
              
              <div className="concept-details">
                <h4>Características principais:</h4>
                <ul className="details-list">
                  {concept.details.map((detail, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="detail-bullet" style={{ color: concept.color }}>▶</span>
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="card-glow" style={{ backgroundColor: concept.color }}></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparação Biológico vs Artificial */}
        <motion.div 
          className="comparison-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="comparison-title">Sistema Biológico vs Artificial</h3>
          
          <div className="comparison-container">
            <div className="comparison-side biological">
              <div className="side-header">
                <div className="side-icon">🧬</div>
                <h4>Sistema Biológico</h4>
              </div>
              <div className="comparison-items">
                <div className="comparison-item">
                  <span className="item-label">Antígenos</span>
                  <span className="item-value">Vírus, bactérias, toxinas</span>
                </div>
                <div className="comparison-item">
                  <span className="item-label">Anticorpos</span>
                  <span className="item-value">Proteínas Y específicas</span>
                </div>
                <div className="comparison-item">
                  <span className="item-label">Reconhecimento</span>
                  <span className="item-value">Ligação antígeno-anticorpo</span>
                </div>
                <div className="comparison-item">
                  <span className="item-label">Evolução</span>
                  <span className="item-value">Mutação somática</span>
                </div>
                <div className="comparison-item">
                  <span className="item-label">Memória</span>
                  <span className="item-value">Células B de memória</span>
                </div>
              </div>
            </div>

            <div className="comparison-arrow">
              <motion.div 
                className="arrow-icon"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⟷
              </motion.div>
            </div>

            <div className="comparison-side artificial">
              <div className="side-header">
                <div className="side-icon">🤖</div>
                <h4>Sistema Artificial</h4>
              </div>
              <div className="comparison-items">
                <div className="comparison-item">
                  <span className="item-label">Antígenos</span>
                  <span className="item-value">Defeitos de software, bugs</span>
                </div>
                <div className="comparison-item">
                  <span className="item-label">Anticorpos</span>
                  <span className="item-value">Detectores artificiais</span>
                </div>
                <div className="comparison-item">
                  <span className="item-label">Reconhecimento</span>
                  <span className="item-value">Função de afinidade</span>
                </div>
                <div className="comparison-item">
                  <span className="item-label">Evolução</span>
                  <span className="item-value">Algoritmos genéticos</span>
                </div>
                <div className="comparison-item">
                  <span className="item-label">Memória</span>
                  <span className="item-value">Base de detectores</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fluxo do processo */}
        <motion.div 
          className="process-flow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="flow-title">Fluxo do Processo AIS</h3>
          
          <div className="flow-container">
            {[
              { step: 1, title: 'Inicialização', desc: 'Geração aleatória de detectores', icon: '🎲' },
              { step: 2, title: 'Exposição', desc: 'Apresentação dos antígenos', icon: '👁️' },
              { step: 3, title: 'Reconhecimento', desc: 'Cálculo de afinidade', icon: '🔍' },
              { step: 4, title: 'Seleção', desc: 'Escolha dos melhores', icon: '⭐' },
              { step: 5, title: 'Clonagem', desc: 'Reprodução proporcional', icon: '🧬' },
              { step: 6, title: 'Mutação', desc: 'Diversificação genética', icon: '🔄' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="flow-step"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="step-number">{item.step}</div>
                <div className="step-icon">{item.icon}</div>
                <h4 className="step-title">{item.title}</h4>
                <p className="step-description">{item.desc}</p>
                
                {index < 5 && (
                  <motion.div 
                    className="flow-arrow"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .concepts-section {
          padding: 4rem 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(10, 22, 40, 0.9));
          border-radius: 24px;
          margin: 2rem 0;
          position: relative;
          overflow: hidden;
        }

        .concepts-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .concepts-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-family: 'Orbitron', monospace;
          font-size: 2.5rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 1rem;
          text-shadow: 0 0 20px rgba(78, 205, 196, 0.5);
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: #E2E8F0;
          max-width: 600px;
          margin: 0 auto;
        }

        .concepts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .concept-card {
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

        .concept-card:hover {
          border-color: var(--accent-color);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .concept-icon {
          font-size: 3rem;
          filter: drop-shadow(0 0 15px currentColor);
        }

        .concept-title {
          font-family: 'Orbitron', monospace;
          font-size: 1.3rem;
          font-weight: 600;
          color: #FFFFFF;
          margin: 0;
        }

        .concept-description {
          color: #E2E8F0;
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .concept-details h4 {
          color: var(--accent-color);
          font-size: 1rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .details-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .details-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #E2E8F0;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .detail-bullet {
          font-size: 0.8rem;
          filter: drop-shadow(0 0 5px currentColor);
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

        .concept-card:hover .card-glow {
          opacity: 0.1;
        }

        .comparison-section {
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(78, 205, 196, 0.3);
          border-radius: 20px;
          padding: 3rem;
          margin-bottom: 4rem;
        }

        .comparison-title {
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          color: #4ECDC4;
          text-align: center;
          margin-bottom: 3rem;
          text-shadow: 0 0 15px rgba(78, 205, 196, 0.5);
        }

        .comparison-container {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 2rem;
          align-items: center;
        }

        .comparison-side {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .comparison-side.biological {
          border-left: 4px solid #00FF88;
        }

        .comparison-side.artificial {
          border-left: 4px solid #00D4FF;
        }

        .side-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .side-icon {
          font-size: 2rem;
          filter: drop-shadow(0 0 10px currentColor);
        }

        .side-header h4 {
          font-family: 'Orbitron', monospace;
          font-size: 1.3rem;
          color: #FFFFFF;
          margin: 0;
        }

        .comparison-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .comparison-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          border-left: 3px solid rgba(255, 255, 255, 0.2);
        }

        .item-label {
          font-weight: 600;
          color: #4ECDC4;
          font-size: 0.9rem;
        }

        .item-value {
          color: #E2E8F0;
          font-size: 0.9rem;
          text-align: right;
          max-width: 60%;
        }

        .comparison-arrow {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .arrow-icon {
          font-size: 3rem;
          color: #4ECDC4;
          filter: drop-shadow(0 0 15px rgba(78, 205, 196, 0.5));
        }

        .process-flow {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .flow-title {
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          color: #00D4FF;
          text-align: center;
          margin-bottom: 3rem;
          text-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
        }

        .flow-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          position: relative;
        }

        .flow-step {
          position: relative;
          text-align: center;
          padding: 2rem 1rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 16px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .flow-step:hover {
          border-color: #00D4FF;
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 212, 255, 0.2);
        }

        .step-number {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #00D4FF, #4ECDC4);
          color: #0A1628;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .step-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 10px currentColor);
        }

        .step-title {
          font-family: 'Orbitron', monospace;
          font-size: 1.1rem;
          color: #00D4FF;
          margin-bottom: 0.5rem;
        }

        .step-description {
          color: #E2E8F0;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .flow-arrow {
          position: absolute;
          top: 50%;
          right: -20px;
          transform: translateY(-50%);
          font-size: 1.5rem;
          color: #4ECDC4;
          z-index: 10;
        }

        @media (max-width: 768px) {
          .concepts-grid {
            grid-template-columns: 1fr;
          }

          .comparison-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .comparison-arrow {
            transform: rotate(90deg);
          }

          .flow-container {
            grid-template-columns: 1fr;
          }

          .flow-arrow {
            display: none;
          }

          .section-title {
            font-size: 2rem;
          }

          .comparison-title,
          .flow-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ConceptsSection;


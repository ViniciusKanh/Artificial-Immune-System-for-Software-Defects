import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Sistema Imunológico Artificial';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Título principal com efeito de digitação */}
          <motion.div className="hero-title-container" variants={itemVariants}>
            <h1 className="hero-title">
              <span className="typed-text">{typedText}</span>
              <span className="cursor">|</span>
            </h1>
            <div className="title-glow"></div>
          </motion.div>

          {/* Subtítulo */}
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Revolucionando a detecção de defeitos de software através de 
            <span className="highlight"> algoritmos bioinspirados</span> e 
            <span className="highlight"> inteligência artificial</span>
          </motion.p>

          {/* Métricas destacadas */}
          <motion.div className="hero-metrics" variants={itemVariants}>
            <div className="metric-card">
              <div className="metric-icon">🎯</div>
              <div className="metric-content">
                <span className="metric-value">99.87%</span>
                <span className="metric-label">Precisão</span>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">⚡</div>
              <div className="metric-content">
                <span className="metric-value">10x</span>
                <span className="metric-label">Mais Rápido</span>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">🧬</div>
              <div className="metric-content">
                <span className="metric-value">Bio</span>
                <span className="metric-label">Inspirado</span>
              </div>
            </div>
          </motion.div>

          {/* Botões de ação */}
          <motion.div className="hero-actions" variants={itemVariants}>
            <button className="cta-primary">
              <span>Explorar Simulação</span>
              <div className="button-glow"></div>
            </button>
            <button className="cta-secondary">
              <span>Ver Código</span>
            </button>
          </motion.div>

          {/* Indicadores de tecnologia */}
          <motion.div className="tech-stack" variants={itemVariants}>
            <div className="tech-item">
              <span className="tech-icon">⚛️</span>
              <span className="tech-name">React</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🔬</span>
              <span className="tech-name">Machine Learning</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🧪</span>
              <span className="tech-name">Algoritmos Genéticos</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">📊</span>
              <span className="tech-name">Data Visualization</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Visualização 3D do lado direito */}
        <motion.div 
          className="hero-visualization"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="dna-helix-large">
            <div className="helix-strand-large"></div>
            <div className="helix-strand-large"></div>
            <div className="helix-particles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="particle" style={{
                  animationDelay: `${i * 0.1}s`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`
                }}></div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .hero-section {
          min-height: 90vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 4rem 0;
        }

        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-content {
          z-index: 10;
        }

        .hero-title-container {
          position: relative;
          margin-bottom: 2rem;
        }

        .hero-title {
          font-family: 'Orbitron', monospace;
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          color: #FFFFFF;
          margin: 0;
          position: relative;
        }

        .typed-text {
          background: linear-gradient(135deg, #00D4FF, #4ECDC4, #00FF88);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }

        .cursor {
          color: #00D4FF;
          animation: blink 1s infinite;
        }

        .title-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #00D4FF, #4ECDC4);
          filter: blur(20px);
          opacity: 0.3;
          z-index: -1;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          line-height: 1.6;
          color: #E2E8F0;
          margin-bottom: 3rem;
          max-width: 600px;
        }

        .highlight {
          color: #4ECDC4;
          font-weight: 600;
          text-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
        }

        .hero-metrics {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .metric-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          transform: translateY(-5px);
          border-color: #00D4FF;
          box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
        }

        .metric-icon {
          font-size: 2rem;
          filter: drop-shadow(0 0 10px currentColor);
        }

        .metric-value {
          display: block;
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: #00D4FF;
          text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
        }

        .metric-label {
          display: block;
          font-size: 0.9rem;
          color: #E2E8F0;
          margin-top: 0.25rem;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .cta-primary {
          position: relative;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #00D4FF, #4ECDC4);
          border: none;
          border-radius: 12px;
          color: #0A1628;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0, 212, 255, 0.4);
        }

        .button-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .cta-primary:hover .button-glow {
          left: 100%;
        }

        .cta-secondary {
          padding: 1rem 2rem;
          background: transparent;
          border: 2px solid #00D4FF;
          border-radius: 12px;
          color: #00D4FF;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-secondary:hover {
          background: rgba(0, 212, 255, 0.1);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 212, 255, 0.2);
        }

        .tech-stack {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .tech-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .tech-item:hover {
          border-color: #4ECDC4;
          background: rgba(78, 205, 196, 0.1);
          transform: scale(1.05);
        }

        .tech-icon {
          font-size: 1.2rem;
        }

        .tech-name {
          font-size: 0.9rem;
          color: #E2E8F0;
          font-weight: 500;
        }

        .hero-visualization {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 500px;
          position: relative;
        }

        .dna-helix-large {
          position: relative;
          width: 200px;
          height: 400px;
        }

        .helix-strand-large {
          position: absolute;
          width: 8px;
          height: 100%;
          background: linear-gradient(180deg, #00D4FF, #4ECDC4, #00FF88);
          border-radius: 4px;
          animation: helix-rotate-large 4s linear infinite;
        }

        .helix-strand-large:nth-child(1) {
          left: 50px;
          animation-delay: 0s;
        }

        .helix-strand-large:nth-child(2) {
          right: 50px;
          animation-delay: 2s;
        }

        .helix-particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00D4FF;
          border-radius: 50%;
          animation: particle-float 3s ease-in-out infinite;
          box-shadow: 0 0 10px #00D4FF;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes helix-rotate-large {
          0% { transform: rotateY(0deg) translateZ(50px); }
          100% { transform: rotateY(360deg) translateZ(50px); }
        }

        @keyframes particle-float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }

        @media (max-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .hero-metrics {
            justify-content: center;
            flex-wrap: wrap;
          }

          .metric-card {
            flex-direction: column;
            text-align: center;
            padding: 1rem;
          }

          .hero-actions {
            justify-content: center;
            flex-wrap: wrap;
          }

          .tech-stack {
            justify-content: center;
          }

          .hero-visualization {
            height: 300px;
          }

          .dna-helix-large {
            width: 150px;
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;


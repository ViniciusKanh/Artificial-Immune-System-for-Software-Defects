import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SimulationSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [f1Score, setF1Score] = useState(0);
  const [antibodies, setAntibodies] = useState([]);
  const [antigens, setAntigens] = useState([]);
  const [phase, setPhase] = useState('initialization');
  const [speed, setSpeed] = useState(1);
  const canvasRef = useRef();

  const f1ScoreData = [0.9035, 0.9962, 0.9930, 0.9946, 0.9970, 0.9987, 0.9981, 0.9981, 0.9984, 0.9987];

  // Inicializar população
  useEffect(() => {
    const initialAntibodies = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 700 + 50,
      y: Math.random() * 400 + 50,
      afinidade: Math.random() * 0.5 + 0.3,
      size: 25,
      color: '#00D4FF',
      energy: Math.random() * 100 + 50,
      connections: []
    }));

    const initialAntigens = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 700 + 50,
      y: Math.random() * 400 + 50,
      detected: false,
      size: 30,
      color: '#FF3366',
      threat: Math.random() * 100 + 50
    }));

    setAntibodies(initialAntibodies);
    setAntigens(initialAntigens);
  }, []);

  // Animação principal
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setPhase(currentPhase => {
        switch (currentPhase) {
          case 'initialization':
            return 'recognition';
          case 'recognition':
            setAntigens(prev => prev.map(ag => ({
              ...ag,
              detected: Math.random() > 0.2,
              color: Math.random() > 0.2 ? '#FF6B35' : '#FF3366'
            })));
            return 'cloning';
          case 'cloning':
            setAntibodies(prev => {
              const newAntibodies = [];
              prev.forEach(ab => {
                newAntibodies.push(ab);
                const clones = Math.floor(ab.afinidade * 4);
                for (let i = 0; i < clones; i++) {
                  newAntibodies.push({
                    ...ab,
                    id: `${ab.id}-clone-${i}`,
                    x: ab.x + (Math.random() - 0.5) * 150,
                    y: ab.y + (Math.random() - 0.5) * 150,
                    size: 20,
                    energy: ab.energy * 0.8
                  });
                }
              });
              return newAntibodies.slice(0, 30);
            });
            return 'mutation';
          case 'mutation':
            setAntibodies(prev => prev.map(ab => ({
              ...ab,
              afinidade: Math.min(1, ab.afinidade + (Math.random() - 0.5) * 0.3),
              color: ab.afinidade > 0.7 ? '#00FF88' : ab.afinidade > 0.5 ? '#4ECDC4' : '#00D4FF',
              energy: Math.min(100, ab.energy + Math.random() * 20)
            })));
            return 'selection';
          case 'selection':
            setAntibodies(prev => {
              const sorted = [...prev].sort((a, b) => b.afinidade - a.afinidade);
              return sorted.slice(0, 12).map((ab, i) => ({
                ...ab,
                id: i,
                size: 25 + ab.afinidade * 10,
                connections: []
              }));
            });
            
            setGeneration(prev => {
              const newGen = prev + 1;
              if (newGen < f1ScoreData.length) {
                setF1Score(f1ScoreData[newGen]);
              }
              return newGen;
            });
            
            return generation >= 9 ? 'completed' : 'recognition';
          case 'completed':
            setIsPlaying(false);
            return 'completed';
          default:
            return 'initialization';
        }
      });
    }, 2000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, generation, speed]);

  const resetSimulation = () => {
    setGeneration(0);
    setF1Score(f1ScoreData[0]);
    setPhase('initialization');
    setIsPlaying(false);
  };

  const getPhaseDescription = () => {
    switch (phase) {
      case 'initialization':
        return 'Inicializando população de anticorpos detectores';
      case 'recognition':
        return 'Reconhecendo e identificando antígenos (defeitos)';
      case 'cloning':
        return 'Clonando anticorpos com maior afinidade';
      case 'mutation':
        return 'Aplicando mutações para diversificação genética';
      case 'selection':
        return 'Selecionando os melhores detectores (elitismo)';
      case 'completed':
        return 'Evolução completa - Sistema otimizado e pronto';
      default:
        return 'Sistema Imunológico Artificial em operação';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'initialization': return '#00D4FF';
      case 'recognition': return '#FF6B35';
      case 'cloning': return '#4ECDC4';
      case 'mutation': return '#8B5CF6';
      case 'selection': return '#00FF88';
      case 'completed': return '#FFD700';
      default: return '#00D4FF';
    }
  };

  return (
    <section className="simulation-section">
      <div className="simulation-container">
        {/* Header da simulação */}
        <motion.div 
          className="simulation-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Simulação Interativa do AIS</h2>
          <p className="section-subtitle">
            Visualize em tempo real como o Sistema Imunológico Artificial evolui para detectar defeitos
          </p>
        </motion.div>

        {/* Painel de controle */}
        <motion.div 
          className="control-panel"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="control-group">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`control-btn primary ${isPlaying ? 'playing' : ''}`}
            >
              <span className="btn-icon">{isPlaying ? '⏸️' : '▶️'}</span>
              <span className="btn-text">{isPlaying ? 'Pausar' : 'Iniciar'}</span>
            </button>
            
            <button
              onClick={resetSimulation}
              className="control-btn secondary"
            >
              <span className="btn-icon">🔄</span>
              <span className="btn-text">Reiniciar</span>
            </button>
          </div>

          <div className="speed-control">
            <label>Velocidade: {speed}x</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="speed-slider"
            />
          </div>
        </motion.div>

        {/* Métricas em tempo real */}
        <motion.div 
          className="metrics-panel"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="metric-display">
            <div className="metric-icon">🧬</div>
            <div className="metric-info">
              <span className="metric-value">{generation}</span>
              <span className="metric-label">Geração</span>
            </div>
          </div>

          <div className="metric-display">
            <div className="metric-icon">🎯</div>
            <div className="metric-info">
              <span className="metric-value">{f1Score.toFixed(4)}</span>
              <span className="metric-label">F1-Score</span>
            </div>
          </div>

          <div className="metric-display">
            <div className="metric-icon" style={{ color: getPhaseColor() }}>⚡</div>
            <div className="metric-info">
              <span className="metric-value" style={{ color: getPhaseColor() }}>
                {phase.charAt(0).toUpperCase() + phase.slice(1)}
              </span>
              <span className="metric-label">Fase Atual</span>
            </div>
          </div>

          <div className="metric-display">
            <div className="metric-icon">🔬</div>
            <div className="metric-info">
              <span className="metric-value">{antibodies.length}</span>
              <span className="metric-label">Anticorpos</span>
            </div>
          </div>
        </motion.div>

        {/* Arena de simulação */}
        <motion.div 
          className="simulation-arena"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="arena-header">
            <h3 className="arena-title">Arena de Evolução</h3>
            <p className="phase-description">{getPhaseDescription()}</p>
          </div>

          <div className="arena-container">
            {/* Legenda */}
            <div className="legend">
              <div className="legend-item">
                <div className="legend-icon antibody"></div>
                <span>Anticorpos</span>
              </div>
              <div className="legend-item">
                <div className="legend-icon evolved"></div>
                <span>Evoluídos</span>
              </div>
              <div className="legend-item">
                <div className="legend-icon antigen"></div>
                <span>Antígenos</span>
              </div>
              <div className="legend-item">
                <div className="legend-icon detected"></div>
                <span>Detectados</span>
              </div>
            </div>

            {/* Campo de simulação */}
            <div className="simulation-field">
              {/* Grid de fundo */}
              <div className="grid-background"></div>

              {/* Anticorpos */}
              <AnimatePresence>
                {antibodies.map((antibody) => (
                  <motion.div
                    key={antibody.id}
                    className="antibody-particle"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      x: antibody.x,
                      y: antibody.y
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      width: antibody.size,
                      height: antibody.size,
                      backgroundColor: antibody.color,
                      boxShadow: `0 0 ${antibody.size}px ${antibody.color}50`
                    }}
                  >
                    <span className="particle-symbol">Y</span>
                    <div className="energy-bar">
                      <div 
                        className="energy-fill"
                        style={{ width: `${antibody.energy}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Antígenos */}
              <AnimatePresence>
                {antigens.map((antigen) => (
                  <motion.div
                    key={antigen.id}
                    className={`antigen-particle ${antigen.detected ? 'detected' : ''}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: antigen.detected ? 1.3 : 1, 
                      opacity: antigen.detected ? 0.8 : 1,
                      x: antigen.x,
                      y: antigen.y
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                      width: antigen.size,
                      height: antigen.size,
                      backgroundColor: antigen.color,
                      boxShadow: `0 0 ${antigen.size}px ${antigen.color}50`
                    }}
                  >
                    <span className="particle-symbol">🐛</span>
                    {antigen.detected && (
                      <div className="detection-ring"></div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Efeitos visuais por fase */}
              {phase === 'cloning' && (
                <motion.div
                  className="phase-overlay cloning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                />
              )}
              
              {phase === 'mutation' && (
                <motion.div
                  className="phase-overlay mutation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Explicação do processo */}
        <motion.div 
          className="process-explanation"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3>Como Funciona o Algoritmo</h3>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Inicialização</h4>
                <p>População inicial de anticorpos é criada aleatoriamente</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Reconhecimento</h4>
                <p>Anticorpos identificam e se ligam aos antígenos (defeitos)</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Clonagem</h4>
                <p>Anticorpos com maior afinidade são clonados proporcionalmente</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Mutação</h4>
                <p>Clones sofrem mutações para aumentar a diversidade</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>Seleção</h4>
                <p>Melhores detectores são mantidos para a próxima geração</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .simulation-section {
          padding: 4rem 0;
          background: linear-gradient(135deg, rgba(10, 22, 40, 0.9), rgba(0, 0, 0, 0.8));
          border-radius: 24px;
          margin: 2rem 0;
          position: relative;
          overflow: hidden;
        }

        .simulation-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .simulation-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-title {
          font-family: 'Orbitron', monospace;
          font-size: 2.5rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 1rem;
          text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: #E2E8F0;
          max-width: 600px;
          margin: 0 auto;
        }

        .control-panel {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .control-group {
          display: flex;
          gap: 1rem;
        }

        .control-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .control-btn.primary {
          background: linear-gradient(135deg, #00D4FF, #4ECDC4);
          color: #0A1628;
        }

        .control-btn.primary.playing {
          background: linear-gradient(135deg, #FF6B35, #FF3366);
          color: #FFFFFF;
        }

        .control-btn.secondary {
          background: transparent;
          border: 2px solid #00D4FF;
          color: #00D4FF;
        }

        .control-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
        }

        .btn-icon {
          font-size: 1.2rem;
        }

        .speed-control {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          color: #E2E8F0;
        }

        .speed-slider {
          width: 120px;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          outline: none;
          cursor: pointer;
        }

        .speed-slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          background: #00D4FF;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
        }

        .metrics-panel {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .metric-display {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .metric-display:hover {
          border-color: #00D4FF;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
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

        .simulation-arena {
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(0, 212, 255, 0.3);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 3rem;
        }

        .arena-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .arena-title {
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          color: #4ECDC4;
          margin-bottom: 0.5rem;
        }

        .phase-description {
          color: #E2E8F0;
          font-style: italic;
        }

        .arena-container {
          position: relative;
        }

        .legend {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #E2E8F0;
          font-size: 0.9rem;
        }

        .legend-icon {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #FFFFFF;
        }

        .legend-icon.antibody { background: #00D4FF; }
        .legend-icon.evolved { background: #00FF88; }
        .legend-icon.antigen { background: #FF3366; }
        .legend-icon.detected { background: #FF6B35; }

        .simulation-field {
          position: relative;
          width: 100%;
          height: 500px;
          background: radial-gradient(circle at center, rgba(0, 212, 255, 0.05), transparent);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 16px;
          overflow: hidden;
        }

        .grid-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-pulse 4s ease-in-out infinite;
        }

        .antibody-particle {
          position: absolute;
          border-radius: 50%;
          border: 2px solid #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .antibody-particle:hover {
          transform: scale(1.2) !important;
        }

        .antigen-particle {
          position: absolute;
          border-radius: 50%;
          border: 2px solid #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .antigen-particle.detected {
          animation: detection-pulse 1s ease-in-out infinite;
        }

        .particle-symbol {
          color: #FFFFFF;
          font-weight: bold;
          text-shadow: 0 0 5px currentColor;
        }

        .energy-bar {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 3px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .energy-fill {
          height: 100%;
          background: linear-gradient(90deg, #FF3366, #FF6B35, #00FF88);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .detection-ring {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border: 2px solid #FF6B35;
          border-radius: 50%;
          animation: ring-expand 1s ease-out infinite;
        }

        .phase-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          pointer-events: none;
        }

        .phase-overlay.cloning {
          background: radial-gradient(circle, rgba(78, 205, 196, 0.3), transparent);
        }

        .phase-overlay.mutation {
          background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent);
        }

        .process-explanation {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
        }

        .process-explanation h3 {
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          color: #4ECDC4;
          text-align: center;
          margin-bottom: 2rem;
        }

        .process-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .step {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          border-left: 4px solid #00D4FF;
        }

        .step-number {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #00D4FF, #4ECDC4);
          color: #0A1628;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }

        .step h4 {
          color: #00D4FF;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        .step p {
          color: #E2E8F0;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        @keyframes grid-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes detection-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes ring-expand {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        @media (max-width: 768px) {
          .control-panel {
            flex-direction: column;
            gap: 1rem;
          }

          .metrics-panel {
            grid-template-columns: repeat(2, 1fr);
          }

          .legend {
            gap: 1rem;
          }

          .simulation-field {
            height: 400px;
          }

          .process-steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default SimulationSection;


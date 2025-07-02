import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './components/HeroSection';
import Navigation from './components/Navigation';
import ConceptsSection from './components/ConceptsSection';
import SimulationSection from './components/SimulationSection';
import CodeSection from './components/CodeSection';
import ResultsSection from './components/ResultsSection';
import RelevanceSection from './components/RelevanceSection';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: 'home', title: 'Início', icon: '🏠', component: HeroSection },
    { id: 'concepts', title: 'Conceitos', icon: '🧬', component: ConceptsSection },
    { id: 'simulation', title: 'Simulação', icon: '⚡', component: SimulationSection },
    { id: 'code', title: 'Código', icon: '💻', component: CodeSection },
    { id: 'results', title: 'Resultados', icon: '📊', component: ResultsSection },
    { id: 'relevance', title: 'Relevância', icon: '🔬', component: RelevanceSection }
  ];

  const renderSection = () => {
    const currentSection = sections.find(s => s.id === activeSection);
    if (!currentSection) return <HeroSection />;
    
    const Component = currentSection.component;
    return <Component />;
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <div className="dna-helix">
            <div className="helix-strand"></div>
            <div className="helix-strand"></div>
          </div>
          <motion.h2 
            className="loading-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Inicializando Sistema Imunológico Artificial
          </motion.h2>
          <div className="loading-progress">
            <motion.div 
              className="progress-bar"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <ParticleBackground />
      
      {/* Header Futurístico */}
      <header className="futuristic-header">
        <div className="header-content">
          <motion.div 
            className="logo-container"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="logo-icon">
              <div className="dna-symbol">
                <div className="dna-strand"></div>
                <div className="dna-strand"></div>
              </div>
            </div>
            <div className="logo-text">
              <h1 className="main-title">Sistema Imunológico Artificial</h1>
              <p className="subtitle">Detecção Inteligente de Defeitos de Software</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="header-stats"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="stat-item">
              <span className="stat-value">99.87%</span>
              <span className="stat-label">Precisão</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">10</span>
              <span className="stat-label">Gerações</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">Real-time</span>
              <span className="stat-label">Análise</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Navegação Avançada */}
      <Navigation 
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Conteúdo Principal */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ 
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="section-container"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Futurístico */}
      <footer className="futuristic-footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>Sistema AIS</h3>
              <p>Computação Inspirada pela Natureza aplicada à Engenharia de Software</p>
            </div>
            <div className="footer-section">
              <h3>Tecnologias</h3>
              <ul>
                <li>React + Three.js</li>
                <li>Framer Motion</li>
                <li>Machine Learning</li>
                <li>Algoritmos Genéticos</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Pesquisa</h3>
              <p>Baseado no trabalho de Vinícius de Souza Santos</p>
              <p>PPGC/UNESP - 2025</p>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="tech-indicators">
              <div className="indicator active"></div>
              <div className="indicator active"></div>
              <div className="indicator active"></div>
              <div className="indicator"></div>
            </div>
            <p>&copy; 2025 Sistema Imunológico Artificial. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;


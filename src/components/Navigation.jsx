import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navigation = ({ sections, activeSection, setActiveSection }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="futuristic-nav">
      {/* Barra de progresso */}
      <div className="progress-container">
        <motion.div 
          className="progress-line"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      <div className="nav-content">
        <div className="nav-sections">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="nav-icon">{section.icon}</span>
              <span className="nav-title">{section.title}</span>
              {activeSection === section.id && (
                <motion.div
                  className="nav-indicator"
                  layoutId="activeIndicator"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
            </motion.button>
          ))}
        </div>
        
        {/* Indicador de status */}
        <div className="nav-status">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span className="status-text">Sistema Ativo</span>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .futuristic-nav {
          position: sticky;
          top: 120px;
          z-index: 900;
          background: rgba(10, 22, 40, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 16px;
          margin: 2rem auto;
          max-width: 1200px;
          overflow: hidden;
        }
        
        .progress-container {
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          position: relative;
        }
        
        .progress-line {
          height: 100%;
          background: linear-gradient(90deg, #00D4FF, #4ECDC4);
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
        }
        
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
        }
        
        .nav-sections {
          display: flex;
          gap: 0.5rem;
        }
        
        .nav-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #E2E8F0;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .nav-item:hover {
          border-color: rgba(0, 212, 255, 0.5);
          background: rgba(0, 212, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 212, 255, 0.2);
        }
        
        .nav-item.active {
          background: rgba(0, 212, 255, 0.2);
          border-color: #00D4FF;
          color: #FFFFFF;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
        }
        
        .nav-icon {
          font-size: 1.2rem;
          filter: drop-shadow(0 0 5px currentColor);
        }
        
        .nav-title {
          font-size: 0.9rem;
          white-space: nowrap;
        }
        
        .nav-indicator {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(78, 205, 196, 0.2));
          border-radius: 12px;
          z-index: -1;
        }
        
        .nav-status {
          display: flex;
          align-items: center;
        }
        
        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 20px;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background: #00FF88;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
          box-shadow: 0 0 10px #00FF88;
        }
        
        .status-text {
          font-size: 0.8rem;
          color: #00FF88;
          font-weight: 500;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
        
        @media (max-width: 768px) {
          .futuristic-nav {
            margin: 1rem;
            top: 100px;
          }
          
          .nav-content {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
          
          .nav-sections {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.5rem;
          }
          
          .nav-item {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
          
          .nav-title {
            display: none;
          }
          
          .nav-icon {
            font-size: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .nav-sections {
            grid-template-columns: repeat(3, 1fr);
            display: grid;
            width: 100%;
          }
          
          .nav-item {
            justify-content: center;
            padding: 0.75rem 0.5rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;


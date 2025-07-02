import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSection = () => {
  const [activeTab, setActiveTab] = useState('main');

  const codeExamples = {
    main: {
      title: 'Algoritmo Principal AIS',
      language: 'python',
      code: `import numpy as np
import random
from sklearn.metrics import f1_score

class ArtificialImmuneSystem:
    def __init__(self, population_size=50, generations=10, clone_factor=0.1):
        self.population_size = population_size
        self.generations = generations
        self.clone_factor = clone_factor
        self.antibodies = []
        self.memory_cells = []
        
    def initialize_population(self, feature_size):
        """Inicializa população aleatória de anticorpos"""
        self.antibodies = []
        for _ in range(self.population_size):
            antibody = {
                'detector': np.random.uniform(-1, 1, feature_size),
                'affinity': 0.0,
                'age': 0
            }
            self.antibodies.append(antibody)
    
    def calculate_affinity(self, antibody, antigen):
        """Calcula afinidade entre anticorpo e antígeno"""
        distance = np.linalg.norm(antibody['detector'] - antigen)
        affinity = 1.0 / (1.0 + distance)
        return affinity
    
    def clonal_selection(self, antigens):
        """Implementa seleção clonal com hipermutação"""
        # Calcular afinidade para todos os anticorpos
        for antibody in self.antibodies:
            max_affinity = 0
            for antigen in antigens:
                affinity = self.calculate_affinity(antibody, antigen)
                max_affinity = max(max_affinity, affinity)
            antibody['affinity'] = max_affinity
        
        # Ordenar por afinidade
        self.antibodies.sort(key=lambda x: x['affinity'], reverse=True)
        
        # Seleção dos melhores
        selected = self.antibodies[:int(self.population_size * 0.5)]
        
        # Clonagem proporcional à afinidade
        clones = []
        for antibody in selected:
            num_clones = int(antibody['affinity'] * 10)
            for _ in range(num_clones):
                clone = self.hypermutation(antibody.copy())
                clones.append(clone)
        
        # Atualizar população
        self.antibodies = selected + clones[:self.population_size - len(selected)]
    
    def hypermutation(self, antibody):
        """Aplica hipermutação inversamente proporcional à afinidade"""
        mutation_rate = 1.0 - antibody['affinity']
        noise = np.random.normal(0, mutation_rate * 0.1, len(antibody['detector']))
        antibody['detector'] += noise
        antibody['detector'] = np.clip(antibody['detector'], -1, 1)
        antibody['age'] = 0
        return antibody
    
    def detect_defects(self, test_data):
        """Detecta defeitos usando os melhores anticorpos"""
        predictions = []
        
        for sample in test_data:
            max_affinity = 0
            for antibody in self.antibodies[:10]:  # Top 10 detectores
                affinity = self.calculate_affinity(antibody, sample)
                max_affinity = max(max_affinity, affinity)
            
            # Threshold para classificação
            prediction = 1 if max_affinity > 0.7 else 0
            predictions.append(prediction)
        
        return predictions
    
    def evolve(self, training_data, labels):
        """Processo evolutivo principal"""
        feature_size = len(training_data[0])
        self.initialize_population(feature_size)
        
        # Separar antígenos (defeitos) dos dados normais
        defective_samples = [training_data[i] for i, label in enumerate(labels) if label == 1]
        
        best_f1_scores = []
        
        for generation in range(self.generations):
            # Seleção clonal
            self.clonal_selection(defective_samples)
            
            # Avaliação
            predictions = self.detect_defects(training_data)
            f1 = f1_score(labels, predictions)
            best_f1_scores.append(f1)
            
            print(f"Geração {generation + 1}: F1-Score = {f1:.4f}")
            
            # Critério de parada
            if f1 > 0.99:
                break
        
        return best_f1_scores

# Exemplo de uso
if __name__ == "__main__":
    # Dados simulados de defeitos de software
    np.random.seed(42)
    
    # Gerar dataset sintético
    normal_samples = np.random.normal(0, 0.5, (800, 10))
    defective_samples = np.random.normal(2, 0.8, (200, 10))
    
    X = np.vstack([normal_samples, defective_samples])
    y = np.hstack([np.zeros(800), np.ones(200)])
    
    # Treinar AIS
    ais = ArtificialImmuneSystem(population_size=50, generations=10)
    f1_scores = ais.evolve(X, y)
    
    print(f"\\nMelhor F1-Score: {max(f1_scores):.4f}")
    print("Evolução completa!")`
    },
    affinity: {
      title: 'Função de Afinidade',
      language: 'python',
      code: `def calculate_euclidean_affinity(antibody, antigen):
    """
    Calcula afinidade usando distância euclidiana
    Maior proximidade = maior afinidade
    """
    distance = np.linalg.norm(antibody - antigen)
    affinity = 1.0 / (1.0 + distance)
    return affinity

def calculate_hamming_affinity(antibody, antigen):
    """
    Calcula afinidade usando distância de Hamming
    Para dados binários ou categóricos
    """
    matches = np.sum(antibody == antigen)
    total = len(antibody)
    affinity = matches / total
    return affinity

def calculate_cosine_affinity(antibody, antigen):
    """
    Calcula afinidade usando similaridade de cosseno
    Útil para dados de alta dimensionalidade
    """
    dot_product = np.dot(antibody, antigen)
    norm_product = np.linalg.norm(antibody) * np.linalg.norm(antigen)
    
    if norm_product == 0:
        return 0.0
    
    cosine_sim = dot_product / norm_product
    affinity = (cosine_sim + 1) / 2  # Normalizar para [0,1]
    return affinity

def adaptive_affinity(antibody, antigen, context=None):
    """
    Função de afinidade adaptativa que considera contexto
    """
    base_affinity = calculate_euclidean_affinity(antibody, antigen)
    
    # Ajustar baseado no contexto (ex: tipo de defeito)
    if context:
        if context['defect_type'] == 'critical':
            base_affinity *= 1.5  # Aumentar sensibilidade
        elif context['defect_type'] == 'minor':
            base_affinity *= 0.8  # Reduzir sensibilidade
    
    return min(base_affinity, 1.0)  # Manter no intervalo [0,1]`
    },
    cloning: {
      title: 'Processo de Clonagem',
      language: 'python',
      code: `def clonal_expansion(antibodies, selection_pressure=0.5):
    """
    Implementa expansão clonal proporcional à afinidade
    """
    # Ordenar anticorpos por afinidade
    sorted_antibodies = sorted(antibodies, 
                              key=lambda x: x['affinity'], 
                              reverse=True)
    
    # Selecionar os melhores
    num_selected = int(len(antibodies) * selection_pressure)
    selected = sorted_antibodies[:num_selected]
    
    clones = []
    
    for antibody in selected:
        # Número de clones proporcional à afinidade
        num_clones = int(antibody['affinity'] * 20) + 1
        
        for i in range(num_clones):
            clone = create_clone(antibody, clone_id=i)
            clones.append(clone)
    
    return clones

def create_clone(parent, clone_id):
    """
    Cria um clone com pequenas variações
    """
    clone = {
        'detector': parent['detector'].copy(),
        'affinity': 0.0,  # Será recalculada
        'age': 0,
        'parent_id': parent.get('id', 'unknown'),
        'clone_id': clone_id,
        'generation': parent.get('generation', 0) + 1
    }
    
    return clone

def proportional_cloning(antibodies, max_clones=100):
    """
    Clonagem com limite máximo e distribuição proporcional
    """
    total_affinity = sum(ab['affinity'] for ab in antibodies)
    
    if total_affinity == 0:
        return antibodies  # Evitar divisão por zero
    
    clones = []
    
    for antibody in antibodies:
        # Proporção baseada na afinidade relativa
        proportion = antibody['affinity'] / total_affinity
        num_clones = int(proportion * max_clones)
        
        for i in range(max(1, num_clones)):  # Pelo menos 1 clone
            clone = create_clone(antibody, i)
            clones.append(clone)
    
    return clones[:max_clones]  # Limitar ao máximo`
    },
    mutation: {
      title: 'Hipermutação Somática',
      language: 'python',
      code: `def somatic_hypermutation(antibody, mutation_rate=None):
    """
    Implementa hipermutação somática inversamente proporcional à afinidade
    """
    if mutation_rate is None:
        # Taxa inversamente proporcional à afinidade
        mutation_rate = 1.0 - antibody['affinity']
        mutation_rate = max(0.01, min(0.5, mutation_rate))  # Limitar intervalo
    
    detector = antibody['detector'].copy()
    
    # Aplicar mutação gaussiana
    for i in range(len(detector)):
        if random.random() < mutation_rate:
            # Mutação com intensidade baseada na afinidade
            intensity = mutation_rate * 0.2
            mutation = np.random.normal(0, intensity)
            detector[i] += mutation
            
            # Manter dentro dos limites
            detector[i] = np.clip(detector[i], -1, 1)
    
    # Criar anticorpo mutado
    mutated = antibody.copy()
    mutated['detector'] = detector
    mutated['affinity'] = 0.0  # Será recalculada
    mutated['age'] = 0
    
    return mutated

def adaptive_mutation(antibody, generation, max_generations):
    """
    Mutação adaptativa que diminui com as gerações
    """
    base_rate = 1.0 - antibody['affinity']
    
    # Fator de decaimento temporal
    decay_factor = 1.0 - (generation / max_generations)
    
    # Taxa final de mutação
    mutation_rate = base_rate * decay_factor
    mutation_rate = max(0.001, mutation_rate)  # Taxa mínima
    
    return somatic_hypermutation(antibody, mutation_rate)

def directed_mutation(antibody, target_antigen):
    """
    Mutação direcionada em direção ao antígeno alvo
    """
    detector = antibody['detector'].copy()
    
    # Calcular direção para o antígeno
    direction = target_antigen - detector
    direction_norm = np.linalg.norm(direction)
    
    if direction_norm > 0:
        # Normalizar direção
        direction = direction / direction_norm
        
        # Aplicar mutação direcionada
        step_size = (1.0 - antibody['affinity']) * 0.1
        detector += direction * step_size
        
        # Adicionar ruído aleatório
        noise = np.random.normal(0, 0.05, len(detector))
        detector += noise
        
        # Manter limites
        detector = np.clip(detector, -1, 1)
    
    mutated = antibody.copy()
    mutated['detector'] = detector
    mutated['affinity'] = 0.0
    
    return mutated`
    }
  };

  const tabs = [
    { id: 'main', title: 'Algoritmo Principal', icon: '🧬' },
    { id: 'affinity', title: 'Função de Afinidade', icon: '🎯' },
    { id: 'cloning', title: 'Clonagem', icon: '🔬' },
    { id: 'mutation', title: 'Mutação', icon: '🔄' }
  ];

  return (
    <section className="code-section">
      <div className="code-container">
        {/* Header */}
        <motion.div 
          className="code-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Implementação do Código</h2>
          <p className="section-subtitle">
            Explore a implementação detalhada do Sistema Imunológico Artificial em Python
          </p>
        </motion.div>

        {/* Tabs de navegação */}
        <motion.div 
          className="code-tabs"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-title">{tab.title}</span>
              {activeTab === tab.id && (
                <motion.div
                  className="tab-indicator"
                  layoutId="activeTab"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Área do código */}
        <motion.div 
          className="code-area"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="code-header-bar">
            <div className="window-controls">
              <div className="control-dot red"></div>
              <div className="control-dot yellow"></div>
              <div className="control-dot green"></div>
            </div>
            <div className="file-info">
              <span className="file-icon">📄</span>
              <span className="file-name">{codeExamples[activeTab].title}.py</span>
            </div>
            <div className="code-actions">
              <button className="action-btn">
                <span>📋</span>
                Copiar
              </button>
              <button className="action-btn">
                <span>⬇️</span>
                Download
              </button>
            </div>
          </div>

          <div className="code-content">
            <SyntaxHighlighter
              language={codeExamples[activeTab].language}
              style={{
                ...atomDark,
                'pre[class*="language-"]': {
                  ...atomDark['pre[class*="language-"]'],
                  background: 'transparent',
                  margin: 0,
                  padding: '2rem',
                  fontSize: '0.9rem',
                  lineHeight: '1.6'
                },
                'code[class*="language-"]': {
                  ...atomDark['code[class*="language-"]'],
                  background: 'transparent',
                  fontSize: '0.9rem'
                }
              }}
              showLineNumbers={true}
              wrapLines={true}
              lineNumberStyle={{
                color: '#4ECDC4',
                backgroundColor: 'rgba(78, 205, 196, 0.1)',
                paddingRight: '1rem',
                marginRight: '1rem',
                borderRight: '2px solid rgba(78, 205, 196, 0.3)'
              }}
            >
              {codeExamples[activeTab].code}
            </SyntaxHighlighter>
          </div>
        </motion.div>

        {/* Explicação do código */}
        <motion.div 
          className="code-explanation"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3>Explicação do Código</h3>
          
          {activeTab === 'main' && (
            <div className="explanation-content">
              <div className="explanation-item">
                <h4>🏗️ Estrutura Principal</h4>
                <p>A classe <code>ArtificialImmuneSystem</code> implementa o algoritmo completo com métodos para inicialização, evolução e detecção.</p>
              </div>
              <div className="explanation-item">
                <h4>🧬 Processo Evolutivo</h4>
                <p>O método <code>evolve()</code> executa o ciclo completo: inicialização → seleção clonal → hipermutação → avaliação.</p>
              </div>
              <div className="explanation-item">
                <h4>📊 Métricas de Avaliação</h4>
                <p>Utiliza F1-Score para avaliar a performance, balanceando precisão e recall na detecção de defeitos.</p>
              </div>
            </div>
          )}

          {activeTab === 'affinity' && (
            <div className="explanation-content">
              <div className="explanation-item">
                <h4>📏 Distância Euclidiana</h4>
                <p>Mede a proximidade entre anticorpo e antígeno no espaço de características.</p>
              </div>
              <div className="explanation-item">
                <h4>🎯 Similaridade de Cosseno</h4>
                <p>Útil para dados de alta dimensionalidade, focando na direção dos vetores.</p>
              </div>
              <div className="explanation-item">
                <h4>🔄 Afinidade Adaptativa</h4>
                <p>Ajusta a sensibilidade baseada no contexto e tipo de defeito detectado.</p>
              </div>
            </div>
          )}

          {activeTab === 'cloning' && (
            <div className="explanation-content">
              <div className="explanation-item">
                <h4>📈 Expansão Proporcional</h4>
                <p>Anticorpos com maior afinidade geram mais clones, simulando a resposta imune natural.</p>
              </div>
              <div className="explanation-item">
                <h4>⚖️ Controle de População</h4>
                <p>Limita o número total de clones para manter eficiência computacional.</p>
              </div>
              <div className="explanation-item">
                <h4>🧬 Herança Genética</h4>
                <p>Clones herdam características dos pais com pequenas variações.</p>
              </div>
            </div>
          )}

          {activeTab === 'mutation' && (
            <div className="explanation-content">
              <div className="explanation-item">
                <h4>🔄 Taxa Inversamente Proporcional</h4>
                <p>Anticorpos com baixa afinidade sofrem mais mutações para explorar o espaço de soluções.</p>
              </div>
              <div className="explanation-item">
                <h4>📉 Decaimento Temporal</h4>
                <p>A taxa de mutação diminui ao longo das gerações para convergência.</p>
              </div>
              <div className="explanation-item">
                <h4>🎯 Mutação Direcionada</h4>
                <p>Orienta mutações em direção aos antígenos para acelerar a evolução.</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Estatísticas do código */}
        <motion.div 
          className="code-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">📝</div>
              <div className="stat-value">200+</div>
              <div className="stat-label">Linhas de Código</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🔧</div>
              <div className="stat-value">15</div>
              <div className="stat-label">Funções</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🧪</div>
              <div className="stat-value">4</div>
              <div className="stat-label">Algoritmos</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⚡</div>
              <div className="stat-value">O(n²)</div>
              <div className="stat-label">Complexidade</div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .code-section {
          padding: 4rem 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(10, 22, 40, 0.8));
          border-radius: 24px;
          margin: 2rem 0;
          position: relative;
          overflow: hidden;
        }

        .code-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .code-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-title {
          font-family: 'Orbitron', monospace;
          font-size: 2.5rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 1rem;
          text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: #E2E8F0;
          max-width: 600px;
          margin: 0 auto;
        }

        .code-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .tab-button {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #E2E8F0;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          overflow: hidden;
        }

        .tab-button:hover {
          border-color: #00FF88;
          background: rgba(0, 255, 136, 0.1);
          transform: translateY(-2px);
        }

        .tab-button.active {
          background: rgba(0, 255, 136, 0.2);
          border-color: #00FF88;
          color: #FFFFFF;
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
        }

        .tab-icon {
          font-size: 1.2rem;
        }

        .tab-title {
          font-size: 0.9rem;
        }

        .tab-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00FF88, #4ECDC4);
          border-radius: 2px;
        }

        .code-area {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 3rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .code-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: rgba(0, 0, 0, 0.8);
          border-bottom: 1px solid rgba(0, 255, 136, 0.2);
        }

        .window-controls {
          display: flex;
          gap: 0.5rem;
        }

        .control-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .control-dot.red { background: #FF5F56; }
        .control-dot.yellow { background: #FFBD2E; }
        .control-dot.green { background: #27CA3F; }

        .file-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #E2E8F0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
        }

        .file-icon {
          font-size: 1rem;
        }

        .code-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem 0.75rem;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 6px;
          color: #00FF88;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          background: rgba(0, 255, 136, 0.2);
          transform: scale(1.05);
        }

        .code-content {
          background: #1e1e1e;
          overflow-x: auto;
          max-height: 600px;
        }

        .code-explanation {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 3rem;
        }

        .code-explanation h3 {
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          color: #00FF88;
          margin-bottom: 2rem;
          text-align: center;
        }

        .explanation-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .explanation-item {
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          border-left: 4px solid #00FF88;
        }

        .explanation-item h4 {
          color: #4ECDC4;
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .explanation-item p {
          color: #E2E8F0;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .explanation-item code {
          background: rgba(0, 255, 136, 0.2);
          color: #00FF88;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
        }

        .code-stats {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(0, 255, 136, 0.2);
          border-radius: 16px;
          padding: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .stat-item {
          text-align: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          border-color: #00FF88;
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 255, 136, 0.2);
        }

        .stat-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 10px currentColor);
        }

        .stat-value {
          display: block;
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          font-weight: 700;
          color: #00FF88;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
        }

        .stat-label {
          color: #E2E8F0;
          font-size: 0.9rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .code-tabs {
            flex-wrap: wrap;
          }

          .tab-button {
            flex: 1;
            min-width: 120px;
          }

          .code-header-bar {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .code-actions {
            justify-content: center;
          }

          .explanation-content {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default CodeSection;


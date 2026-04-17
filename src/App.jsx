import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header/Header';
import Chat from './components/Chat/Chat';
import Recommendations from './components/Recommendations/Recommendations';
import './styles/global.css';
import './App.css';

function AppContent() {
  // Estado para el tab activo en mobile
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        {/* Desktop: Dos paneles lado a lado */}
        <div className="desktop-layout">
          <div className="chat-panel">
            <Chat />
          </div>
          <div className="recommendations-panel">
            <Recommendations />
          </div>
        </div>

        {/* Mobile: Tabs de navegación */}
        <div className="mobile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <span className="tab-icon">💬</span>
            <span className="tab-label">Chat</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendations')}
          >
            <span className="tab-icon">📊</span>
            <span className="tab-label">Mi Dashboard</span>
          </button>
        </div>

        <div className={`mobile-content mobile-chat ${activeTab === 'chat' ? 'active' : ''}`}>
          <Chat />
        </div>
        <div className={`mobile-content mobile-recommendations ${activeTab === 'recommendations' ? 'active' : ''}`}>
          <Recommendations />
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>IA-COOP © 2026 - Sistema de Servicio al Asociado con Inteligencia Artificial</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
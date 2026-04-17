// Componente de Recomendaciones y Dashboard Financiero
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, getHealthColor, getHealthLabel } from '../../data/mockData';
import './Recommendations.css';

const Recommendations = () => {
  const { currentUser } = useApp();
  const [expandedObjective, setExpandedObjective] = useState(null);

  const toggleObjective = (id) => {
    setExpandedObjective(expandedObjective === id ? null : id);
  };

  return (
    <div className="recommendations-container">
      {/* Perfil del Usuario */}
      <div className="profile-card">
        <div className="profile-header">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.nombre} 
            className="profile-avatar"
          />
          <div className="profile-info">
            <h3 className="profile-name">{currentUser.nombre}</h3>
            <p className="profile-email">{currentUser.email}</p>
          </div>
        </div>
        
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-label">Total Ahorros</span>
            <span className="stat-value">{formatCurrency(currentUser.ahorroTotal)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Aportes</span>
            <span className="stat-value">{formatCurrency(currentUser.aportes)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">En Créditos</span>
            <span className="stat-value">{formatCurrency(currentUser.saldoCreditos)}</span>
          </div>
        </div>

        <div className="health-score">
          <div className="health-header">
            <span className="health-label">Salud Financiera</span>
            <span 
              className="health-status"
              style={{ background: getHealthColor(currentUser.nivelSaludFinanciera) }}
            >
              {getHealthLabel(currentUser.nivelSaludFinanciera)}
            </span>
          </div>
          <div className="health-bar">
            <div 
              className="health-progress"
              style={{ 
                width: `${currentUser.puntuacionSalud}%`,
                background: getHealthColor(currentUser.nivelSaludFinanciera)
              }}
            />
          </div>
          <span className="health-score-value">{currentUser.puntuacionSalud}/100</span>
        </div>
      </div>

      {/* Objetivos de Ahorro */}
      <div className="section-card">
        <div className="section-header">
          <span className="section-icon">🎯</span>
          <h3 className="section-title">Objetivos de Ahorro</h3>
        </div>
        
        <div className="objectives-list">
          {currentUser.objetivosAhorro.map((objective) => {
            const progress = Math.round((objective.montoActual / objective.montoObjetivo) * 100);
            const isExpanded = expandedObjective === objective.id;
            
            return (
              <div 
                key={objective.id} 
                className={`objective-card ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleObjective(objective.id)}
              >
                <div className="objective-header">
                  <span className="objective-icon">{objective.icono}</span>
                  <div className="objective-info">
                    <h4 className="objective-name">{objective.nombre}</h4>
                    <span className="objective-date">Meta: {objective.fechaObjetivo}</span>
                  </div>
                  <span className="objective-progress-badge">{progress}%</span>
                </div>
                
                <div className="objective-progress-bar">
                  <div 
                    className="objective-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="objective-amounts">
                  <span className="current-amount">{formatCurrency(objective.montoActual)}</span>
                  <span className="separator">/</span>
                  <span className="target-amount">{formatCurrency(objective.montoObjetivo)}</span>
                </div>

                {isExpanded && (
                  <div className="objective-details animate-fadeIn">
                    <div className="detail-row">
                      <span className="detail-label">💰 Ahorro mensual necesario:</span>
                      <span className="detail-value">
                        {formatCurrency(Math.ceil(
                          (objective.montoObjetivo - objective.montoActual) / 
                          (new Date(objective.fechaObjetivo) - new Date()) / (30 * 24 * 60 * 60 * 1000)
                        ))}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">📅 Tiempo restante:</span>
                      <span className="detail-value">
                        {Math.ceil((new Date(objective.fechaObjetivo) - new Date()) / (30 * 24 * 60 * 60 * 1000))} meses
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Productos Sugeridos */}
      <div className="section-card">
        <div className="section-header">
          <span className="section-icon">🏦</span>
          <h3 className="section-title">Productos Sugeridos</h3>
        </div>
        
        <div className="products-list">
          {currentUser.productosSugeridos.map((product) => (
            <div 
              key={product.id} 
              className={`product-card ${product.recomendado ? 'recommended' : ''}`}
            >
              {product.recomendado && (
                <span className="recommended-badge">⭐ Recomendado</span>
              )}
              <h4 className="product-name">{product.nombre}</h4>
              <p className="product-description">{product.descripcion}</p>
              <div className="product-details">
                {product.tasa && <span className="product-rate">📊 {product.tasa}</span>}
                {product.costo && <span className="product-cost">💵 {product.costo}</span>}
                {product.montoMin && (
                  <span className="product-amount">
                    📋 {formatCurrency(product.montoMin)} - {formatCurrency(product.montoMax)}
                  </span>
                )}
              </div>
              {product.razon && (
                <p className="product-reason">💡 {product.razon}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tips Personalizados */}
      <div className="section-card tips-card">
        <div className="section-header">
          <span className="section-icon">💡</span>
          <h3 className="section-title">Tips para Ti</h3>
        </div>
        
        <div className="tips-list">
          {currentUser.tipsPersonalizados.map((tip, index) => (
            <div key={index} className="tip-item">
              <span className="tip-icon">✨</span>
              <p className="tip-text">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
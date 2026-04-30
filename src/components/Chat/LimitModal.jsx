import React from 'react';
import './LimitModal.css';

const LimitModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="limit-modal-overlay">
      <div className="limit-modal">
        <h3 className="limit-modal-title">Has alcanzado tu límite</h3>
        <p className="limit-modal-text">
          Ya no tienes mensajes disponibles. Para continuar usando IA-COOP,
          por favor contacta a nuestro equipo de atención al asociado.
        </p>
        <a
          className="limit-modal-link"
          href="mailto:atencion@ebssas.com"
        >
          atencion@ebssas.com
        </a>
        <button className="limit-modal-btn" onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  );
};

export default LimitModal;

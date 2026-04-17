// Componente de Chat con IA
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { sendMessageToDeepSeek, isApiConfigured, getFallbackResponse } from '../../services/deepseekService';
import { quickActions, welcomeMessages } from '../../data/mockData';
import './Chat.css';

const Chat = () => {
  const { currentUser, messages, addMessage, setMessages, isLoading, setIsLoading } = useApp();
  const [inputValue, setInputValue] = useState('');
  const isMounted = useRef(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll automático al final cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mensaje de bienvenida inicial - solo una vez al montar
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      
      // Solo agregar mensaje de bienvenida si no hay mensajes
      if (messages.length === 0) {
        const timer = setTimeout(() => {
          addMessage({
            role: 'assistant',
            content: `¡Hola ${currentUser.nombre.split(' ')[0]}! 👋\n\nSoy IA-COOP, tu asistente financiero de la Cooperativa. Estoy aquí para ayudarte con:\n\n💰 **Tus cuentas**: Saldos de ahorros y aportes\n💳 **Créditos**: Productos activos y opciones\n🎯 **Metas de ahorro**: Objetivos y progreso\n🏦 **Recomendaciones**: Productos para ti\n\n¿En qué puedo ayudarte hoy?`
          });
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, []); // Solo se ejecuta una vez al montar

  // Reset isMounted cuando cambia el usuario (para mostrar mensaje de bienvenida nuevo)
  useEffect(() => {
    if (messages.length === 0 && !isMounted.current) {
      // Si hay cambio de usuario y no hay mensajes, agregar mensaje de bienvenida
      const timer = setTimeout(() => {
        addMessage({
          role: 'assistant',
          content: `¡Hola ${currentUser.nombre.split(' ')[0]}! 👋\n\nSoy IA-COOP, tu asistente financiero de la Cooperativa. Estoy aquí para ayudarte con:\n\n💰 **Tus cuentas**: Saldos de ahorros y aportes\n💳 **Créditos**: Productos activos y opciones\n🎯 **Metas de ahorro**: Objetivos y progreso\n🏦 **Recomendaciones**: Productos para ti\n\n¿En qué puedo ayudarte hoy?`
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentUser.id]);

  // Función para parsear contenido con formato markdown
  const parseMessageContent = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      // Negrillas **texto**
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      // Encabezados # Título
      if (part.startsWith('# ')) {
        return <h3 key={index} className="message-heading">{part.slice(2)}</h3>;
      }
      // Encabezados ## Subtítulo
      if (part.startsWith('## ')) {
        return <h4 key={index} className="message-subheading">{part.slice(3)}</h4>;
      }
      // Encabezados ### Tercer nivel
      if (part.startsWith('### ')) {
        return <h5 key={index} className="message-subheading-3">{part.slice(4)}</h5>;
      }
      return part;
    });
  };

  // Enviar mensaje
  const handleSendMessage = async (text = null) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Agregar mensaje del usuario
    addMessage({ role: 'user', content: messageText });
    setInputValue('');
    setIsLoading(true);

    try {
      let response;

      if (isApiConfigured()) {
        // Usar DeepSeek API
        const chatMessages = [...messages, { role: 'user', content: messageText }];
        response = await sendMessageToDeepSeek(chatMessages, currentUser);
      } else {
        // Usar respuesta predefinida
        response = getFallbackResponse(messageText, currentUser);
      }

      addMessage({ role: 'assistant', content: response });
    } catch (error) {
      console.error('Error:', error);
      addMessage({
        role: 'assistant',
        content: `Disculpa, tuve un problema al procesar tu solicitud. ${isApiConfigured() ? 'Verifica tu conexión a internet e intenta de nuevo.' : 'El modo demo está activo, pero las respuestas pueden ser limitadas.'}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar envío con Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Manejar quick actions
  const handleQuickAction = (query) => {
    handleSendMessage(query);
  };

  return (
    <div className="chat-container">
      {/* Header del Chat */}
      <div className="chat-header">
        <div className="chat-title">
          <span className="chat-icon">💬</span>
          <h2>Chat con IA-COOP</h2>
        </div>
        {messages.length > 0 && (
          <button 
            className="clear-chat-btn"
            onClick={() => setMessages([])}
            title="Limpiar chat"
          >
            🗑️
          </button>
        )}
      </div>

      {/* Mensajes */}
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div 
            key={message.id || index} 
            className={`message ${message.role} animate-slideUp`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="message-content">
              {message.content.split('\n').map((line, i) => (
                <p key={i}>
                  {parseMessageContent(line)}
                </p>
              ))}
            </div>
            <span className="message-time">
              {new Date(message.timestamp).toLocaleTimeString('es-CO', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        ))}
        
        {/* Indicador de carga */}
        {isLoading && (
          <div className="message assistant typing">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length < 3 && (
        <div className="quick-actions">
          {quickActions.slice(0, 4).map(action => (
            <button
              key={action.id}
              className="quick-action-btn"
              onClick={() => handleQuickAction(action.query)}
            >
              {action.texto}
            </button>
          ))}
        </div>
      )}

      {/* Input de mensaje */}
      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu consulta..."
            className="chat-input"
            disabled={isLoading}
          />
          <button
            className="send-btn"
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
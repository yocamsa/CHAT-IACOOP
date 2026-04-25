import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';
import { supabase } from '../services/supabase';

const AppContext = createContext();

// Proveedor de contexto principal
export const AppProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const [userRole, setUserRole] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [currentView, setCurrentView] = useState('app');

  useEffect(() => {
    const fetchRoleAndAvatar = async (userId) => {
      if (!userId) return;
      const { data } = await supabase
        .from('profiles')
        .select('role, avatar_url')
        .eq('id', userId)
        .single();
      
      if (data) {
        setUserRole(data.role);
        setUserAvatar(data.avatar_url);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) fetchRoleAndAvatar(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) fetchRoleAndAvatar(session.user.id);
      else {
        setUserRole(null);
        setUserAvatar(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Usuario actual (por defecto el primero)
  const [currentUser, setCurrentUser] = useState(mockUsers[0]);
  
  // Mensajes del chat
  const [messages, setMessages] = useState([]);
  
  // Estado de carga
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado de conexión
  const [isConnected, setIsConnected] = useState(true);
  
  // Verificar si la API está configurada
  const [isApiConfigured, setIsApiConfigured] = useState(() => {
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    return apiKey && apiKey !== 'your_api_key_here' && apiKey.length > 0;
  });

  // Generador de IDs únicos
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Agregar mensaje al chat
  const addMessage = (message) => {
    setMessages(prev => [...prev, {
      id: generateId(),
      timestamp: new Date().toISOString(),
      ...message
    }]);
  };

  // Cambiar usuario
  const changeUser = (userId) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      // Reiniciar mensajes al cambiar usuario
      setMessages([]);
    }
  };

  // Limpiar chat
  const clearChat = () => {
    setMessages([]);
  };

  // Valor del contexto
  const value = {
    currentUser,
    changeUser,
    users: mockUsers,
    messages,
    setMessages,
    addMessage,
    isLoading,
    setIsLoading,
    isConnected,
    setIsConnected,
    isApiConfigured,
    clearChat,
    session,
    userRole,
    userAvatar,
    currentView,
    setCurrentView,
    signOut: () => supabase.auth.signOut()
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook para usar el contexto
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe usarse dentro de un AppProvider');
  }
  return context;
};

export default AppContext;
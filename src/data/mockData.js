// Datos mock para usuarios de prueba
// Este archivo contiene los datos de 3 usuarios diferentes para demo/testing

export const mockUsers = [
  {
    id: 'user-001',
    nombre: 'Juan Pérez García',
    email: 'juan.perez@cooperativa.coop',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Juan&backgroundColor=b6e3f4',
    telefono: '+57 300 123 4567',
    
    // Cuentas
    ahorroTotal: 45000000,
    aportes: 28500000,
    saldoCreditos: 12500000,
    
    // Productos de crédito activos
    productosCredito: [
      {
        id: 'cred-001',
        nombre: 'Crédito de Consumo',
        tipo: 'consumo',
        monto: 8000000,
        tasa: '1.2%',
        cuotasPagadas: 18,
        cuotasTotal: 24,
        estado: 'vigente',
        proximaCuota: '2026-05-15'
      },
      {
        id: 'cred-002',
        nombre: 'Crédito de Vehículo',
        tipo: 'vehículo',
        monto: 45000000,
        tasa: '0.9%',
        cuotasPagadas: 12,
        cuotasTotal: 48,
        estado: 'vigente',
        proximaCuota: '2026-05-20'
      }
    ],
    
    // Transacciones recientes
    transacciones: [
      { id: 'tx-001', tipo: 'depósito', monto: 1500000, fecha: '2026-04-15', descripcion: 'Aporte mensual' },
      { id: 'tx-002', tipo: 'retiro', monto: 500000, fecha: '2026-04-10', descripcion: 'Retiro ahorro voluntario' },
      { id: 'tx-003', tipo: 'pago', monto: 450000, fecha: '2026-04-05', descripcion: 'Cuota crédito consumo' },
      { id: 'tx-004', tipo: 'depósito', monto: 2000000, fecha: '2026-04-01', descripcion: 'Aporte trimestral' }
    ],
    
    // Objetivos de ahorro
    objetivosAhorro: [
      {
        id: 'obj-001',
        nombre: 'Fondo de Emergencia',
        tipo: 'emergencia',
        icono: '🛡️',
        montoActual: 8500000,
        montoObjetivo: 12000000,
        fechaObjetivo: '2026-12-31',
        prioridad: 'alta'
      },
      {
        id: 'obj-002',
        nombre: 'Universidad de Sofía',
        tipo: 'educacion',
        icono: '🎓',
        montoActual: 18000000,
        montoObjetivo: 40000000,
        fechaObjetivo: '2030-01-15',
        prioridad: 'alta'
      },
      {
        id: 'obj-003',
        nombre: 'Vacaciones Familiares',
        tipo: 'vacaciones',
        icono: '🏖️',
        montoActual: 3500000,
        montoObjetivo: 8000000,
        fechaObjetivo: '2026-08-01',
        prioridad: 'media'
      }
    ],
    
    // Salud financiera
    nivelSaludFinanciera: 'excelente',
    puntuacionSalud: 92,
    historialPagos: 'excelente',
    capacidadEndeudamiento: 'buena',
    
    // Productos sugeridos
    productosSugeridos: [
      {
        id: 'prod-001',
        nombre: 'Crédito para Mejora de Hogar',
        descripcion: 'Financia remodelaciones, ampliación o mejoras en tu vivienda',
        montoMin: 5000000,
        montoMax: 50000000,
        tasa: '1.0%',
        requisitos: 'Ser asociado mínimo 12 meses',
        recomendado: true,
        razon: 'Tu historial crediticio es excelente y tienes capacidad disponible'
      },
      {
        id: 'prod-002',
        nombre: 'Seguro de Vida Grupal',
        descripcion: 'Protege a tu familia con cobertura de vida a bajo costo',
        costo: '25,000/mes',
        cobertura: '50,000,000',
        requisitos: 'Ser asociado activo',
        recomendado: true,
        razon: 'Complementa tu planificación financiera familiar'
      }
    ],
    
    // Tips personalizados
    tipsPersonalizados: [
      '¡Excelente! Tu capacidad de ahorro ha aumentado un 15% este trimestre',
      'Considera aumentar tu fondo de emergencia, vas muy bien!',
      'Tu crédito de vehículo está al día, muy buen manejo de obligaciones'
    ]
  },
  
  {
    id: 'user-002',
    nombre: 'María González Torres',
    email: 'maria.gonzalez@cooperativa.coop',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Maria&backgroundColor=ffd5dc',
    telefono: '+57 310 234 5678',
    
    // Cuentas
    ahorroTotal: 12800000,
    aportes: 8500000,
    saldoCreditos: 0,
    
    // Productos de crédito activos
    productosCredito: [],
    
    // Transacciones recientes
    transacciones: [
      { id: 'tx-001', tipo: 'depósito', monto: 800000, fecha: '2026-04-15', descripcion: 'Aporte mensual' },
      { id: 'tx-002', tipo: 'depósito', monto: 4300000, fecha: '2026-04-01', descripcion: 'Apertura ahorro programatico' }
    ],
    
    // Objetivos de ahorro
    objetivosAhorro: [
      {
        id: 'obj-001',
        nombre: 'Capital para Negocio de Repostería',
        tipo: 'negocio',
        icono: '🧁',
        montoActual: 6000000,
        montoObjetivo: 15000000,
        fechaObjetivo: '2027-03-01',
        prioridad: 'alta'
      },
      {
        id: 'obj-002',
        nombre: 'Fondo de Emergencia',
        tipo: 'emergencia',
        icono: '🛡️',
        montoActual: 2000000,
        montoObjetivo: 6000000,
        fechaObjetivo: '2026-09-01',
        prioridad: 'alta'
      }
    ],
    
    // Salud financiera
    nivelSaludFinanciera: 'bueno',
    puntuacionSalud: 78,
    historialPagos: 'sin historial',
    capacidadEndeudamiento: 'excelente',
    
    // Productos sugeridos
    productosSugeridos: [
      {
        id: 'prod-001',
        nombre: 'Crédito para Microempresa',
        descripcion: 'Financia tu negocio de repostería con tasas preferenciales',
        montoMin: 3000000,
        montoMax: 15000000,
        tasa: '0.8%',
        requisitos: 'Ser asociada mínimo 6 meses, proyecto aprobado',
        recomendado: true,
        razon: 'Perfecto para alcanzar tu objetivo de capital de trabajo'
      },
      {
        id: 'prod-002',
        nombre: 'Ahorro Programado Plus',
        descripcion: 'Rendimientos superiores con depósitos fijos mensuales',
        tasa: '6.5% EA',
        montoMin: 100000,
        requisitos: 'Depósito mínimo mensual de $200,000',
        recomendado: false,
        razon: 'Optimiza el rendimiento de tus ahorros'
      }
    ],
    
    // Tips personalizados
    tipsPersonalizados: [
      'Vas muy bien con tu objetivo de negocio! Ya alcanzaste el 40%',
      'Te recomiendo priorizar el fondo de emergencia antes del negocio',
      'Tu capacidad de endeudamiento es excelente, un crédito te ayudaría a acelerar tus metas'
    ]
  },
  
  {
    id: 'user-003',
    nombre: 'Carlos Rodríguez Meyers',
    email: 'carlos.rodriguez@cooperativa.coop',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Carlos&backgroundColor=c0aede',
    telefono: '+57 315 345 6789',
    
    // Cuentas
    ahorroTotal: 2850000,
    aportes: 1800000,
    saldoCreditos: 4200000,
    
    // Productos de crédito activos
    productosCredito: [
      {
        id: 'cred-001',
        nombre: 'Crédito de Consumo',
        tipo: 'consumo',
        monto: 5000000,
        tasa: '1.5%',
        cuotasPagadas: 8,
        cuotasTotal: 24,
        estado: 'vigente',
        proximaCuota: '2026-05-10',
        cuotaActual: 285000
      }
    ],
    
    // Transacciones recientes
    transacciones: [
      { id: 'tx-001', tipo: 'depósito', monto: 450000, fecha: '2026-04-14', descripcion: 'Aporte mensual' },
      { id: 'tx-002', tipo: 'pago', monto: 285000, fecha: '2026-04-10', descripcion: 'Cuota crédito' },
      { id: 'tx-003', tipo: 'retiro', monto: 200000, fecha: '2026-04-05', descripcion: 'Retiro de emergencia' }
    ],
    
    // Objetivos de ahorro
    objetivosAhorro: [
      {
        id: 'obj-001',
        nombre: 'Fondo de Emergencia',
        tipo: 'emergencia',
        icono: '🛡️',
        montoActual: 800000,
        montoObjetivo: 3000000,
        fechaObjetivo: '2027-01-01',
        prioridad: 'alta'
      }
    ],
    
    // Salud financiera
    nivelSaludFinanciera: 'atencion',
    puntuacionSalud: 45,
    historialPagos: 'regular',
    capacidadEndeudamiento: 'limitada',
    
    // Productos sugeridos
    productosSugeridos: [
      {
        id: 'prod-001',
        nombre: 'Asesoría Financiera Gratuita',
        descripcion: 'Sesión con asesor para reorganizar tus finanzas',
        costo: 'Gratis',
        duracion: '45 minutos',
        requisitos: 'Ser asociado',
        recomendado: true,
        razon: 'Te可以帮助á a establecer un plan de recuperación financiera'
      },
      {
        id: 'prod-002',
        nombre: 'Plan de Fortalecimiento de Ahorros',
        descripcion: 'Programa guiado para mejorar tu capacidad de ahorro',
        duracion: '6 meses',
        requisitos: 'Tener objetivos de ahorro activos',
        recomendado: true,
        razon: 'Te ayudará a recuperar tu salud financiera'
      }
    ],
    
    // Tips personalizados
    tipsPersonalizados: [
      'Tu cuota de crédito representa el 45% de tus ingresos, considera ajustar tu presupuesto',
      'Te recomiendo agendar una asesoría financiera para reorganizar tus finanzas',
      'Pequeños ajustes en tus gastos pueden hacer una gran diferencia!',
      'Tu objetivo de fondo de emergencia es fundamental para tu estabilidad'
    ]
  }
];

// Funciones helper para formato de datos
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPercentage = (value) => {
  return `${value}%`;
};

export const getHealthColor = (nivel) => {
  const colors = {
    excelente: '#4CAF50',
    bueno: '#8BC34A',
    regular: '#FF9800',
    atencion: '#F44336'
  };
  return colors[nivel] || colors.regular;
};

export const getHealthLabel = (nivel) => {
  const labels = {
    excelente: 'Excelente',
    bueno: 'Bueno',
    regular: 'Regular',
    atencion: 'Requiere Atención'
  };
  return labels[nivel] || labels.regular;
};

// Mensajes de bienvenida para el chat
export const welcomeMessages = [
  "¡Hola! Soy IA-COOP, tu asistente financiero. ¿En qué puedo ayudarte hoy?",
  "Bienvenido a IA-COOP. Puedo ayudarte con información sobre tus cuentas, productos y metas de ahorro. ¿Qué necesitas?"
];

// Quick actions para el chat
export const quickActions = [
  { id: 'qa-1', texto: '¿Cuánto tengo ahorrado?', query: '¿Cuánto es mi saldo total de ahorros?' },
  { id: 'qa-2', texto: 'Mis productos de crédito', query: 'Muéstrame mis productos de crédito activos' },
  { id: 'qa-3', texto: 'Mis objetivos de ahorro', query: 'Cuáles son mis objetivos de ahorro actuales?' },
  { id: 'qa-4', texto: 'Productos recomendados', query: 'Qué productos me recomiendan?' },
  { id: 'qa-5', texto: 'Mi salud financiera', query: 'Cómo está mi salud financiera?' },
  { id: 'qa-6', texto: 'Sugiere un objetivo', query: 'Qué objetivo de ahorro me recomiendas?' }
];
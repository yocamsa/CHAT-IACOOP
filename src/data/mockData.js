// Datos mock para usuarios de prueba
// Este archivo contiene los datos de 3 usuarios diferentes para demo/testing

export const mockUsers = [
  {
    id: 'user-001',
    nombre: 'Juan Pérez García',
    email: 'juan.perez@cooperativa.coop',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
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
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
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
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
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
  },
  {
    id: 'user-004',
    nombre: 'Ana Martínez Vargas',
    email: 'ana.martinez@cooperativa.coop',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    telefono: '+57 320 456 7890',
    ahorroTotal: 3500000,
    aportes: 1200000,
    saldoCreditos: 0,
    productosCredito: [],
    transacciones: [
      { id: 'tx-001', tipo: 'depósito', monto: 300000, fecha: '2026-04-20', descripcion: 'Aporte mensual' },
      { id: 'tx-002', tipo: 'depósito', monto: 1500000, fecha: '2026-04-15', descripcion: 'Prima salarial' }
    ],
    objetivosAhorro: [
      {
        id: 'obj-001',
        nombre: 'Viaje a Europa',
        tipo: 'vacaciones',
        icono: '✈️',
        montoActual: 2000000,
        montoObjetivo: 10000000,
        fechaObjetivo: '2027-06-15',
        prioridad: 'alta'
      }
    ],
    nivelSaludFinanciera: 'bueno',
    puntuacionSalud: 85,
    historialPagos: 'sin historial',
    capacidadEndeudamiento: 'excelente',
    productosSugeridos: [
      {
        id: 'prod-001',
        nombre: 'Tarjeta de Crédito Joven',
        descripcion: 'Ideal para construir historial crediticio',
        cupo: '2,000,000',
        tasa: '1.9%',
        requisitos: 'Ingresos comprobables',
        recomendado: true,
        razon: 'Empieza a crear tu historial crediticio sin cuota de manejo'
      }
    ],
    tipsPersonalizados: [
      'Excelente hábito de ahorro, mantén la disciplina.',
      'Considera adquirir tu primer producto de crédito para construir historial.'
    ]
  },
  {
    id: 'user-005',
    nombre: 'Luis Gómez Herrera',
    email: 'luis.gomez@cooperativa.coop',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    telefono: '+57 311 567 8901',
    ahorroTotal: 150000000,
    aportes: 85000000,
    saldoCreditos: 0,
    productosCredito: [],
    transacciones: [
      { id: 'tx-001', tipo: 'depósito', monto: 2500000, fecha: '2026-04-05', descripcion: 'Pensión mensual' },
      { id: 'tx-002', tipo: 'retiro', monto: 1000000, fecha: '2026-04-10', descripcion: 'Gastos médicos' }
    ],
    objetivosAhorro: [
      {
        id: 'obj-001',
        nombre: 'Remodelación Finca',
        tipo: 'hogar',
        icono: '🏡',
        montoActual: 45000000,
        montoObjetivo: 50000000,
        fechaObjetivo: '2026-08-01',
        prioridad: 'media'
      }
    ],
    nivelSaludFinanciera: 'excelente',
    puntuacionSalud: 98,
    historialPagos: 'excelente',
    capacidadEndeudamiento: 'alta',
    productosSugeridos: [
      {
        id: 'prod-001',
        nombre: 'CDT Premium',
        descripcion: 'Rentabilidad fija y segura para tu capital',
        tasa: '11.5% EA',
        montoMin: 10000000,
        requisitos: 'Depósito a 360 días',
        recomendado: true,
        razon: 'Maximiza el rendimiento de tus ahorros con bajo riesgo'
      }
    ],
    tipsPersonalizados: [
      'Tu salud financiera es ejemplar.',
      'Te recomendamos invertir parte de tus ahorros a plazo fijo para combatir la inflación.'
    ]
  },
  {
    id: 'user-006',
    nombre: 'Sofía Silva Ríos',
    email: 'sofia.silva@cooperativa.coop',
    avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
    telefono: '+57 314 678 9012',
    ahorroTotal: 800000,
    aportes: 400000,
    saldoCreditos: 15000000,
    productosCredito: [
      {
        id: 'cred-001',
        nombre: 'Crédito Educativo',
        tipo: 'educación',
        monto: 15000000,
        tasa: '0.5%',
        cuotasPagadas: 12,
        cuotasTotal: 60,
        estado: 'vigente',
        proximaCuota: '2026-05-05',
        cuotaActual: 300000
      }
    ],
    transacciones: [
      { id: 'tx-001', tipo: 'pago', monto: 300000, fecha: '2026-04-05', descripcion: 'Cuota universidad' },
      { id: 'tx-002', tipo: 'depósito', monto: 150000, fecha: '2026-04-15', descripcion: 'Mesada familiar' }
    ],
    objetivosAhorro: [
      {
        id: 'obj-001',
        nombre: 'Computador Portátil',
        tipo: 'tecnología',
        icono: '💻',
        montoActual: 500000,
        montoObjetivo: 2500000,
        fechaObjetivo: '2026-11-30',
        prioridad: 'alta'
      }
    ],
    nivelSaludFinanciera: 'regular',
    puntuacionSalud: 65,
    historialPagos: 'bueno',
    capacidadEndeudamiento: 'baja',
    productosSugeridos: [
      {
        id: 'prod-001',
        nombre: 'Seguro de Desempleo Familiar',
        descripcion: 'Cubre tus cuotas educativas ante eventualidades',
        costo: '15,000/mes',
        requisitos: 'Crédito activo',
        recomendado: true,
        razon: 'Protege tu continuidad académica'
      }
    ],
    tipsPersonalizados: [
      'Buen manejo de tu crédito educativo.',
      'Ahorrar pequeñas cantidades mensualmente te acercará a tu nuevo computador.'
    ]
  },
  {
    id: 'user-007',
    nombre: 'Andrés Ramírez Soto',
    email: 'andres.ramirez@cooperativa.coop',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    telefono: '+57 318 789 0123',
    ahorroTotal: 8500000,
    aportes: 3200000,
    saldoCreditos: 2000000,
    productosCredito: [
      {
        id: 'cred-001',
        nombre: 'Crédito Rotativo',
        tipo: 'consumo',
        monto: 2000000,
        tasa: '2.1%',
        cuotasPagadas: 5,
        cuotasTotal: 36,
        estado: 'vigente',
        proximaCuota: '2026-05-18',
        cuotaActual: 150000
      }
    ],
    transacciones: [
      { id: 'tx-001', tipo: 'depósito', monto: 3500000, fecha: '2026-04-10', descripcion: 'Pago proyecto freelance' },
      { id: 'tx-002', tipo: 'retiro', monto: 1200000, fecha: '2026-04-12', descripcion: 'Pago arriendo y servicios' }
    ],
    objetivosAhorro: [
      {
        id: 'obj-001',
        nombre: 'Reserva para Impuestos',
        tipo: 'obligaciones',
        icono: '📊',
        montoActual: 2000000,
        montoObjetivo: 4500000,
        fechaObjetivo: '2026-08-15',
        prioridad: 'alta'
      }
    ],
    nivelSaludFinanciera: 'bueno',
    puntuacionSalud: 72,
    historialPagos: 'bueno',
    capacidadEndeudamiento: 'media',
    productosSugeridos: [
      {
        id: 'prod-001',
        nombre: 'Cuenta de Ahorro para Independientes',
        descripcion: 'Separación de finanzas personales y laborales',
        tasa: '4.0% EA',
        requisitos: 'RUT actualizado',
        recomendado: true,
        razon: 'Te ayudará a organizar tus ingresos variables'
      }
    ],
    tipsPersonalizados: [
      'Al ser independiente, mantén siempre un fondo de liquidez equivalente a 3 meses de gastos.',
      'Excelente iniciativa ahorrar para tus obligaciones tributarias.'
    ]
  },
  {
    id: 'user-008',
    nombre: 'Laura Castro Pineda',
    email: 'laura.castro@cooperativa.coop',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    telefono: '+57 319 890 1234',
    ahorroTotal: 1200000,
    aportes: 1000000,
    saldoCreditos: 35000000,
    productosCredito: [
      {
        id: 'cred-001',
        nombre: 'Crédito de Libre Inversión',
        tipo: 'consumo',
        monto: 25000000,
        tasa: '1.8%',
        cuotasPagadas: 10,
        cuotasTotal: 48,
        estado: 'vigente',
        proximaCuota: '2026-05-25',
        cuotaActual: 850000
      },
      {
        id: 'cred-002',
        nombre: 'Tarjeta de Crédito',
        tipo: 'tarjeta',
        monto: 10000000,
        tasa: '2.5%',
        cuotasPagadas: 0,
        cuotasTotal: 24,
        estado: 'vigente',
        proximaCuota: '2026-05-15',
        cuotaActual: 650000
      }
    ],
    transacciones: [
      { id: 'tx-001', tipo: 'pago', monto: 1500000, fecha: '2026-04-20', descripcion: 'Pago créditos' },
      { id: 'tx-002', tipo: 'depósito', monto: 2000000, fecha: '2026-04-01', descripcion: 'Nómina' }
    ],
    objetivosAhorro: [],
    nivelSaludFinanciera: 'atencion',
    puntuacionSalud: 35,
    historialPagos: 'regular',
    capacidadEndeudamiento: 'ninguna',
    productosSugeridos: [
      {
        id: 'prod-001',
        nombre: 'Compra de Cartera',
        descripcion: 'Unifica tus deudas y reduce tu cuota mensual',
        tasa: '1.2%',
        requisitos: 'Estar al día en pagos',
        recomendado: true,
        razon: 'Necesitas mejorar tu flujo de caja urgente'
      }
    ],
    tipsPersonalizados: [
      'Estás destinando el 75% de tus ingresos a pagar deudas. ¡Cuidado!',
      'Te recomendamos unificar tus obligaciones para disminuir tu carga mensual.'
    ]
  },
  {
    id: 'user-009',
    nombre: 'Diego Ruiz Ocampo',
    email: 'diego.ruiz@cooperativa.coop',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    telefono: '+57 300 901 2345',
    ahorroTotal: 280000000,
    aportes: 120000000,
    saldoCreditos: 150000000,
    productosCredito: [
      {
        id: 'cred-001',
        nombre: 'Crédito Hipotecario VIP',
        tipo: 'vivienda',
        monto: 150000000,
        tasa: '0.8%',
        cuotasPagadas: 36,
        cuotasTotal: 180,
        estado: 'vigente',
        proximaCuota: '2026-05-01',
        cuotaActual: 1800000
      }
    ],
    transacciones: [
      { id: 'tx-001', tipo: 'depósito', monto: 15000000, fecha: '2026-04-02', descripcion: 'Rendimientos inversiones' },
      { id: 'tx-002', tipo: 'pago', monto: 1800000, fecha: '2026-04-01', descripcion: 'Cuota hipotecaria' }
    ],
    objetivosAhorro: [
      {
        id: 'obj-001',
        nombre: 'Fondo Inversión Extranjera',
        tipo: 'inversion',
        icono: '📈',
        montoActual: 50000000,
        montoObjetivo: 200000000,
        fechaObjetivo: '2027-12-31',
        prioridad: 'media'
      }
    ],
    nivelSaludFinanciera: 'excelente',
    puntuacionSalud: 95,
    historialPagos: 'excelente',
    capacidadEndeudamiento: 'alta',
    productosSugeridos: [
      {
        id: 'prod-001',
        nombre: 'Servicio de Banca Patrimonial',
        descripcion: 'Asesoría exclusiva para diversificación de portafolios',
        costo: 'Personalizado',
        requisitos: 'Saldos superiores a $200M',
        recomendado: true,
        razon: 'Optimiza la estructura de tu patrimonio'
      }
    ],
    tipsPersonalizados: [
      'Tienes una estructura financiera muy sólida y diversificada.',
      'Explora nuestras opciones de fondos mutuos internacionales.'
    ]
  },
  {
    id: 'user-010',
    nombre: 'Elena Vega Mora',
    email: 'elena.vega@cooperativa.coop',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    telefono: '+57 312 012 3456',
    ahorroTotal: 18000000,
    aportes: 9500000,
    saldoCreditos: 85000000,
    productosCredito: [
      {
        id: 'cred-001',
        nombre: 'Crédito Hipotecario VIS',
        tipo: 'vivienda',
        monto: 85000000,
        tasa: '0.9%',
        cuotasPagadas: 24,
        cuotasTotal: 240,
        estado: 'vigente',
        proximaCuota: '2026-05-10',
        cuotaActual: 850000
      }
    ],
    transacciones: [
      { id: 'tx-001', tipo: 'depósito', monto: 3500000, fecha: '2026-04-15', descripcion: 'Nómina' },
      { id: 'tx-002', tipo: 'pago', monto: 850000, fecha: '2026-04-10', descripcion: 'Cuota apartamento' },
      { id: 'tx-003', tipo: 'depósito', monto: 200000, fecha: '2026-04-20', descripcion: 'Ahorro programado infantil' }
    ],
    objetivosAhorro: [
      {
        id: 'obj-001',
        nombre: 'Educación Hijos',
        tipo: 'educación',
        icono: '🎒',
        montoActual: 4500000,
        montoObjetivo: 20000000,
        fechaObjetivo: '2032-02-01',
        prioridad: 'alta'
      }
    ],
    nivelSaludFinanciera: 'bueno',
    puntuacionSalud: 82,
    historialPagos: 'excelente',
    capacidadEndeudamiento: 'media',
    productosSugeridos: [
      {
        id: 'prod-001',
        nombre: 'Cuenta Junior',
        descripcion: 'Enseña a tus hijos a ahorrar con su primera cuenta',
        tasa: '3.0% EA',
        requisitos: 'Menores de edad',
        recomendado: true,
        razon: 'Fomenta el hábito del ahorro en tu familia'
      }
    ],
    tipsPersonalizados: [
      'El pago puntual de tu vivienda fortalece tu calificación crediticia.',
      'Excelente la disciplina de ahorro para la educación futura de tus hijos.'
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
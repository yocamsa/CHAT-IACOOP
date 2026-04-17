// Servicio de comunicación con DeepSeek API
// Configuración tomada de variables de entorno

const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const BASE_URL = import.meta.env.VITE_DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
const MODEL = import.meta.env.VITE_DEEPSEEK_MODEL || 'deepseek-chat';

// Verificar si la API está configurada
export const isApiConfigured = () => {
  return API_KEY && API_KEY !== 'your_api_key_here' && API_KEY.length > 0;
};

// Construir el prompt del sistema con contexto del usuario
export const buildSystemPrompt = (user) => {
  const context = `
Eres IA-COOP, el asistente financiero personalizado de la Cooperativa.
Tu rol es ser un coach financiero amigable y profesional.

INFORMACIÓN DEL USUARIO ACTUAL:
- Nombre: ${user.nombre}
- Total ahorros: $${user.ahorroTotal.toLocaleString('es-CO')}
- Total aportes: $${user.aportes.toLocaleString('es-CO')}
- Saldo en créditos: $${user.saldoCreditos.toLocaleString('es-CO')}
- Nivel de salud financiera: ${user.nivelSaludFinanciera}
- Puntuación: ${user.puntuacionSalud}/100

PRODUCTOS DE CRÉDITO ACTIVOS:
${user.productosCredito.length > 0 
  ? user.productosCredito.map(p => `- ${p.nombre}: $${p.monto.toLocaleString('es-CO')} (${p.tasa}), ${p.cuotasPagadas}/${p.cuotasTotal} cuotas`).join('\n')
  : 'Sin productos de crédito activos'}

OBJETIVOS DE AHORRO:
${user.objetivosAhorro.map(o => 
  `- ${o.nombre} (${o.icono}): $${o.montoActual.toLocaleString('es-CO')} / $${o.montoObjetivo.toLocaleString('es-CO')} (${Math.round((o.montoActual/o.montoObjetivo)*100)}%) - Meta: ${o.fechaObjetivo}`
).join('\n')}

PRODUCTOS SUGERIDOS:
${user.productosSugeridos.map(p => 
  `- ${p.nombre}: ${p.descripcion.substring(0,100)}... (${p.recomendado ? 'RECOMENDADO' : ''})`
).join('\n')}

INSTRUCCIONES:
1. Usa el nombre del usuario para personalizar la conversación
2. Proporciona información precisa basada en sus datos
3. Sé amigable, profesional y motivador
4. Cuando detectes oportunidades de ahorro o inversión, recomiéndalas
5. Si el usuario necesita atención financiera, sugiere asesoría profesional
6. Usa emojis para hacer la conversación más amena
7. Mantén las respuestas concisas pero informativas
8. Si no tienes información suficiente, pregunta al usuario

CONOCIMIENTO GENERAL (para responder preguntas financieras):
- Puedes explicar conceptos de ahorro, crédito, inversiones
- Puedes calcular proyecciones de ahorro
- Puedes explicar productos financieros de manera simple
- Puedes dar consejos de salud financiera general
`;

  return context;
};

// Enviar mensaje a DeepSeek
export const sendMessageToDeepSeek = async (messages, user) => {
  if (!isApiConfigured()) {
    throw new Error('API key no configurada');
  }

  const systemMessage = {
    role: 'system',
    content: buildSystemPrompt(user)
  };

  // Construir mensajes para la API
  const apiMessages = [
    systemMessage,
    ...messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }))
  ];

  try {
    const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 1024,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la comunicación con la API');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw error;
  }
};

// Respuestas predefinidas para cuando no hay API
export const fallbackResponses = {
  saldo: (user) => `💰 Hola ${user.nombre.split(' ')[0]}! 

Tu situación financiera actual:
- **Total Ahorros**: $${user.ahorroTotal.toLocaleString('es-CO')}
- **Aportes**: $${user.aportes.toLocaleString('es-CO')}
- **Saldo en Créditos**: $${user.saldoCreditos.toLocaleString('es-CO')}

Tu nivel de salud financiera es: *${user.nivelSaludFinanciera.toUpperCase()}* (${user.puntuacionSalud}/100)

¿En qué más puedo ayudarte?`,

  creditos: (user) => {
    if (user.productosCredito.length === 0) {
      return `📋 ${user.nombre.split(' ')[0]}, actualmente no tienes productos de crédito activos. 
  
¿Te gustaría conocer nuestras opciones de crédito? Tenemos tasas preferenciales para asociados.`;
    }
    
    return `📋 ${user.nombre.split(' ')[0]}, estos son tus productos de crédito activos:

${user.productosCredito.map(p => `
**${p.nombre}**
- Monto: $${p.monto.toLocaleString('es-CO')}
- Tasa: ${p.tasa}
- Progreso: ${p.cuotasPagadas}/${p.cuotasTotal} cuotas
- Próxima cuota: ${p.proximaCuota}
`).join('\n')}

¿En qué más puedo ayudarte sobre tus créditos?`;
  },

  objetivos: (user) => {
    if (user.objetivosAhorro.length === 0) {
      return `🎯 ${user.nombre.split(' ')[0]}, aún no tienes objetivos de ahorro definidos. 
  
¿Te gustaría que te ayude a crear uno? Puedo sugerirte objetivos basados en tus metas financieras.`;
    }

    return `🎯 ${user.nombre.split(' ')[0]}, estos son tus objetivos de ahorro:

${user.objetivosAhorro.map(o => {
  const progreso = Math.round((o.montoActual / o.montoObjetivo) * 100);
  return `${o.icono} **${o.nombre}**
  - Progreso: ${progreso}% ($${o.montoActual.toLocaleString('es-CO')} / $${o.montoObjetivo.toLocaleString('es-CO')})
  - Meta: ${o.fechaObjetivo}`;
}).join('\n\n')}

¿En qué más puedo ayudarte sobre tus metas de ahorro?`;
  },

  recomendaciones: (user) => `🎁 ${user.nombre.split(' ')[0]}, basándome en tu perfil, aquí tienes mis recomendaciones:

${user.productosSugeridos.map(p => `
**${p.nombre}**${p.recomendado ? ' ⭐' : ''}
${p.descripcion}
${p.razon ? `→ ${p.razon}` : ''}
`).join('\n')}

¿Te gustaría más información sobre alguno de estos productos?`,

  salud: (user) => `📊 ${user.nombre.split(' ')[0]}, aquí está tu evaluación de salud financiera:

- **Nivel**: ${user.nivelSaludFinanciera.toUpperCase()}
- **Puntuación**: ${user.puntuacionSalud}/100
- **Historial de pagos**: ${user.historialPagos}
- **Capacidad de endeudamiento**: ${user.capacidadEndeudamiento}

${user.tipsPersonalizados[0]}

¿En qué más puedo ayudarte?`,

  default: (user) => `¡Hola ${user.nombre.split(' ')[0]}! 👋

Soy IA-COOP, tu asistente financiero de la Cooperativa. Puedo ayudarte con:

💰 **Información de cuentas**: Saldos de ahorros y aportes
💳 **Productos de crédito**: Tus créditos activos y opciones
🎯 **Objetivos de ahorro**: Tus metas y progreso
🏦 **Recomendaciones**: Productos sugeridos para ti
📊 **Salud financiera**: Tu evaluación financiera

¿En qué puedo ayudarte hoy?`
};

// Obtener respuesta predefinida basada en la consulta
export const getFallbackResponse = (query, user) => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('saldo') || lowerQuery.includes('ahorrado') || lowerQuery.includes('cuánto')) {
    return fallbackResponses.saldo(user);
  }
  
  if (lowerQuery.includes('crédito') || lowerQuery.includes('producto') || lowerQuery.includes('deuda')) {
    return fallbackResponses.creditos(user);
  }
  
  if (lowerQuery.includes('objetivo') || lowerQuery.includes('meta') || lowerQuery.includes('ahorrar') || lowerQuery.includes('meta')) {
    return fallbackResponses.objetivos(user);
  }
  
  if (lowerQuery.includes('recomienda') || lowerQuery.includes('sugiere') || lowerQuery.includes('producto')) {
    return fallbackResponses.recomendaciones(user);
  }
  
  if (lowerQuery.includes('salud') || lowerQuery.includes('evaluación') || lowerQuery.includes('puntuación')) {
    return fallbackResponses.salud(user);
  }
  
  return fallbackResponses.default(user);
};
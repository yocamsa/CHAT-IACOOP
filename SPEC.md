# IA-COOP: Sistema de Servicio al Asociado con Inteligencia Artificial

## 1. Project Overview

**Nombre del Proyecto**: IA-COOP  
**Tipo**: Chatbot con IA + Dashboard de Recomendaciones Financieras  
**Funcionalidad Principal**: Asistente financiero conversacional hiper-personalizado para asociados de cooperativa que resuelve consultas sobre aportes, ahorros, productos de crédito y servicios. Incluye Coach Financiero Personal con objetivos de ahorro personalizados.  
**Usuarios Objetivo**: Asociados de cooperativa que buscan información financiera y recomendaciones personalizadas.

---

## 2. UI/UX Specification

### Layout Structure

**Vista Principal (Single Page Application con dos paneles)**:
- **Panel Izquierdo (70%)**: Chat conversacional con IA
- **Panel Derecho (30%)**: Panel de recomendaciones y objetivos financieros
- **Header**: Logo IA-COOP + Selector de usuario para demo/testing
- **Mobile**: Tabs para alternar entre Chat y Recomendaciones

### Responsive Breakpoints
- **Desktop**: ≥1024px - Dos paneles lado a lado
- **Tablet**: 768px-1023px - Chat ocupa 100%, panel de recomendaciones como overlay
- **Mobile**: <768px - Tabs de navegación entre Chat y Recomendaciones

### Visual Design

**Paleta de Colores**:
- Primary: `#1E3A5F` (Azul profundo cooperateivo - confianza)
- Secondary: `#2E7D32` (Verde cooperativa - crecimiento/ahorros)
- Accent: `#FF8F00` (Ámbar - energía/motivación)
- Background: `#F5F7FA` (Gris muy claro)
- Surface: `#FFFFFF` (Blanco)
- Text Primary: `#1A1A2E`
- Text Secondary: `#64748B`
- Success: `#4CAF50`
- Warning: `#FF9800`
- Error: `#F44336`

**Tipografía**:
- Headings: "Poppins", sans-serif (weights: 600, 700)
- Body: "Inter", sans-serif (weights: 400, 500, 600)
- Chat messages: "Inter", 15px
- Sizes: H1: 28px, H2: 22px, H3: 18px, Body: 15px, Small: 13px

**Spacing System** (8px base):
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, xxl: 48px

**Visual Effects**:
- Cards: `box-shadow: 0 2px 8px rgba(30, 58, 95, 0.08)`
- Hover cards: `box-shadow: 0 4px 16px rgba(30, 58, 95, 0.12)`
- Border radius: 12px (cards), 20px (chat bubbles user), 20px (chat bubbles AI)
- Animations: Fade-in 300ms, slide-up 400ms ease-out

### Components

**1. Header**:
- Logo IA-COOP (icono + texto)
- Dropdown selector de usuario demo (tres usuarios diferentes)
- Badge de estado de conexión

**2. Panel de Chat**:
- Lista de mensajes con scroll
- Mensajes del usuario: fondo azul primary, texto blanco, alineado derecha
- Mensajes IA: fondo blanco con borde verde, texto oscuro, alineado izquierda
- Typing indicator animado (tres puntos)
- Input con botón de envío, placeholder: "Escribe tu consulta..."
- Quick actions: botones de ejemplo bajo el input

**3. Panel de Recomendaciones**:
- **Sección Perfil**: Foto avatar, nombre, saldo total, nivel de salud financiera
- **Sección Productos Sugeridos**: Cards con productos recomendados
- **Sección Objetivos de Ahorro**: Progreso de objetivos activos con gráfica circular
- **Sección Recomendaciones AI**: Lista de tips financieros personalizados

**4. Tarjetas de Productos**:
- Icono del producto
- Nombre del producto
- Tasa/Monto
- Botón "Más información"
- Badge de "Recomendado para ti"

**5. Objetivos de Ahorro**:
- Nombre del objetivo
- Icono correspondiente (educación, emergencia, vacaciones, negocio)
- Barra de progreso con %
- Monto actual / Monto objetivo
- Fecha estimada de logro
- Botón "Ajustar objetivo"

---

## 3. Functionality Specification

### Core Features

**1. Chat con IA (DeepSeek)**:
- Envío de mensajes y receive de respuestas
- Contextualización con datos del usuario seleccionado
- Historial de conversación durante la sesión
- Indicador de "escribiendo..."
- Persistencia de historial en localStorage

**2. Selector de Usuario Demo**:
- 3 usuarios con diferentes perfiles:
  - **Usuario A**: Juan Pérez - Ahorrador establecido, productos de crédito activos
  - **Usuario B**: María González - Nuevas metas de ahorro, peuqeña empresa
  - **Usuario C**: Carlos Rodríguez - Saldo bajo, en proceso de recuperación
- Cambio instantánea actualiza datos del panel y contexto del chat

**3. Panel de Recomendaciones**:
- Datos dinámicos según usuario seleccionado
- Productos sugeridos personalizados
- Objetivos de ahorro con progreso
- Tips financieros del momento

**4. Integración DeepSeek**:
- Configuración via variables de entorno
- Sistema de prompts con contexto de usuario
- Manejo de errores graceful
- Fallback a respuestas predefinidas si API falla

### User Interactions

- Escribir mensaje → Enter o botón enviar
- Click en quick action → Envía mensaje predefinido
- Cambiar usuario → Reinicia chat y actualiza recomendaciones
- Scroll chat → Carga mensajes anteriores (si hay)
- Click en objetivo → Expandir detalles

### Data Handling

**Mock Data Users** (JSON):
```javascript
{
  id: string,
  nombre: string,
  avatar: string,
  saldoAhorros: number,
  saldoAportes: number,
  productosCredito: Product[],
  objetivosAhorro: SavingsGoal[],
  historialReciente: Transaction[],
  nivelSaludFinanciera: 'excelente' | 'bueno' | 'regular' | 'atencion',
  productosSugeridos: Product[],
  tipsPersonalizados: string[]
}
```

### Edge Cases
- API key no configurada → Mostrar advertencia, usar respuestas fallback
- Error de API → Mensaje de error amigable, reintento automático
- Usuario sin objetivos → Mostrar "Crea tu primer objetivo"
- Chat vacío → Mostrar mensajes de bienvenida + quick actions

---

## 4. Technical Stack

- **Frontend**: React 18 + Vite
- **Estilos**: CSS Modules o styled-components
- **Estado**: React Context + useState
- **API**: DeepSeek Chat API
- **Build**: Vite para desarrollo y producción

---

## 5. Acceptance Criteria

### Visual Checkpoints
- [ ] Header con logo y selector de usuario visible
- [ ] Chat conbubbles correctamente formateados (izq/derecha)
- [ ] Panel de recomendaciones muestra datos del usuario seleccionado
- [ ] Cambio de usuario actualiza toda la UI instantáneamente
- [ ] Responsive funciona en mobile (tabs)
- [ ] Animaciones suaves en mensajes y transiciones

### Functional Checkpoints
- [ ] Mensajes se envían y muestran en el chat
- [ ] Typing indicator aparece durante "generación" de respuesta
- [ ] Selector cambia entre 3 usuarios con datos diferentes
- [ ] Productos sugeridos varían por usuario
- [ ] Objetivos de ahorro muestran progreso correcto
- [ ] Configuración de API key funciona desde .env

### Data Checkpoints
- [ ] Usuario 1 (Juan): Ahorros altos, 2 créditos, objetivos avanzados
- [ ] Usuario 2 (María): Ahorros medios, 0 créditos, objetivos nuevos
- [ ] Usuario 3 (Carlos): Ahorros bajos, 1 crédito, necesita atención
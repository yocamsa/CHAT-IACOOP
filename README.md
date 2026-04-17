# IA-COOP: Asistente Financiero Inteligente

Prototipo de chatbot con IA para servicio al asociado de cooperativa financiera.

## Características

- 🤖 **Chat con IA**: Asistente conversacional impulsado por DeepSeek
- 💰 **Panel de Recomendaciones**: Dashboard financiero personalizado
- 👥 **Cambio de Usuario**: Demo con 3 usuarios diferentes para pruebas
- 📱 **Responsive**: Diseño adaptativo para desktop y mobile

## Usuarios de Demo

| Usuario | Perfil | Salud Financiera |
|---------|--------|------------------|
| Juan Pérez | Ahorrador establecido, 2 créditos activos | Excelente (92/100) |
| María González | Emprendedora, metas de ahorro nuevas | Buena (78/100) |
| Carlos Rodríguez | En proceso de recuperación financiera | Requiere atención (45/100) |

## Configuración

### 1. Variables de Entorno

Copia el archivo `.env.example` a `.env` y agrega tu API key de DeepSeek:

```bash
cp .env.example .env
```

Edita el archivo `.env` y reemplaza `your_api_key_here` con tu API key real:

```
VITE_DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
```

**Obtener API key**: https://platform.deepseek.com/

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

## Uso

1. **Selector de usuario**: Usa el dropdown en el header para cambiar entre los 3 usuarios demo
2. **Chat**: Escribe tus preguntas o usa las acciones rápidas (quick actions)
3. **Recomendaciones**: Panel derecho muestra tu información financiera actualizada

## Preguntas de Ejemplo

- "¿Cuánto tengo ahorrado?"
- "¿Cuáles son mis productos de crédito?"
- "¿Cómo voy con mis objetivos de ahorro?"
- "¿Qué productos me recomiendan?"
- "¿Cuál es mi salud financiera?"

## Tecnologías

- React 18 + Vite
- CSS Variables para theming
- DeepSeek Chat API

## Notas

- Sin API key configurada, el sistema usa respuestas predefinidas (fallback)
- Los datos son mock y se reinician al cambiar de usuario
- El chat se limpia automáticamente al cambiar de usuario
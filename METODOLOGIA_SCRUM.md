# 🏃‍♂️ Metodología Scrum - Desarrollo del Proyecto

## 👥 Equipo de Desarrollo

### **Team Retail Analytics**

| Miembro | Rol Scrum | Especialidad | Responsabilidades |
|---------|-----------|--------------|-------------------|
| **Juliana** | **Scrum Master & Full Stack Developer** | Arquitectura & Deployment | • Facilitación del proceso Scrum<br>• Arquitectura del sistema<br>• Deploy en Render<br>• Documentación técnica |
| **Isabela** | **Product Owner & Frontend Developer** | UI/UX & Analytics | • Definición de requisitos<br>• Diseño de interfaces<br>• Dashboard y visualizaciones<br>• Testing de usuario |
| **Alejandro** | **Development Team & Backend Developer** | Backend & Database | • API REST con Express<br>• Modelos de MongoDB<br>• Lógica de negocio<br>• Sistema de recomendaciones |

---

## 📅 Sprint Planning

### **Sprint Único - Hackathon (8 horas)**

Debido a las restricciones de tiempo del hackathon, implementamos un **Sprint intensivo** dividido en 4 fases siguiendo Design Thinking + Scrum.

---

## 🎯 FASE 1: IDEAR & PLANNING (1 hora)

### **Sprint Planning Meeting**

**Participantes:** Juliana, Isabela, Alejandro  
**Duración:** 60 minutos

### **Product Backlog Inicial:**

| ID | User Story | Story Points | Prioridad | Asignado |
|----|------------|--------------|-----------|----------|
| US-01 | Como usuario quiero ver un dashboard con KPIs | 8 | ALTA | Isabela |
| US-02 | Como usuario quiero gestionar productos | 5 | ALTA | Alejandro |
| US-03 | Como usuario quiero ver historial de ventas | 3 | ALTA | Alejandro |
| US-04 | Como usuario quiero análisis avanzados | 8 | ALTA | Isabela |
| US-05 | Como usuario quiero login seguro | 5 | ALTA | Juliana |
| US-06 | Como admin quiero recomendaciones automáticas | 5 | MEDIA | Alejandro |
| US-07 | Como usuario quiero filtrar por fechas | 3 | MEDIA | Isabela |
| US-08 | Como admin quiero alertas de stock bajo | 3 | MEDIA | Juliana |

### **Sprint Goal:**
> "Entregar un MVP funcional con dashboard interactivo, gestión de productos, análisis de ventas y recomendaciones automáticas desplegado en producción"

### **Definition of Done (DoD):**
```
✅ Código funcional y testeado manualmente
✅ Integrado en rama main
✅ Documentado en código
✅ Responsive design
✅ Deploy exitoso en Render
✅ Datos de prueba cargados
```

### **Decisiones Técnicas (Team Agreement):**

**Stack Acordado:**
- Frontend: React + Vite + TailwindCSS (Isabela)
- Backend: Node.js + Express + MongoDB (Alejandro)
- Deploy: Render fullstack (Juliana)
- Control de versiones: GitHub (Todos)

**Convenciones de Código:**
- ES Modules (import/export)
- Nombres en inglés para código
- Comentarios en español
- Commits descriptivos en español
- Branch strategy: main + feature branches

---

## 🔨 FASE 2: PROTOTIPAR & DEVELOPMENT (5 horas)

### **Sprint Backlog - Tareas Específicas:**

#### **Hour 1-2: Setup & Fundamentos**

**Juliana (Scrum Master/Infra):**
```
✅ [30min] Crear estructura del proyecto
✅ [15min] Configurar package.json
✅ [15min] Configurar MongoDB Atlas
✅ [30min] Setup Express server
✅ [15min] Configurar variables de entorno
✅ [15min] Implementar middleware de seguridad
```

**Isabela (Frontend):**
```
✅ [30min] Setup React + Vite
✅ [30min] Configurar TailwindCSS
✅ [30min] Crear estructura de componentes
✅ [30min] Diseñar página de Login
```

**Alejandro (Backend):**
```
✅ [45min] Crear modelos (User, Product, Sale)
✅ [30min] Implementar autenticación JWT
✅ [45min] Crear controllers básicos
```

#### **Hour 3-4: Features Core**

**Isabela (Frontend):**
```
✅ [60min] Desarrollar Dashboard
        - KPI Cards
        - Gráficos con Recharts
✅ [60min] Página de Productos
        - Tabla dinámica
        - Filtros
        - Búsqueda
```

**Alejandro (Backend):**
```
✅ [45min] APIs de Products (CRUD)
✅ [45min] APIs de Sales
✅ [30min] Script de seed data
```

**Juliana (Fullstack):**
```
✅ [30min] Integración Frontend-Backend
✅ [30min] Context de autenticación
✅ [30min] Protected routes
✅ [30min] Testing de integración
```

#### **Hour 5-6: Features Avanzados**

**Isabela (Frontend):**
```
✅ [60min] Página de Analytics
        - 6+ gráficos
        - Filtros temporales
✅ [60min] Página de Ventas
        - Historial
        - Estadísticas
```

**Alejandro (Backend):**
```
✅ [60min] Analytics controller
        - Aggregation pipelines
        - KPIs calculation
✅ [60min] Sistema de recomendaciones
        - 3 algoritmos
        - Priorización
```

**Juliana (Deploy):**
```
✅ [30min] Configurar Render
✅ [30min] Variables de entorno producción
✅ [30min] Build scripts
✅ [30min] Testing en producción
```

### **Daily Scrum (Cada hora)**

Debido al sprint corto, realizamos "mini stand-ups" cada hora:

**Formato:**
```
1. ¿Qué hice en la última hora?
2. ¿Qué haré en la próxima hora?
3. ¿Tengo algún impedimento?
```

**Ejemplo Stand-up Hora 3:**

**Juliana:**
- ✅ Hice: Setup completo del servidor, MongoDB conectado
- 🎯 Haré: Integrar auth y protected routes
- ⚠️ Impedimento: Ninguno

**Isabela:**
- ✅ Hice: Login page y setup de Tailwind
- 🎯 Haré: Dashboard con gráficos
- ⚠️ Impedimento: Necesito API de analytics (Alejandro)

**Alejandro:**
- ✅ Hice: Modelos y auth controller
- 🎯 Haré: Analytics controller para Isabela
- ⚠️ Impedimento: Ninguno

---

## 🧪 FASE 3: TESTEAR & REFACTOR (1.5 horas)

### **Testing Sprint**

**Manual Testing (Todos):**
```
✅ Juliana: Testing de autenticación
         - Login/logout
         - Protected routes
         - Roles y permisos

✅ Isabela: Testing de UI/UX
         - Responsive design
         - Navegación
         - Filtros y búsquedas
         - Visualizaciones

✅ Alejandro: Testing de APIs
         - CRUD operations
         - Validaciones
         - Error handling
         - Recomendaciones
```

**Bug Fixing (Sprint Backlog):**

| Bug | Prioridad | Asignado | Tiempo | Estado |
|-----|-----------|----------|--------|--------|
| Gráficos no responsive | HIGH | Isabela | 15min | ✅ Fixed |
| CORS error en producción | HIGH | Juliana | 20min | ✅ Fixed |
| Validación de tallas | MEDIUM | Alejandro | 10min | ✅ Fixed |
| Loading states | LOW | Isabela | 15min | ✅ Fixed |

### **Code Review (Pair Programming)**

```
🔄 Isabela ↔️ Juliana: Frontend integration
🔄 Alejandro ↔️ Juliana: Backend security
🔄 Isabela ↔️ Alejandro: API contracts
```

---

## 📊 FASE 4: PRESENTAR & RETROSPECTIVE (0.5 horas)

### **Sprint Review (Demo)**

**Preparación de la Demo:**

**Juliana:**
```
✅ Deploy verificado en Render
✅ URLs funcionando
✅ Base de datos poblada
✅ Credenciales de demo preparadas
```

**Isabela:**
```
✅ Screenshots de cada feature
✅ Video demo grabado (backup)
✅ Presentación preparada
```

**Alejandro:**
```
✅ Diagrama de arquitectura
✅ Explicación técnica lista
✅ Métricas de performance
```

### **Sprint Retrospective**

**¿Qué salió bien? ✅**
```
✅ Comunicación constante del equipo
✅ División clara de responsabilidades
✅ Stack tecnológico adecuado
✅ Deploy exitoso a tiempo
✅ Features completos y funcionales
✅ Documentación exhaustiva
```

**¿Qué podemos mejorar? 🔄**
```
🔄 Tests automatizados (no hubo tiempo)
🔄 Más tiempo para pulir UI
🔄 CI/CD pipeline
🔄 Mayor cobertura de edge cases
```

**Acciones para próximo sprint:**
```
📝 Implementar Jest + React Testing Library
📝 Setup CI/CD con GitHub Actions
📝 Mejorar performance con lazy loading
📝 Agregar más features de IA
```

---

## 📈 Métricas del Sprint

### **Velocity:**
```
Story Points Planeados: 40
Story Points Completados: 40
Velocity: 100% ✅
```

### **Burndown Chart:**
```
Hora 0:  [████████████████████] 40 SP
Hora 2:  [████████████░░░░░░░░] 30 SP
Hora 4:  [████████░░░░░░░░░░░░] 20 SP
Hora 6:  [████░░░░░░░░░░░░░░░░] 10 SP
Hora 8:  [░░░░░░░░░░░░░░░░░░░░]  0 SP ✅
```

### **Cumplimiento de DoD:**
```
✅ Código funcional: 100%
✅ Integrado en main: 100%
✅ Documentado: 100%
✅ Responsive: 100%
✅ Deployed: 100%
✅ Data seeded: 100%

TOTAL: 100% ✅
```

---

## 🛠️ Herramientas Scrum Utilizadas

### **Gestión de Proyecto:**
```
📋 Backlog: GitHub Projects
📝 Documentación: Markdown en repo
💬 Comunicación: WhatsApp + Discord
🔄 Control de versiones: GitHub
📊 Tracking: Manual (Spreadsheet)
```

### **Git Workflow:**

```
main (protected)
  ↓
  ├── feature/backend-api (Alejandro)
  ├── feature/frontend-dashboard (Isabela)
  └── feature/deployment (Juliana)
```

**Commit Convention:**
```
feat: Nueva funcionalidad
fix: Corrección de bug
docs: Documentación
style: Formato, estilos
refactor: Refactorización de código
test: Tests
chore: Tareas de mantenimiento
```

**Ejemplos:**
```
feat(backend): Agregar analytics controller
fix(frontend): Corregir responsive en dashboard
docs: Actualizar README con instrucciones
```

---

## 🎯 Artefactos Scrum Generados

### **Product Backlog:**
```
✅ US-01: Dashboard con KPIs
✅ US-02: Gestión de productos
✅ US-03: Historial de ventas
✅ US-04: Análisis avanzados
✅ US-05: Login seguro
✅ US-06: Recomendaciones automáticas
✅ US-07: Filtros por fechas
✅ US-08: Alertas de stock bajo
```

### **Sprint Backlog:**
```
40 story points distribuidos en:
- 15 tasks de backend
- 15 tasks de frontend
- 10 tasks de integración/deploy
```

### **Increment:**
```
Sistema completo funcional desplegado en:
https://retail-analytics-fullstack.onrender.com
```

---

## 📚 Ceremonias Scrum Aplicadas

| Ceremonia | Duración | Participantes | Resultado |
|-----------|----------|---------------|-----------|
| **Sprint Planning** | 60 min | Todos | Sprint backlog definido |
| **Daily Scrum** | 5 min/hora | Todos | Sincronización continua |
| **Sprint Review** | 15 min | Todos | Demo funcional |
| **Sprint Retrospective** | 15 min | Todos | Mejoras identificadas |

---

## 🎓 Roles y Responsabilidades Detalladas

### **Juliana - Scrum Master**

**Responsabilidades Scrum:**
- ✅ Facilitar ceremonias
- ✅ Remover impedimentos
- ✅ Proteger al equipo de distracciones
- ✅ Asegurar seguimiento de Scrum

**Responsabilidades Técnicas:**
- ✅ Arquitectura del sistema
- ✅ Configuración de infraestructura
- ✅ Deploy y DevOps
- ✅ Integración continua
- ✅ Documentación técnica

**Contribuciones al Proyecto:**
```
📁 Archivos creados:
   - package.json
   - render.yaml
   - database.js
   - auth.js (middleware)
   - AuthContext.jsx
   - App.jsx (routing)
   - Toda la documentación (10+ archivos .md)

💻 Líneas de código: ~1,500
```

---

### **Isabela - Product Owner**

**Responsabilidades Scrum:**
- ✅ Definir y priorizar user stories
- ✅ Mantener product backlog
- ✅ Aceptar o rechazar incrementos
- ✅ Visión del producto

**Responsabilidades Técnicas:**
- ✅ Diseño de interfaces
- ✅ Experiencia de usuario
- ✅ Visualizaciones y gráficos
- ✅ Frontend components
- ✅ Responsive design

**Contribuciones al Proyecto:**
```
📁 Archivos creados:
   - Dashboard.jsx (8+ gráficos)
   - Products.jsx
   - Analytics.jsx
   - Login.jsx
   - Layout.jsx
   - index.css (Tailwind customs)
   - tailwind.config.js

💻 Líneas de código: ~2,000
```

---

### **Alejandro - Development Team**

**Responsabilidades Scrum:**
- ✅ Desarrollo de features
- ✅ Estimación de story points
- ✅ Auto-organización
- ✅ Cross-functional work

**Responsabilidades Técnicas:**
- ✅ Backend API REST
- ✅ Modelos de datos
- ✅ Lógica de negocio
- ✅ Algoritmos de recomendación
- ✅ Base de datos

**Contribuciones al Proyecto:**
```
📁 Archivos creados:
   - User.js, Product.js, Sale.js (models)
   - authController.js
   - productController.js
   - saleController.js
   - analyticsController.js
   - seedData.js (250 ventas)
   - server.js

💻 Líneas de código: ~2,500
```

---

## 🏆 Resultados del Sprint

### **Objetivos vs Logros:**

| Objetivo | Meta | Logrado | % |
|----------|------|---------|---|
| MVP Funcional | 1 sistema | 1 sistema ✅ | 100% |
| Features Core | 8 US | 8 US ✅ | 100% |
| Deploy | 1 URL | 1 URL ✅ | 100% |
| Documentación | Básica | Completa ✅ | 150% |
| Tests | Manual | Manual ✅ | 100% |

### **Calidad del Código:**

```
✅ Linter: Sin errores
✅ Buenas prácticas: Aplicadas
✅ Patrones: 10 implementados
✅ Comentarios: Código documentado
✅ Performance: <100ms API, <2s frontend
```

---

## 📝 Lecciones Aprendidas

### **¿Qué funcionó bien?**

1. **Scrum adaptado** - Sprint corto pero efectivo
2. **Roles claros** - Cada quien sabía qué hacer
3. **Comunicación** - Stand-ups cada hora mantuvieron sincronía
4. **Stack tecnológico** - Elección correcta para el proyecto
5. **División de trabajo** - Parallel development eficiente

### **¿Qué mejoraríamos?**

1. **Más tiempo de planning** - Para refinar stories
2. **Tests automatizados** - Implementar desde el inicio
3. **CI/CD** - Deploy automático con cada push
4. **Mob programming** - Para features complejas
5. **Mejor estimation** - Algunos tasks tomaron más tiempo

---

## 🎯 Conclusión

### **Scrum en Hackathon:**

**✅ FUNCIONÓ porque:**
- Sprint time-boxed claro (8 horas)
- Roles bien definidos
- Comunicación constante
- Priorización efectiva
- Entrega incremental

**🚀 Resultado:**
Un sistema completo, funcional, desplegado y documentado en 8 horas gracias a:
- Metodología Scrum adaptada
- Equipo multidisciplinario
- Tecnologías adecuadas
- Ejecución disciplinada

---

**Equipo:** Juliana (Scrum Master), Isabela (Product Owner), Alejandro (Developer)  
**Metodología:** Scrum (Sprint 8 horas)  
**Resultado:** Sistema Retail Analytics 100% funcional  

---

*"El éxito no es accidental. Es trabajo duro, perseverancia, aprendizaje, estudio, sacrificio y sobre todo, amor por lo que estás haciendo"* - Pelé


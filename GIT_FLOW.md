# Git Flow - Metodología de Versionamiento

## Modelo de Branching Implementado

Este proyecto sigue el modelo **Git Flow** para un control de versiones profesional y escalable.

---

## Estructura de Ramas

```
main (producción)
  |
  └── develop (integración)
        |
        ├── feature/auth-backend
        ├── feature/models-database
        ├── feature/products-api
        ├── feature/sales-api
        ├── feature/analytics-api
        ├── feature/frontend-setup
        ├── feature/dashboard-ui
        ├── feature/products-ui
        ├── feature/sales-ui
        └── feature/analytics-ui
```

---

## Tipos de Ramas

### 1. main
- Contiene código de producción
- Siempre estable y deployable
- Solo se actualiza con merges desde release o hotfix
- Cada merge es una nueva versión

### 2. develop
- Rama de integración
- Contiene últimas features completadas
- Base para crear feature branches
- Preparación para próximo release

### 3. feature/*
- Para desarrollo de nuevas funcionalidades
- Se crean desde: `develop`
- Se fusionan en: `develop`
- Nomenclatura: `feature/nombre-funcionalidad`

### 4. release/*
- Preparación de nueva versión
- Se crean desde: `develop`
- Se fusionan en: `main` y `develop`
- Nomenclatura: `release/v1.0.0`

### 5. hotfix/*
- Correcciones urgentes en producción
- Se crean desde: `main`
- Se fusionan en: `main` y `develop`
- Nomenclatura: `hotfix/descripcion-fix`

---

## Flujo de Trabajo Aplicado

### FASE 1: Setup Inicial

```bash
# 1. Crear repositorio
git init
git checkout -b main

# 2. Commit inicial
git add .gitignore LICENSE README.md
git commit -m "chore: configuracion inicial del repositorio"

# 3. Crear rama develop
git checkout -b develop
```

### FASE 2: Desarrollo de Features

#### Feature 1: Autenticación Backend

```bash
# Crear rama
git checkout -b feature/auth-backend develop

# Commits incrementales
git add backend/models/User.js
git commit -m "feat(auth): agregar modelo User con bcrypt"

git add backend/controllers/authController.js
git commit -m "feat(auth): implementar login y register con JWT"

git add backend/routes/authRoutes.js
git commit -m "feat(auth): agregar rutas de autenticacion"

git add backend/middleware/auth.js
git commit -m "feat(auth): agregar middleware de verificacion JWT"

# Merge a develop
git checkout develop
git merge feature/auth-backend --no-ff
git branch -d feature/auth-backend
```

#### Feature 2: Modelos de Datos

```bash
git checkout -b feature/database-models develop

git add backend/config/database.js
git commit -m "feat(database): configurar conexion MongoDB"

git add backend/models/Product.js
git commit -m "feat(models): agregar modelo Product con validaciones"

git add backend/models/Sale.js
git commit -m "feat(models): agregar modelo Sale con subdocumentos"

git checkout develop
git merge feature/database-models --no-ff
git branch -d feature/database-models
```

#### Feature 3: API de Productos

```bash
git checkout -b feature/products-api develop

git add backend/controllers/productController.js
git commit -m "feat(products): implementar CRUD de productos"

git add backend/routes/productRoutes.js
git commit -m "feat(products): agregar rutas de productos"

# Testing y ajustes
git add backend/controllers/productController.js
git commit -m "fix(products): corregir validacion de stock"

git checkout develop
git merge feature/products-api --no-ff
git branch -d feature/products-api
```

#### Feature 4: API de Ventas

```bash
git checkout -b feature/sales-api develop

git add backend/controllers/saleController.js
git commit -m "feat(sales): implementar creacion de ventas"

git commit -m "feat(sales): agregar calculo automatico de ganancias"

git add backend/routes/saleRoutes.js
git commit -m "feat(sales): agregar rutas de ventas"

git checkout develop
git merge feature/sales-api --no-ff
git branch -d feature/sales-api
```

#### Feature 5: Analytics y Recomendaciones

```bash
git checkout -b feature/analytics-ai develop

git add backend/controllers/analyticsController.js
git commit -m "feat(analytics): implementar dashboard con KPIs"

git commit -m "feat(analytics): agregar analisis por categoria y genero"

git commit -m "feat(analytics): implementar sistema de recomendaciones IA"

git add backend/routes/analyticsRoutes.js
git commit -m "feat(analytics): agregar rutas de analytics"

git checkout develop
git merge feature/analytics-ai --no-ff
git branch -d feature/analytics-ai
```

#### Feature 6: Backend Server

```bash
git checkout -b feature/server-setup develop

git add backend/server.js backend/middleware/
git commit -m "feat(server): configurar Express server con middleware"

git commit -m "feat(server): agregar soporte para archivos estaticos"

git checkout develop
git merge feature/server-setup --no-ff
git branch -d feature/server-setup
```

### FASE 3: Frontend Development

#### Feature 7: Setup Frontend

```bash
git checkout -b feature/frontend-setup develop

git add frontend/package.json frontend/vite.config.js frontend/tailwind.config.js
git commit -m "chore(frontend): configurar React con Vite y Tailwind"

git add frontend/index.html frontend/src/main.jsx frontend/src/index.css
git commit -m "feat(frontend): configurar entry point y estilos base"

git checkout develop
git merge feature/frontend-setup --no-ff
git branch -d feature/frontend-setup
```

#### Feature 8: Autenticación Frontend

```bash
git checkout -b feature/auth-frontend develop

git add frontend/src/services/api.js
git commit -m "feat(frontend): crear cliente API con interceptors"

git add frontend/src/context/AuthContext.jsx
git commit -m "feat(auth): implementar Context API para autenticacion"

git add frontend/src/pages/Login.jsx
git commit -m "feat(auth): crear pagina de login con validacion"

git add frontend/src/App.jsx
git commit -m "feat(auth): agregar rutas protegidas con HOC"

git checkout develop
git merge feature/auth-frontend --no-ff
git branch -d feature/auth-frontend
```

#### Feature 9: Dashboard UI

```bash
git checkout -b feature/dashboard-ui develop

git add frontend/src/components/Layout.jsx
git commit -m "feat(ui): crear layout con sidebar y navegacion"

git add frontend/src/pages/Dashboard.jsx
git commit -m "feat(dashboard): implementar dashboard con KPIs"

git commit -m "feat(dashboard): agregar graficos con Recharts"

git commit -m "feat(dashboard): integrar recomendaciones IA"

git checkout develop
git merge feature/dashboard-ui --no-ff
git branch -d feature/dashboard-ui
```

#### Feature 10: Products UI

```bash
git checkout -b feature/products-ui develop

git add frontend/src/pages/Products.jsx
git commit -m "feat(products): crear tabla de productos"

git commit -m "feat(products): agregar busqueda y filtros"

git commit -m "feat(products): agregar indicadores de stock"

git checkout develop
git merge feature/products-ui --no-ff
git branch -d feature/products-ui
```

#### Feature 11: Sales UI

```bash
git checkout -b feature/sales-ui develop

git add frontend/src/pages/Sales.jsx
git commit -m "feat(sales): crear historial de ventas"

git commit -m "feat(sales): agregar estadisticas y filtros"

git checkout develop
git merge feature/sales-ui --no-ff
git branch -d feature/sales-ui
```

#### Feature 12: Analytics UI

```bash
git checkout -b feature/analytics-ui develop

git add frontend/src/pages/Analytics.jsx
git commit -m "feat(analytics): crear pagina de analisis avanzado"

git commit -m "feat(analytics): agregar 6+ tipos de visualizaciones"

git commit -m "feat(analytics): implementar filtros temporales"

git checkout develop
git merge feature/analytics-ui --no-ff
git branch -d feature/analytics-ui
```

### FASE 4: Documentación

```bash
git checkout -b feature/documentation develop

git add ARQUITECTURA.md PATRONES_DISEÑO.md
git commit -m "docs: agregar documentacion de arquitectura y patrones"

git add METODOLOGIA_SCRUM.md
git commit -m "docs: documentar metodologia Scrum del equipo"

git add INSTALACION.md DEPLOY_RENDER.md
git commit -m "docs: agregar guias de instalacion y deploy"

git checkout develop
git merge feature/documentation --no-ff
git branch -d feature/documentation
```

### FASE 5: Release

```bash
# Crear release branch
git checkout -b release/v1.0.0 develop

# Ajustes finales
git commit -m "chore(release): actualizar version a 1.0.0"
git commit -m "docs(release): actualizar README para v1.0.0"

# Merge a main (producción)
git checkout main
git merge release/v1.0.0 --no-ff
git tag -a v1.0.0 -m "Version 1.0.0 - MVP Hackathon"

# Merge de vuelta a develop
git checkout develop
git merge release/v1.0.0 --no-ff
git branch -d release/v1.0.0
```

### FASE 6: Push a GitHub

```bash
git push origin main
git push origin develop
git push origin --tags
```

---

## Ejemplo: Hotfix en Producción

```bash
# Error crítico encontrado en main
git checkout -b hotfix/fix-login-validation main

# Fix
git add backend/controllers/authController.js
git commit -m "fix(auth): corregir validacion de email en login"

# Testing
git commit -m "test(auth): verificar fix de validacion"

# Merge a main
git checkout main
git merge hotfix/fix-login-validation --no-ff
git tag -a v1.0.1 -m "Hotfix: validacion login"

# Merge a develop también
git checkout develop
git merge hotfix/fix-login-validation --no-ff

# Cleanup
git branch -d hotfix/fix-login-validation
git push origin main develop --tags
```

---

## Convención de Commits

### Formato:
```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos:
- **feat**: Nueva funcionalidad
- **fix**: Corrección de bug
- **docs**: Cambios en documentación
- **style**: Formato, punto y coma faltante, etc (no afecta código)
- **refactor**: Refactorización de código
- **test**: Agregar tests
- **chore**: Mantenimiento, dependencias, etc

### Ejemplos:
```
feat(auth): implementar login con JWT
fix(products): corregir calculo de stock
docs(readme): actualizar instrucciones de instalacion
refactor(analytics): optimizar queries de agregacion
test(sales): agregar tests unitarios para controller
chore(deps): actualizar dependencias de seguridad
```

---

## Ventajas de Git Flow

1. **Organización:** Clara separación entre desarrollo y producción
2. **Paralelización:** Múltiples features en desarrollo simultáneo
3. **Estabilidad:** main siempre contiene código estable
4. **Trazabilidad:** Historial claro de cada funcionalidad
5. **Rollback:** Fácil revertir cambios específicos
6. **Colaboración:** Equipo puede trabajar sin conflictos

---

## Comandos Útiles

```bash
# Ver historial de commits
git log --oneline --graph --all

# Ver ramas
git branch -a

# Ver diferencias
git diff develop main

# Ver tags
git tag

# Ver quién hizo qué
git blame archivo.js

# Ver commits de un autor
git log --author="Juliana"
```

---

## Responsable

**Juliana Chantre Astudillo** - Scrum Master  
Implementación de Git Flow y control de versiones


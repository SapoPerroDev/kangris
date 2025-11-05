# Deploy en Render - Guía Completa

## Despliegue Fullstack en Render

Frontend + Backend juntos en un solo servicio.

**Tiempo Total: 15 minutos**

---

## PASO 1: MongoDB Atlas (5 minutos)

### 1.1 Crear Cuenta
1. Ir a https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up con Google o email

### 1.2 Crear Cluster Gratuito
1. Choose "FREE" (M0 Sandbox)
2. Provider: AWS
3. Region: Oregon (us-west-2)
4. Cluster Name: RetailCluster
5. Click "Create"
6. Esperar 3-5 minutos

### 1.3 Configurar Usuario
1. Security → Database Access
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: retail_admin
5. Password: Autogenerate Secure Password (COPIAR Y GUARDAR)
6. Database User Privileges: Atlas Admin
7. Click "Add User"

### 1.4 Permitir Acceso desde Cualquier IP
1. Security → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. IP Address: 0.0.0.0/0
5. Description: Render Access
6. Click "Confirm"

### 1.5 Obtener Connection String
1. Click "Connect" en tu cluster
2. Seleccionar "Connect your application"
3. Driver: Node.js
4. Version: 4.1 or later
5. Copiar el string

**String Final:**
```
mongodb+srv://retail_admin:TU_PASSWORD@retailcluster.xxxxx.mongodb.net/retail_inventory?retryWrites=true&w=majority
```

GUARDAR ESTE STRING

---

## PASO 2: Preparar GitHub (2 minutos)

El código ya está en GitHub: https://github.com/SapoPerroDev/kangris

Si no lo está:
```bash
git init
git add .
git commit -m "feat: sistema completo retail analytics"
git remote add origin https://github.com/SapoPerroDev/kangris.git
git push -u origin main
```

---

## PASO 3: Deploy en Render (8 minutos)

### 3.1 Crear Cuenta en Render
1. Ir a https://render.com
2. Click "Get Started"
3. Sign up con GitHub
4. Autorizar Render

### 3.2 Crear Web Service
1. Dashboard → Click "New +"
2. Seleccionar "Web Service"

### 3.3 Conectar Repositorio
1. Conectar GitHub
2. Buscar: kangris
3. Click "Connect"

### 3.4 Configurar el Servicio

**Basic Settings:**
```
Name: retail-analytics
Region: Oregon (US West)
Branch: main
Root Directory: (VACÍO)
```

**Build Settings:**
```
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

**Instance Type:**
```
Plan: Free
```

### 3.5 Environment Variables

Click "Advanced" → "Environment Variables"

```
NODE_ENV = production
MONGODB_URI = [tu connection string de Atlas]
JWT_SECRET = [Click "Generate"]
JWT_EXPIRE = 7d
PORT = 10000
```

### 3.6 Create Web Service

Click "Create Web Service"

Esperar 3-5 minutos mientras deploy.

---

## PASO 4: Poblar Base de Datos (2 minutos)

### 4.1 Abrir Shell en Render

1. Dashboard → tu servicio
2. Menu izquierdo → "Shell"

### 4.2 Ejecutar Seed

```bash
npm run seed
```

Verás:
```
Iniciando seed de la base de datos...
Limpiando base de datos...
Creando usuarios...
3 usuarios creados
Creando productos...
56 productos creados
Generando ventas...
250 ventas generadas

¡Base de datos poblada exitosamente!

Credenciales:
Admin:    admin@retail.com / admin123
Gerente:  gerente@retail.com / gerente123
Vendedor: vendedor@retail.com / vendedor123
```

---

## Verificación

### Abrir la Aplicación

```
https://retail-analytics.onrender.com
```

Primera carga puede tardar 30-50 segundos (servicio despertando)

### Probar Login

```
Email: admin@retail.com
Password: admin123
```

### Verificar Dashboard

Deberías ver:
- 4 tarjetas KPI con números
- Gráficos con datos
- Recomendaciones
- Navegación funcional

---

## Tips Importantes

### 1. Servicio "Dormido"

El servicio FREE se duerme tras 15 minutos sin uso

**Solución para presentación:**
- Abrir app 5 minutos ANTES de presentar
- Navegar por todas las páginas

### 2. Ver Logs

Dashboard → Tu servicio → "Logs"

### 3. Re-deploy Manual

Dashboard → "Manual Deploy" → "Deploy latest commit"

### 4. Actualizar Código

```bash
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main

# Render hace auto-deploy automáticamente
```

---

## Solución de Problemas

### Error: "Application failed to respond"

**Causa:** Variables mal configuradas

**Solución:**
1. Render → Environment → Verificar variables
2. Especialmente MONGODB_URI
3. Save Changes

### Error: "MongoNetworkError"

**Causa:** IP no permitida

**Solución:**
1. MongoDB Atlas → Network Access
2. Verificar 0.0.0.0/0
3. Verificar connection string

### Dashboard sin datos

**Causa:** Base de datos no poblada

**Solución:**
1. Render → Shell
2. npm run seed

---

## URLs Para Presentación

```
APLICACION WEB:
https://retail-analytics.onrender.com

API BACKEND:
https://retail-analytics.onrender.com/api

GITHUB REPO:
https://github.com/SapoPerroDev/kangris
```

---

Made by Team Retail Analytics

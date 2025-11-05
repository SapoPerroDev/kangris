# 🚀 Deploy en Render - Guía Completa y Simple

## ⚡ TODO en Render - Frontend + Backend Juntos

### **Tiempo Total: 15 minutos** ⏱️

---

## 📋 **PASO 1: MongoDB Atlas (5 minutos)**

### **1.1 Crear Cuenta**
1. Ir a https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up con Google o email

### **1.2 Crear Cluster Gratuito**
1. Choose "FREE" (M0 Sandbox)
2. Provider: **AWS**
3. Region: **Oregon (us-west-2)** ← Mismo que Render
4. Cluster Name: `RetailCluster`
5. Click **"Create"**
6. ⏳ Esperar 3-5 minutos

### **1.3 Configurar Usuario**
1. Security → Database Access
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `retail_admin`
5. Password: **Autogenerate Secure Password** → 📋 **COPIAR Y GUARDAR**
6. Database User Privileges: **Atlas Admin**
7. Click **"Add User"**

### **1.4 Permitir Acceso desde Cualquier IP**
1. Security → Network Access
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. IP Address: `0.0.0.0/0` (auto-completado)
5. Description: `Render Access`
6. Click **"Confirm"**

### **1.5 Obtener Connection String**
1. Click **"Connect"** en tu cluster
2. Seleccionar **"Connect your application"**
3. Driver: **Node.js**
4. Version: **4.1 or later**
5. Copiar el string:

```
mongodb+srv://retail_admin:<password>@retailcluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

6. **REEMPLAZAR** `<password>` con la contraseña que copiaste
7. **AGREGAR** al final `/retail_inventory` antes del `?`

**String Final:**
```
mongodb+srv://retail_admin:TU_PASSWORD_AQUI@retailcluster.xxxxx.mongodb.net/retail_inventory?retryWrites=true&w=majority
```

📋 **GUARDAR ESTE STRING** - Lo necesitarás en Render

---

## 📋 **PASO 2: Preparar GitHub (2 minutos)**

### **2.1 Subir Código a GitHub**

```bash
# En la carpeta del proyecto
cd C:\Users\Juliana\OneDrive\Documents\Empresa_retail

# Inicializar Git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Commit
git commit -m "Sistema completo Retail Analytics"

# Crear repositorio en GitHub
# Ve a https://github.com/new
# Nombre: empresa-retail
# Public
# NO agregar README, .gitignore, ni license

# Conectar y subir
git remote add origin https://github.com/TU_USUARIO/empresa-retail.git
git branch -M main
git push -u origin main
```

✅ **Código en GitHub listo**

---

## 📋 **PASO 3: Deploy en Render (8 minutos)**

### **3.1 Crear Cuenta en Render**
1. Ir a https://render.com
2. Click **"Get Started"**
3. Sign up con **GitHub** (más fácil)
4. Autorizar Render en GitHub

### **3.2 Crear Web Service**
1. Dashboard → Click **"New +"**
2. Seleccionar **"Web Service"**

### **3.3 Conectar Repositorio**
1. Si es la primera vez: **"Connect account"** con GitHub
2. Buscar tu repositorio: `empresa-retail`
3. Click **"Connect"**

### **3.4 Configurar el Servicio**

**Basic Settings:**
```
Name: retail-analytics-fullstack
Region: Oregon (US West)
Branch: main
Root Directory: (DEJAR VACÍO)
```

**Build Settings:**
```
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

**Instance Type:**
```
Plan: Free ✅
```

### **3.5 Environment Variables (IMPORTANTE)**

Click **"Advanced"** → Scroll a **"Environment Variables"**

Agregar estas variables:

**Variable 1:**
```
Key: NODE_ENV
Value: production
```

**Variable 2:**
```
Key: MONGODB_URI
Value: mongodb+srv://retail_admin:TU_PASSWORD@retailcluster.xxxxx.mongodb.net/retail_inventory?retryWrites=true&w=majority
```
⚠️ **Usar TU connection string de MongoDB Atlas del Paso 1**

**Variable 3:**
```
Key: JWT_SECRET
Value: (Click "Generate" para crear uno automático)
```

**Variable 4:**
```
Key: JWT_EXPIRE
Value: 7d
```

**Variable 5:**
```
Key: PORT
Value: 10000
```

### **3.6 Create Web Service**

1. Scroll abajo
2. Click **"Create Web Service"**
3. ⏳ Espera 3-5 minutos mientras:
   - Clona el repo
   - Instala dependencias backend
   - Instala dependencias frontend
   - Build del frontend
   - Inicia el servidor

### **3.7 Ver el Deploy**

Verás logs en tiempo real:
```
==> Cloning from https://github.com/...
==> Running 'npm install && npm run build'
==> Installing dependencies...
==> Building frontend...
==> Build successful!
==> Starting service with 'npm start'
==> Server running on port 10000
==> Your service is live 🎉
```

**Tu URL será:**
```
https://retail-analytics-fullstack.onrender.com
```

---

## 📋 **PASO 4: Poblar Base de Datos (2 minutos)**

### **4.1 Abrir Shell en Render**

1. En el dashboard de tu servicio
2. En el menú izquierdo, click **"Shell"**
3. Se abrirá una terminal web

### **4.2 Ejecutar Seed**

En la terminal, ejecutar:
```bash
npm run seed
```

Verás:
```
🌱 Iniciando seed de la base de datos...
🗑️  Limpiando base de datos...
👥 Creando usuarios...
✅ 3 usuarios creados
📦 Creando productos...
✅ 60 productos creados
💰 Generando ventas...
✅ 250 ventas generadas

✨ ¡Base de datos poblada exitosamente!

📝 Credenciales de acceso:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Admin:    admin@retail.com / admin123
👤 Gerente:  gerente@retail.com / gerente123
👤 Vendedor: vendedor@retail.com / vendedor123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

✅ **¡Datos cargados!**

---

## ✅ **PASO 5: Verificar que Todo Funciona**

### **5.1 Abrir la Aplicación**

Ve a tu URL:
```
https://retail-analytics-fullstack.onrender.com
```

⏳ **Primera carga puede tardar 30-50 segundos** (servicio se estaba "despertando")

### **5.2 Probar Login**

1. Deberías ver la página de login
2. Usar credenciales:
   ```
   Email: admin@retail.com
   Password: admin123
   ```
3. Click **"Iniciar Sesión"**

### **5.3 Verificar Dashboard**

Deberías ver:
- ✅ 4 tarjetas KPI con números
- ✅ Gráficos con datos
- ✅ Recomendaciones
- ✅ Navegación funcional

### **5.4 Verificar Otras Páginas**

Click en:
- ✅ **Productos** - Debería mostrar 60+ productos
- ✅ **Ventas** - Debería mostrar 250 ventas
- ✅ **Analytics** - Debería mostrar gráficos avanzados

---

## 🎉 **¡LISTO! Tu Aplicación Está en Línea**

### **URLs Importantes:**

```
🌐 APLICACIÓN:
https://retail-analytics-fullstack.onrender.com

🔧 DASHBOARD RENDER:
https://dashboard.render.com

💾 MONGODB ATLAS:
https://cloud.mongodb.com

📊 GITHUB REPO:
https://github.com/tu-usuario/empresa-retail
```

---

## 🔥 **TIPS IMPORTANTES**

### **1. Servicio "Dormido"**

⚠️ **El servicio FREE se duerme tras 15 minutos sin uso**

**Solución para presentación:**
1. Abrir tu app 5 minutos ANTES de presentar
2. Navegar por todas las páginas
3. Así estará "despierta" durante tu demo

### **2. Ver Logs**

Para debugging:
1. Dashboard → Tu servicio
2. Menu izquierdo → **"Logs"**
3. Ver requests en tiempo real

### **3. Re-deploy Manual**

Si algo no funciona:
1. Dashboard → Tu servicio
2. Click **"Manual Deploy"**
3. Seleccionar **"Deploy latest commit"**

### **4. Actualizar Código**

```bash
# Hacer cambios en tu código
git add .
git commit -m "Actualización"
git push origin main

# Render hace auto-deploy automáticamente! 🚀
```

---

## 🐛 **Solución de Problemas**

### **Error: "Application failed to respond"**

**Causa:** Variables de entorno mal configuradas

**Solución:**
1. Render Dashboard → Tu servicio
2. Environment → Verificar todas las variables
3. Especialmente `MONGODB_URI` (debe tener la password correcta)
4. Save Changes → Auto re-deploy

---

### **Error: "MongoNetworkError"**

**Causa:** IP no permitida o connection string incorrecto

**Solución:**
1. MongoDB Atlas → Network Access
2. Verificar que `0.0.0.0/0` esté en la lista
3. Verificar connection string en Render tenga:
   - Password correcta
   - `/retail_inventory` antes del `?`

---

### **Error: "Cannot GET /"**

**Causa:** Frontend no se buildeó correctamente

**Solución:**
1. Render → Logs
2. Buscar errores en `npm run build`
3. Verificar que exista carpeta `frontend/dist/` después del build
4. Re-deploy manual

---

### **Dashboard carga pero sin datos**

**Causa:** Base de datos no poblada

**Solución:**
1. Render → Shell
2. Ejecutar: `npm run seed`
3. Esperar a que termine
4. Refrescar navegador

---

## 📱 **Para la Presentación**

### **Checklist Pre-Demo:**

5 MINUTOS ANTES:
- [ ] Abrir https://retail-analytics-fullstack.onrender.com
- [ ] Login con admin@retail.com / admin123
- [ ] Navegar Dashboard, Productos, Ventas, Analytics
- [ ] Verificar que todos los gráficos cargan
- [ ] Dejar pestaña abierta

DURANTE LA DEMO:
- [ ] Mostrar URL profesional
- [ ] Explicar que es fullstack (frontend + backend)
- [ ] Destacar que está en producción (no localhost)
- [ ] Mencionar MongoDB Atlas cloud
- [ ] Mostrar deploy automático con GitHub

BACKUP PLAN:
- [ ] Screenshots de cada página
- [ ] Video demo pre-grabado (opcional)
- [ ] Localhost funcionando (emergencia)

---

## 🎯 **Dominio Custom (Opcional)**

Si quieres un dominio mejor:

1. Render Dashboard → Tu servicio
2. Settings → **"Custom Domain"**
3. Agregar: `retail-analytics.onrender.app`
   (O tu dominio propio si tienes)

---

## 💰 **Costos**

```
✅ Render Free Tier:
   - 750 horas/mes (suficiente 24/7)
   - 512 MB RAM
   - Se duerme tras 15 min
   - HTTPS gratis
   - Auto-deploy gratis

✅ MongoDB Atlas Free:
   - 512 MB storage
   - Cluster compartido
   - Backups automáticos

💰 TOTAL: $0/mes
```

---

## 🔄 **Actualizar la App**

### **Cambios en Código:**

```bash
# 1. Hacer cambios locales
# 2. Probar localmente
npm run dev:all

# 3. Commit
git add .
git commit -m "Feature: nueva funcionalidad"

# 4. Push
git push origin main

# 5. ✨ Render auto-deploya en 2-3 minutos!
```

### **Cambios en Variables de Entorno:**

1. Render Dashboard → Environment
2. Edit → Cambiar valor
3. Save Changes
4. Auto re-deploy

---

## 📊 **Monitoreo**

### **Ver Requests:**
```
Render → Logs
- Ver todas las peticiones API
- Errores en tiempo real
- Performance
```

### **Métricas:**
```
Render → Metrics (en tu servicio)
- CPU usage
- Memory usage
- Request count
- Response time
```

---

## 🏆 **¡Felicitaciones!**

Tu aplicación está:
- ✅ En producción
- ✅ Con HTTPS
- ✅ Auto-deploy configurado
- ✅ Base de datos en cloud
- ✅ Lista para presentar
- ✅ 100% GRATIS

**URL para compartir:**
```
https://retail-analytics-fullstack.onrender.com
```

---

## 📞 **Soporte**

Si algo no funciona:

1. **Revisar logs** en Render
2. **Verificar variables** de entorno
3. **MongoDB Atlas** - verificar IP whitelist
4. **Re-deploy manual** si es necesario
5. **Consultar** `JUSTIFICACION_TECNICA.md`

---

**¡Tu proyecto está listo para ganar el hackathon!** 🚀🏆

---

Made with ❤️ using Render


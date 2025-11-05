# 🚀 Guía de Instalación Rápida

## Instalación Local (Desarrollo)

### **Paso 1: Prerrequisitos**

Asegúrate de tener instalado:
- ✅ Node.js v18+ ([Descargar aquí](https://nodejs.org/))
- ✅ MongoDB ([Descargar aquí](https://www.mongodb.com/try/download/community)) O usar MongoDB Atlas (cloud)
- ✅ Git ([Descargar aquí](https://git-scm.com/))

Verifica las instalaciones:
```bash
node --version  # Debe mostrar v18 o superior
npm --version   # Debe mostrar 9.0 o superior
mongod --version  # (opcional si usas MongoDB local)
```

---

### **Paso 2: Clonar e Instalar**

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/empresa-retail.git
cd empresa-retail

# Instalar dependencias del backend
npm install

# Instalar dependencias del frontend
cd frontend
npm install
cd ..
```

---

### **Paso 3: Configurar Variables de Entorno**

**Backend (.env en la raíz):**
```bash
# Windows PowerShell
Copy-Item .env.example .env

# Windows CMD o Git Bash
copy .env.example .env

# Luego editar .env con tus datos
```

Contenido del `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/retail_inventory
JWT_SECRET=mi_clave_super_secreta_cambiar_en_produccion
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

**Frontend (.env en /frontend):**
```bash
cd frontend

# Crear archivo .env
echo VITE_API_URL=http://localhost:5000/api > .env

# Si no funciona el comando, crear manualmente el archivo
# y agregar: VITE_API_URL=http://localhost:5000/api
```

---

### **Paso 4: Iniciar MongoDB**

**Opción A: MongoDB Local (Windows)**
```bash
# Abrir MongoDB Compass o ejecutar en terminal:
mongod

# Deja esta terminal abierta
```

**Opción B: MongoDB Atlas (Cloud - Recomendado para Netlify)**
1. Crear cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un cluster gratuito (M0)
3. Obtener connection string
4. Reemplazar `MONGODB_URI` en `.env`:
   ```
   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/retail_inventory
   ```

---

### **Paso 5: Poblar Base de Datos**

```bash
# Desde la raíz del proyecto
npm run seed
```

✅ **Esto creará:**
- 3 usuarios (admin, gerente, vendedor)
- 60+ productos variados
- 250 ventas de prueba (últimos 90 días)

**Credenciales:**
- 👤 Admin: `admin@retail.com` / `admin123`
- 👤 Gerente: `gerente@retail.com` / `gerente123`
- 👤 Vendedor: `vendedor@retail.com` / `vendedor123`

---

### **Paso 6: Ejecutar la Aplicación**

**Opción 1: Dos terminales separadas**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

**Opción 2: Un solo comando** (requiere concurrently - ya incluido)
```bash
npm run dev:all
```

---

### **Paso 7: Acceder a la Aplicación**

🌐 **Frontend:** http://localhost:5173  
🔧 **Backend API:** http://localhost:5000

**Login con:**
- Email: `admin@retail.com`
- Password: `admin123`

---

## 🚀 Despliegue en Netlify + Render

### **Frontend en Netlify**

1. **Push a GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **En Netlify:**
   - Login en [netlify.com](https://netlify.com)
   - "Add new site" > "Import an existing project"
   - Conectar GitHub
   - Seleccionar el repositorio
   
3. **Build settings:**
   ```
   Base directory: frontend
   Build command: npm install && npm run build
   Publish directory: frontend/dist
   ```

4. **Environment variables:**
   - Click "Add environment variables"
   - Agregar: `VITE_API_URL` = `https://tu-backend.onrender.com/api`

5. **Deploy!** ✨

---

### **Backend en Render**

1. **En Render:**
   - Login en [render.com](https://render.com)
   - "New +" > "Web Service"
   - Conectar GitHub
   - Seleccionar el repositorio

2. **Build settings:**
   ```
   Name: retail-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm run server
   ```

3. **Environment variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://... (tu MongoDB Atlas URI)
   JWT_SECRET=clave_segura_aleatoria_larga
   JWT_EXPIRE=7d
   CLIENT_URL=https://tu-sitio.netlify.app
   PORT=5000
   ```

4. **Deploy!** ✨

5. **Poblar datos:**
   - Una vez deployado, ve a la pestaña "Shell"
   - Ejecutar: `npm run seed`

---

### **Actualizar URL del Backend en Netlify**

1. Copiar la URL de tu backend en Render (ej: `https://retail-backend-xxxx.onrender.com`)
2. En Netlify > Site settings > Environment variables
3. Actualizar `VITE_API_URL` a `https://retail-backend-xxxx.onrender.com/api`
4. Re-deploy (Deploys > Trigger deploy > Clear cache and deploy)

---

## 🔧 Solución de Problemas

### Error: "MongoDB connection failed"
```bash
# Verifica que MongoDB esté corriendo:
mongod --version

# O verifica tu MongoDB Atlas connection string
# Asegúrate que la IP esté en whitelist (0.0.0.0/0 para desarrollo)
```

### Error: "Port 5000 already in use"
```bash
# Cambiar puerto en .env:
PORT=5001

# O matar el proceso en Windows:
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F
```

### Error: "CORS policy"
```bash
# Verifica que CLIENT_URL en backend .env coincida con tu frontend URL
CLIENT_URL=http://localhost:5173
```

### Frontend no se conecta al Backend
```bash
# Verifica el archivo frontend/.env:
VITE_API_URL=http://localhost:5000/api

# Reinicia el servidor de Vite después de cambiar .env
```

### Error: "Cannot find module"
```bash
# Reinstalar dependencias:
rm -rf node_modules package-lock.json
npm install

# Y en frontend:
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Soporte

¿Problemas con la instalación?

1. Revisa los logs en la consola
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de estar en el directorio correcto
4. Revisa que los puertos no estén en uso

**Contacto:**
- 📧 Email: soporte@retailanalytics.com
- 💬 GitHub Issues: [Abrir issue](https://github.com/tu-usuario/empresa-retail/issues)

---

¡Listo! 🎉 Tu sistema debería estar funcionando correctamente.


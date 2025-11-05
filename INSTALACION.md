# Guía de Instalación

## Instalación Local (Desarrollo)

### Paso 1: Prerrequisitos

Asegúrate de tener instalado:
- Node.js v18+ (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/try/download/community) O MongoDB Atlas
- Git (https://git-scm.com/)

Verifica las instalaciones:
```bash
node --version  # Debe mostrar v18+
npm --version   # Debe mostrar 9.0+
```

---

### Paso 2: Clonar e Instalar

```bash
# Clonar repositorio
git clone https://github.com/SapoPerroDev/kangris.git
cd kangris

# Instalar dependencias del backend
npm install

# Instalar dependencias del frontend
cd frontend
npm install
cd ..
```

---

### Paso 3: Configurar Variables de Entorno

**Backend (.env en la raíz):**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/retail_inventory
JWT_SECRET=mi_clave_super_secreta_cambiar_en_produccion
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

**Frontend (.env en /frontend):**
```env
VITE_API_URL=http://localhost:5000/api
```

---

### Paso 4: Iniciar MongoDB

**Opción A: MongoDB Local (Windows)**
```bash
# Abrir MongoDB Compass o ejecutar:
mongod
```

**Opción B: MongoDB Atlas (Cloud - Recomendado)**
1. Crear cuenta gratuita en https://www.mongodb.com/cloud/atlas
2. Crear cluster gratuito (M0)
3. Obtener connection string
4. Actualizar MONGODB_URI en .env

---

### Paso 5: Poblar Base de Datos

```bash
npm run seed
```

Esto creará:
- 3 usuarios (admin, gerente, vendedor)
- 56 productos variados
- 250 ventas de los últimos 90 días

**Credenciales:**
- Admin: admin@retail.com / admin123
- Gerente: gerente@retail.com / gerente123
- Vendedor: vendedor@retail.com / vendedor123

---

### Paso 6: Ejecutar la Aplicación

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

**Opción 2: Un solo comando**
```bash
npm run dev:all
```

---

### Paso 7: Acceder a la Aplicación

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

**Login con:**
- Email: admin@retail.com
- Password: admin123

---

## Solución de Problemas

### Error: "MongoDB connection failed"
```bash
# Verificar que MongoDB esté corriendo
mongod --version

# O usar MongoDB Atlas
```

### Error: "Port 5000 already in use"
```bash
# Cambiar PORT en .env
PORT=5001

# O matar el proceso
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F
```

### Error: "CORS policy"
```bash
# Verificar CLIENT_URL en backend .env
CLIENT_URL=http://localhost:5173
```

### Frontend no se conecta al Backend
```bash
# Verificar frontend/.env
VITE_API_URL=http://localhost:5000/api

# Reiniciar Vite después de cambiar .env
```

---

## Contacto

- GitHub: https://github.com/SapoPerroDev/kangris
- Equipo: Juliana Chantre, Isabella Velasco, Brayan Alejandro Gutiérrez

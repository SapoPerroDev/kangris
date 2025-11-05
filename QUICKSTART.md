# 🚀 INICIO RÁPIDO - Retail Analytics

## ⚡ Comandos Rápidos

### **Instalación y Ejecución Local (Primera vez)**

```bash
# 1. Instalar dependencias
npm install
cd frontend && npm install && cd ..

# 2. Crear archivos .env
# Backend: copiar .env.example a .env y configurar
# Frontend: crear frontend/.env con VITE_API_URL=http://localhost:5000/api

# 3. Poblar base de datos
npm run seed

# 4. Ejecutar proyecto
npm run dev:all
```

**Abrir:** http://localhost:5173  
**Login:** admin@retail.com / admin123

---

### **Comandos Útiles**

```bash
# Backend solo
npm run server

# Frontend solo
cd frontend && npm run dev

# Poblar datos nuevamente
npm run seed

# Build para producción
cd frontend && npm run build
```

---

## 📱 Credenciales de Acceso

| Usuario | Email | Password | Rol |
|---------|-------|----------|-----|
| Admin | `admin@retail.com` | `admin123` | Administrador completo |
| Gerente | `gerente@retail.com` | `gerente123` | Gestión de sucursal |
| Vendedor | `vendedor@retail.com` | `vendedor123` | Acceso básico |

---

## 🌐 URLs del Proyecto

### Desarrollo Local:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Docs:** http://localhost:5000/api

### Producción (después del deploy):
- **App:** https://tu-sitio.netlify.app
- **API:** https://tu-backend.onrender.com

---

## 📂 Estructura Resumida

```
Empresa_retail/
├── backend/          # Node.js + Express API
│   ├── models/       # Modelos de MongoDB
│   ├── controllers/  # Lógica de negocio
│   ├── routes/       # Endpoints API
│   └── server.js     # Entry point
│
├── frontend/         # React + Vite
│   ├── src/
│   │   ├── pages/    # Dashboard, Products, Sales, Analytics
│   │   ├── components/
│   │   └── services/ # API calls
│   └── package.json
│
├── README.md         # Documentación completa
├── INSTALACION.md    # Guía de instalación detallada
└── DEPLOYMENT.md     # Guía de despliegue
```

---

## 🎯 Características Principales

✅ **Dashboard Interactivo** con 8+ gráficos  
✅ **Gestión de Productos** con filtros avanzados  
✅ **Registro de Ventas** con estadísticas  
✅ **Analytics Avanzado** con múltiples dimensiones  
✅ **Recomendaciones IA** automáticas  
✅ **Autenticación JWT** segura  
✅ **Diseño Responsive** moderno  
✅ **Datos de Demo** pre-cargados  

---

## 🔑 Endpoints API Principales

```
POST   /api/auth/login          # Login
GET    /api/auth/me             # Perfil usuario

GET    /api/products            # Listar productos
GET    /api/products/:id        # Ver producto
POST   /api/products            # Crear producto
PUT    /api/products/:id        # Actualizar producto

GET    /api/sales               # Listar ventas
POST   /api/sales               # Crear venta

GET    /api/analytics/dashboard        # KPIs principales
GET    /api/analytics/top-products     # Top productos
GET    /api/analytics/by-category      # Análisis por categoría
GET    /api/analytics/by-gender        # Análisis por género
GET    /api/analytics/recommendations  # Recomendaciones IA
```

---

## 🎨 Stack Tecnológico

**Frontend:**
- React 18 + Vite
- TailwindCSS
- Recharts
- React Router
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt
- Helmet + CORS

**Deploy:**
- Netlify (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## 🐛 Troubleshooting Rápido

### Error: "Cannot connect to MongoDB"
```bash
# Verificar MongoDB está corriendo
mongod

# O usar MongoDB Atlas (cloud)
```

### Error: "Port 5000 already in use"
```bash
# Cambiar puerto en .env
PORT=5001
```

### Error: "CORS policy"
```bash
# Verificar CLIENT_URL en backend .env
CLIENT_URL=http://localhost:5173
```

### Frontend no carga datos
```bash
# Verificar frontend/.env
VITE_API_URL=http://localhost:5000/api

# Reiniciar Vite después de cambiar .env
```

---

## 📚 Documentación Completa

- **README.md** - Documentación general y features
- **INSTALACION.md** - Guía paso a paso de instalación
- **DEPLOYMENT.md** - Guía de despliegue en Netlify/Render
- **LICENSE** - Licencia MIT

---

## 🚀 Próximos Pasos

1. **Desarrollo Local:**
   - [ ] Instalar dependencias
   - [ ] Configurar .env
   - [ ] Poblar base de datos
   - [ ] Ejecutar y probar

2. **Personalización:**
   - [ ] Cambiar colores en tailwind.config.js
   - [ ] Agregar logo de tu empresa
   - [ ] Personalizar textos

3. **Despliegue:**
   - [ ] Crear cuenta MongoDB Atlas
   - [ ] Deploy backend en Render
   - [ ] Deploy frontend en Netlify
   - [ ] Poblar base de datos producción

4. **Presentación:**
   - [ ] Preparar demo
   - [ ] Tomar screenshots
   - [ ] Grabar video (opcional)
   - [ ] Preparar slide deck

---

## 📞 Soporte

¿Necesitas ayuda?

- 📖 Lee INSTALACION.md para problemas de instalación
- 📖 Lee DEPLOYMENT.md para problemas de deploy
- 🐛 Revisa los logs en la consola
- 💬 Abre un issue en GitHub

---

## 🎓 Para el Hackathon

**Checklist de Presentación:**
- [ ] Proyecto funcionando en vivo (URL)
- [ ] Credenciales de demo preparadas
- [ ] Video/Screenshots de respaldo
- [ ] Explicación de arquitectura
- [ ] Demostración de features principales
- [ ] Código en GitHub público

**Tiempo de Demo Sugerido: 5 min**
1. Login y Dashboard (90 seg)
2. Productos y Filtros (60 seg)
3. Analytics y Gráficos (90 seg)
4. Recomendaciones IA (30 seg)
5. Stack tecnológico (60 seg)

---

## 🏆 ¡Buena Suerte!

Tu proyecto está completo y listo para impresionar al jurado con:
- ✨ Diseño profesional y moderno
- 📊 8+ visualizaciones diferentes
- 🤖 Algoritmo de recomendaciones
- 🔒 Seguridad implementada
- 📱 Responsive design
- 🚀 Deploy en producción
- 📚 Documentación completa

**¡A ganar ese hackathon!** 🚀🏆

---

Made with ❤️ by Team Retail Analytics


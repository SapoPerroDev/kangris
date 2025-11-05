# 🎨 Patrones de Diseño Implementados

## 📋 Resumen Ejecutivo

Este proyecto implementa **5 patrones de diseño principales** que garantizan código limpio, mantenible y escalable.

---

## 1️⃣ **MVC (Model-View-Controller)** ⭐ PRINCIPAL

### **¿Qué es?**
Patrón arquitectónico que separa la aplicación en tres componentes interconectados:
- **Model**: Datos y lógica de negocio
- **View**: Interfaz de usuario
- **Controller**: Intermediario entre Model y View

### **Implementación en el Proyecto:**

```
┌─────────────────────────────────────────┐
│           FRONTEND (View)               │
│                                         │
│  React Components:                      │
│  ├── Dashboard.jsx                      │
│  ├── Products.jsx                       │
│  ├── Sales.jsx                          │
│  └── Analytics.jsx                      │
│                                         │
│  ↓ HTTP Requests (Axios)                │
└─────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────┐
│       BACKEND (Controller)              │
│                                         │
│  Controllers:                           │
│  ├── authController.js                  │
│  ├── productController.js               │
│  ├── saleController.js                  │
│  └── analyticsController.js             │
│                                         │
│  ↓ Mongoose ODM                         │
└─────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────┐
│         DATABASE (Model)                │
│                                         │
│  Models:                                │
│  ├── User.js                            │
│  ├── Product.js                         │
│  └── Sale.js                            │
│                                         │
│  MongoDB Collections                    │
└─────────────────────────────────────────┘
```

### **Beneficios Obtenidos:**
✅ **Separación de responsabilidades** - Cada capa tiene un propósito claro  
✅ **Mantenibilidad** - Cambios en una capa no afectan otras  
✅ **Testabilidad** - Cada componente se puede probar independientemente  
✅ **Escalabilidad** - Fácil agregar nuevas funcionalidades  

### **Ejemplo de Código:**

**Model (backend/models/Product.js):**
```javascript
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
});
```

**Controller (backend/controllers/productController.js):**
```javascript
export const getProducts = async (req, res) => {
  const products = await Product.find(req.query);
  res.json({ success: true, products });
};
```

**View (frontend/src/pages/Products.jsx):**
```javascript
const Products = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    productsAPI.getAll().then(res => setProducts(res.data.products));
  }, []);
  
  return <ProductTable products={products} />;
};
```

---

## 2️⃣ **Repository Pattern**

### **¿Qué es?**
Abstrae el acceso a datos proporcionando una interfaz uniforme para operaciones CRUD.

### **Implementación:**

**Service Layer (frontend/src/services/api.js):**
```javascript
// Repository de Products
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Repository de Sales
export const salesAPI = {
  getAll: (params) => api.get('/sales', { params }),
  create: (data) => api.post('/sales', data),
  getById: (id) => api.get(`/sales/${id}`),
};

// Repository de Analytics
export const analyticsAPI = {
  getDashboard: (params) => api.get('/analytics/dashboard', { params }),
  getTopProducts: (params) => api.get('/analytics/top-products', { params }),
  // ... más métodos
};
```

### **Beneficios:**
✅ **Encapsulación** - Lógica de acceso a datos centralizada  
✅ **Reutilización** - Un servicio usado por múltiples componentes  
✅ **Testing** - Fácil mockear para tests  
✅ **Mantenibilidad** - Cambios en API en un solo lugar  

---

## 3️⃣ **Middleware Pattern**

### **¿Qué es?**
Funciones intermediarias que procesan requests antes de llegar al controlador.

### **Implementación:**

**Authentication Middleware (backend/middleware/auth.js):**
```javascript
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    
    next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
  };
};
```

**Error Handler Middleware (backend/middleware/errorHandler.js):**
```javascript
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Diferentes tipos de errores
  if (err.name === 'CastError') {
    error = { message: 'Recurso no encontrado', statusCode: 404 };
  }
  
  if (err.code === 11000) {
    error = { message: 'Registro duplicado', statusCode: 400 };
  }
  
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Error del servidor'
  });
};
```

**Uso en Routes:**
```javascript
router.get('/products', 
  isAuthenticated,                    // Middleware 1: Verificar auth
  authorizeRoles('admin', 'manager'), // Middleware 2: Verificar rol
  getProducts                         // Controller final
);
```

### **Beneficios:**
✅ **Modularidad** - Funcionalidad reutilizable  
✅ **Separación de concerns** - Auth separada de lógica de negocio  
✅ **Pipeline processing** - Flujo claro de request  
✅ **Error handling centralizado**  

---

## 4️⃣ **Context API Pattern (State Management)**

### **¿Qué es?**
Manejo de estado global sin prop drilling, ideal para autenticación.

### **Implementación:**

**Auth Context (frontend/src/context/AuthContext.jsx):**
```javascript
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    const response = await authAPI.login({ email, password });
    const { token, user: userData } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
```

**Uso en Componentes:**
```javascript
const Dashboard = () => {
  const { user, logout } = useAuth(); // ✅ Sin prop drilling
  
  return (
    <div>
      <h1>Bienvenido {user.name}</h1>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};
```

### **Beneficios:**
✅ **No prop drilling** - Estado accesible en cualquier nivel  
✅ **Centralización** - Estado de auth en un solo lugar  
✅ **Performance** - Solo re-renderiza componentes que usan el context  
✅ **Type safety** - Con custom hook garantizamos context existe  

---

## 5️⃣ **Component Composition Pattern**

### **¿Qué es?**
Componentes pequeños y reutilizables que se componen para formar interfaces complejas.

### **Implementación:**

**Componentes Atómicos:**
```javascript
// StatCard - Componente reutilizable
const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="stat-card">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`p-4 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);
```

**Composición en Dashboard:**
```javascript
const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <StatCard 
        title="Ventas Totales" 
        value={kpis.totalSales}
        icon={ShoppingBag}
        color="bg-gradient-to-br from-blue-500 to-blue-600"
      />
      <StatCard 
        title="Ingresos" 
        value={formatCurrency(kpis.totalRevenue)}
        icon={DollarSign}
        color="bg-gradient-to-br from-green-500 to-green-600"
      />
      <StatCard 
        title="Ganancia" 
        value={formatCurrency(kpis.totalProfit)}
        icon={TrendingUp}
        color="bg-gradient-to-br from-purple-500 to-purple-600"
      />
      <StatCard 
        title="Ticket Promedio" 
        value={formatCurrency(kpis.avgTicket)}
        icon={BarChart3}
        color="bg-gradient-to-br from-orange-500 to-orange-600"
      />
    </div>
  );
};
```

### **Beneficios:**
✅ **Reutilización** - Un componente usado en múltiples lugares  
✅ **Mantenibilidad** - Cambios en un lugar afectan todos los usos  
✅ **Consistencia** - UI uniforme en toda la app  
✅ **Testing** - Componentes pequeños fáciles de testear  

---

## 6️⃣ **HOC (Higher-Order Component) - Protected Routes**

### **¿Qué es?**
Componente que toma otro componente y retorna uno nuevo con funcionalidad adicional.

### **Implementación:**

**Protected Route (frontend/src/App.jsx):**
```javascript
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Uso:
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### **Beneficios:**
✅ **Reutilización de lógica** - Protección aplicada a múltiples rutas  
✅ **Separation of concerns** - Lógica de auth separada de componentes  
✅ **Composición** - Fácil agregar más HOCs (logging, analytics, etc)  

---

## 7️⃣ **Factory Pattern (en Mongoose Models)**

### **¿Qué es?**
Crea objetos sin especificar la clase exacta del objeto que se creará.

### **Implementación:**

**Schema Factory con Validators:**
```javascript
// backend/models/Product.js
const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['ABRIGO', 'BERMUDA', 'BUZOS', /* ... */],
    validate: {
      validator: function(v) {
        return isValidCategory(v, this.gender);
      },
      message: 'Categoría no válida para este género'
    }
  }
});

// Hooks (Factory methods)
productSchema.pre('save', function(next) {
  // Lógica antes de guardar
  this.updatedAt = Date.now();
  next();
});

productSchema.methods.checkStock = function() {
  return this.stock <= this.minStock;
};

productSchema.statics.findLowStock = function() {
  return this.find({ $expr: { $lte: ['$stock', '$minStock'] } });
};
```

### **Beneficios:**
✅ **Encapsulación** - Lógica de creación centralizada  
✅ **Validación** - Garantiza objetos válidos  
✅ **Métodos compartidos** - Reutilización de lógica  

---

## 8️⃣ **Strategy Pattern (en Analytics)**

### **¿Qué es?**
Define una familia de algoritmos, encapsula cada uno y los hace intercambiables.

### **Implementación:**

**Diferentes estrategias de recomendación:**
```javascript
// backend/controllers/analyticsController.js

// Estrategia 1: Detectar bajo stock
const detectLowStock = async () => {
  const products = await Product.find({
    $expr: { $lte: ['$stock', '$minStock'] },
    active: true
  }).limit(5);
  
  return {
    type: 'warning',
    priority: 'high',
    title: 'Productos con stock bajo',
    action: 'Aumentar stock',
    products
  };
};

// Estrategia 2: Detectar baja rotación
const detectLowRotation = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const salesLast30Days = await Sale.aggregate([
    { $match: { saleDate: { $gte: thirtyDaysAgo } } },
    { $unwind: '$items' },
    { $group: { _id: '$items.sku', total: { $sum: '$items.quantity' } } }
  ]);
  
  return {
    type: 'info',
    priority: 'medium',
    title: 'Productos con baja rotación',
    action: 'Aplicar descuentos',
    products: /* ... */
  };
};

// Estrategia 3: Detectar oportunidades
const detectOpportunities = async () => {
  // Lógica de productos estrella con poco stock
  return {
    type: 'success',
    priority: 'high',
    title: 'Productos estrella necesitan stock',
    action: 'Incrementar pedido',
    products: /* ... */
  };
};

// Controller que usa las estrategias
export const getRecommendations = async (req, res) => {
  const strategies = [
    detectLowStock,
    detectLowRotation,
    detectOpportunities
  ];
  
  const recommendations = await Promise.all(
    strategies.map(strategy => strategy())
  );
  
  res.json({ recommendations: recommendations.filter(r => r.products.length > 0) });
};
```

### **Beneficios:**
✅ **Flexibilidad** - Fácil agregar nuevas estrategias  
✅ **Open/Closed** - Abierto a extensión, cerrado a modificación  
✅ **Testabilidad** - Cada estrategia se prueba independientemente  

---

## 9️⃣ **Observer Pattern (React Hooks)**

### **¿Qué es?**
Define dependencia uno-a-muchos donde cuando un objeto cambia, todos sus dependientes son notificados.

### **Implementación:**

```javascript
const Dashboard = () => {
  const [dateRange, setDateRange] = useState(30);
  const [data, setData] = useState(null);

  // Observer: se ejecuta cuando dateRange cambia
  useEffect(() => {
    loadDashboardData();
  }, [dateRange]); // ← Observando dateRange

  const loadDashboardData = async () => {
    const startDate = format(subDays(new Date(), dateRange), 'yyyy-MM-dd');
    const response = await analyticsAPI.getDashboard({ startDate });
    setData(response.data);
  };

  return (
    <div>
      <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
        <option value={7}>7 días</option>
        <option value={30}>30 días</option>
        <option value={90}>90 días</option>
      </select>
      
      {/* Components que "observan" data */}
      <KPICards data={data} />
      <Charts data={data} />
    </div>
  );
};
```

### **Beneficios:**
✅ **Reactividad** - UI se actualiza automáticamente  
✅ **Desacoplamiento** - Componentes no dependen unos de otros  
✅ **Declarativo** - Código más legible  

---

## 🔟 **Singleton Pattern (Database Connection)**

### **¿Qué es?**
Garantiza que una clase tenga solo una instancia y proporciona acceso global a ella.

### **Implementación:**

```javascript
// backend/config/database.js
let connection = null;

const connectDatabase = async () => {
  if (connection) {
    console.log('✅ Using existing MongoDB connection');
    return connection;
  }

  try {
    connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
```

### **Beneficios:**
✅ **Eficiencia** - Una sola conexión reutilizada  
✅ **Resource management** - No múltiples conexiones  
✅ **Global access** - Disponible en toda la app  

---

## 📊 Resumen de Patrones Implementados

| Patrón | Ubicación | Propósito | Beneficio Principal |
|--------|-----------|-----------|---------------------|
| **MVC** | Todo el proyecto | Arquitectura general | Separación de responsabilidades |
| **Repository** | api.js | Acceso a datos | Encapsulación API |
| **Middleware** | auth.js, errorHandler.js | Pipeline de requests | Modularidad |
| **Context API** | AuthContext.jsx | Estado global | No prop drilling |
| **Component Composition** | Todos los componentes | UI reutilizable | Mantenibilidad |
| **HOC** | ProtectedRoute | Lógica compartida | Reutilización |
| **Factory** | Mongoose models | Creación de objetos | Validación |
| **Strategy** | analyticsController | Algoritmos intercambiables | Flexibilidad |
| **Observer** | useEffect hooks | Reactividad | UI automática |
| **Singleton** | database.js | Una instancia | Eficiencia recursos |

---

## 🎯 Conclusión

**¿Por qué estos patrones?**

1. **MVC**: Base arquitectónica sólida
2. **Repository**: Abstracción de datos limpia
3. **Middleware**: Pipeline extensible
4. **Context API**: State management simple
5. **Component Composition**: UI mantenible
6. **HOC**: Reutilización de lógica
7. **Factory**: Objetos validados
8. **Strategy**: Algoritmos flexibles
9. **Observer**: Reactividad React
10. **Singleton**: Recursos eficientes

**Resultado:**
✅ Código limpio y mantenible  
✅ Fácil de testear  
✅ Escalable  
✅ Siguiendo mejores prácticas  
✅ Profesional y robusto  

---

**Preparado por:** Team Retail Analytics  
**Equipo:** Isabela, Alejandro, Juliana  
**Metodología:** Scrum  


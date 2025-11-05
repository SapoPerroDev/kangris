import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Sale from '../models/Sale.js';
import User from '../models/User.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/retail_inventory');
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

// Datos de productos realistas
const productsData = [
  // MUJER - Diferentes categorías
  { name: 'Abrigo Elegante Negro', sku: 'MUJ-ABR-001', category: 'ABRIGO', gender: 'Mujer', size: 'M', price: 189900, cost: 95000, stock: 25, color: 'Negro', season: 'Invierno' },
  { name: 'Abrigo Elegante Negro', sku: 'MUJ-ABR-002', category: 'ABRIGO', gender: 'Mujer', size: 'L', price: 189900, cost: 95000, stock: 18, color: 'Negro', season: 'Invierno' },
  { name: 'Bermuda Casual Beige', sku: 'MUJ-BER-001', category: 'BERMUDA', gender: 'Mujer', size: 'S', price: 69900, cost: 35000, stock: 42, color: 'Beige', season: 'Verano' },
  { name: 'Buzo Deportivo Rosa', sku: 'MUJ-BUZ-001', category: 'BUZOS', gender: 'Mujer', size: 'M', price: 89900, cost: 45000, stock: 35, color: 'Rosa', season: 'Todo el año' },
  { name: 'Camisa Blanca Formal', sku: 'MUJ-CAM-001', category: 'CAMISAS', gender: 'Mujer', size: 'M', price: 79900, cost: 40000, stock: 48, color: 'Blanco', season: 'Todo el año' },
  { name: 'Camisa Blanca Formal', sku: 'MUJ-CAM-002', category: 'CAMISAS', gender: 'Mujer', size: 'S', price: 79900, cost: 40000, stock: 52, color: 'Blanco', season: 'Todo el año' },
  { name: 'Falda Plisada Azul', sku: 'MUJ-FAL-001', category: 'FALDA', gender: 'Mujer', size: 'M', price: 64900, cost: 32000, stock: 30, color: 'Azul', season: 'Primavera' },
  { name: 'Jeans Skinny Azul', sku: 'MUJ-JEA-001', category: 'JEANS TERMINADOS', gender: 'Mujer', size: 'M', price: 129900, cost: 65000, stock: 45, color: 'Azul', season: 'Todo el año' },
  { name: 'Jeans Skinny Azul', sku: 'MUJ-JEA-002', category: 'JEANS TERMINADOS', gender: 'Mujer', size: 'S', price: 129900, cost: 65000, stock: 38, color: 'Azul', season: 'Todo el año' },
  { name: 'Pantalón Formal Negro', sku: 'MUJ-PAN-001', category: 'PANTALONES', gender: 'Mujer', size: 'M', price: 99900, cost: 50000, stock: 40, color: 'Negro', season: 'Todo el año' },
  { name: 'Pijama Conjunto Floral', sku: 'MUJ-PIJ-001', category: 'PIJAMAS', gender: 'Mujer', size: 'M', price: 74900, cost: 37000, stock: 28, color: 'Multicolor', season: 'Todo el año' },
  { name: 'Ropa Interior Pack 3', sku: 'MUJ-RIN-001', category: 'ROPA INTERIOR', gender: 'Mujer', size: 'M', price: 54900, cost: 27000, stock: 65, color: 'Variado', season: 'Todo el año' },
  { name: 'Cárdigan Gris', sku: 'MUJ-TER-001', category: 'TERCERAS PIEZAS', gender: 'Mujer', size: 'M', price: 84900, cost: 42000, stock: 32, color: 'Gris', season: 'Otoño' },
  { name: 'T-Shirt Básica Blanca', sku: 'MUJ-TSH-001', category: 'TSHIRT', gender: 'Mujer', size: 'M', price: 39900, cost: 20000, stock: 75, color: 'Blanco', season: 'Todo el año' },
  { name: 'T-Shirt Básica Negra', sku: 'MUJ-TSH-002', category: 'TSHIRT', gender: 'Mujer', size: 'S', price: 39900, cost: 20000, stock: 82, color: 'Negro', season: 'Todo el año' },
  { name: 'Vestido Casual Flores', sku: 'MUJ-VES-001', category: 'VESTIDOS', gender: 'Mujer', size: 'M', price: 119900, cost: 60000, stock: 22, color: 'Floral', season: 'Primavera' },
  { name: 'Vestido Elegante Negro', sku: 'MUJ-VES-002', category: 'VESTIDOS', gender: 'Mujer', size: 'S', price: 149900, cost: 75000, stock: 18, color: 'Negro', season: 'Todo el año' },

  // HOMBRE - Diferentes categorías
  { name: 'Abrigo Lana Gris', sku: 'HOM-ABR-001', category: 'ABRIGO', gender: 'Hombre', size: 'L', price: 199900, cost: 100000, stock: 20, color: 'Gris', season: 'Invierno' },
  { name: 'Bermuda Cargo Verde', sku: 'HOM-BER-001', category: 'BERMUDA', gender: 'Hombre', size: 'M', price: 74900, cost: 37000, stock: 38, color: 'Verde', season: 'Verano' },
  { name: 'Buzo Deportivo Negro', sku: 'HOM-BUZ-001', category: 'BUZO', gender: 'Hombre', size: 'L', price: 94900, cost: 47000, stock: 42, color: 'Negro', season: 'Todo el año' },
  { name: 'Buzo Deportivo Negro', sku: 'HOM-BUZ-002', category: 'BUZO', gender: 'Hombre', size: 'M', price: 94900, cost: 47000, stock: 45, color: 'Negro', season: 'Todo el año' },
  { name: 'Camisa Manga Larga Azul', sku: 'HOM-CAM-001', category: 'CAMISAS', gender: 'Hombre', size: 'L', price: 84900, cost: 42000, stock: 50, color: 'Azul', season: 'Todo el año' },
  { name: 'Camisa Manga Larga Azul', sku: 'HOM-CAM-002', category: 'CAMISAS', gender: 'Hombre', size: 'M', price: 84900, cost: 42000, stock: 55, color: 'Azul', season: 'Todo el año' },
  { name: 'Jeans Regular Fit', sku: 'HOM-JEA-001', category: 'JEANS TERMINADOS', gender: 'Hombre', size: 'L', price: 134900, cost: 67000, stock: 48, color: 'Azul', season: 'Todo el año' },
  { name: 'Jeans Regular Fit', sku: 'HOM-JEA-002', category: 'JEANS TERMINADOS', gender: 'Hombre', size: 'M', price: 134900, cost: 67000, stock: 52, color: 'Azul', season: 'Todo el año' },
  { name: 'Pantalón Chino Beige', sku: 'HOM-PAN-001', category: 'PANTALONES', gender: 'Hombre', size: 'L', price: 104900, cost: 52000, stock: 35, color: 'Beige', season: 'Todo el año' },
  { name: 'Polo Clásico Blanco', sku: 'HOM-POL-001', category: 'POLOS', gender: 'Hombre', size: 'L', price: 49900, cost: 25000, stock: 68, color: 'Blanco', season: 'Todo el año' },
  { name: 'Polo Clásico Negro', sku: 'HOM-POL-002', category: 'POLOS', gender: 'Hombre', size: 'M', price: 49900, cost: 25000, stock: 72, color: 'Negro', season: 'Todo el año' },
  { name: 'Pantaloneta Playa', sku: 'HOM-RBA-001', category: 'ROPA DE BAÑO', gender: 'Hombre', size: 'M', price: 59900, cost: 30000, stock: 45, color: 'Azul', season: 'Verano' },
  { name: 'Ropa Interior Pack 3', sku: 'HOM-RIN-001', category: 'ROPA INTERIOR', gender: 'Hombre', size: 'M', price: 49900, cost: 25000, stock: 88, color: 'Variado', season: 'Todo el año' },
  { name: 'T-Shirt Básica Gris', sku: 'HOM-TSH-001', category: 'TSHIRT TERMINADA', gender: 'Hombre', size: 'L', price: 44900, cost: 22000, stock: 95, color: 'Gris', season: 'Todo el año' },
  { name: 'T-Shirt Básica Negra', sku: 'HOM-TSH-002', category: 'TSHIRT TERMINADA', gender: 'Hombre', size: 'M', price: 44900, cost: 22000, stock: 102, color: 'Negro', season: 'Todo el año' },

  // NIÑO - Diferentes categorías
  { name: 'Bermuda Denim Niño', sku: 'NIN-BER-001', category: 'BERMUDA', gender: 'Niño', size: '10', price: 49900, cost: 25000, stock: 35, color: 'Azul', season: 'Verano' },
  { name: 'Bermuda Denim Niño', sku: 'NIN-BER-002', category: 'BERMUDA', gender: 'Niño', size: '12', price: 49900, cost: 25000, stock: 32, color: 'Azul', season: 'Verano' },
  { name: 'Buzo Capucha Niño', sku: 'NIN-BUZ-001', category: 'BUZO', gender: 'Niño', size: '10', price: 64900, cost: 32000, stock: 40, color: 'Azul', season: 'Invierno' },
  { name: 'Camisa Cuadros Niño', sku: 'NIN-CAM-001', category: 'CAMISAS', gender: 'Niño', size: '10', price: 54900, cost: 27000, stock: 28, color: 'Cuadros', season: 'Todo el año' },
  { name: 'Jeans Niño Classic', sku: 'NIN-JEA-001', category: 'JEANS TERMINADOS', gender: 'Niño', size: '10', price: 79900, cost: 40000, stock: 38, color: 'Azul', season: 'Todo el año' },
  { name: 'Jeans Niño Classic', sku: 'NIN-JEA-002', category: 'JEANS TERMINADOS', gender: 'Niño', size: '12', price: 79900, cost: 40000, stock: 35, color: 'Azul', season: 'Todo el año' },
  { name: 'Pantalón Deportivo Niño', sku: 'NIN-PAN-001', category: 'PANTALONES', gender: 'Niño', size: '10', price: 59900, cost: 30000, stock: 42, color: 'Negro', season: 'Todo el año' },
  { name: 'Polo Estampado Niño', sku: 'NIN-POL-001', category: 'POLOS', gender: 'Niño', size: '10', price: 34900, cost: 17000, stock: 55, color: 'Azul', season: 'Todo el año' },
  { name: 'Pantaloneta Baño Niño', sku: 'NIN-RBA-001', category: 'ROPA DE BAÑO', gender: 'Niño', size: '10', price: 39900, cost: 20000, stock: 45, color: 'Rojo', season: 'Verano' },
  { name: 'T-Shirt Niño Dinosaurio', sku: 'NIN-TSH-001', category: 'TSHIRT TERMINADA', gender: 'Niño', size: '10', price: 29900, cost: 15000, stock: 68, color: 'Verde', season: 'Todo el año' },
  { name: 'T-Shirt Niño Superhéroe', sku: 'NIN-TSH-002', category: 'TSHIRT TERMINADA', gender: 'Niño', size: '8', price: 29900, cost: 15000, stock: 72, color: 'Azul', season: 'Todo el año' },

  // NIÑA - Diferentes categorías
  { name: 'Abrigo Niña Rosa', sku: 'NIA-ABR-001', category: 'ABRIGO', gender: 'Niña', size: '10', price: 89900, cost: 45000, stock: 25, color: 'Rosa', season: 'Invierno' },
  { name: 'Bermuda Niña Denim', sku: 'NIA-BER-001', category: 'BERMUDA', gender: 'Niña', size: '10', price: 44900, cost: 22000, stock: 38, color: 'Azul', season: 'Verano' },
  { name: 'Buzo Niña Unicornio', sku: 'NIA-BUZ-001', category: 'BUZO', gender: 'Niña', size: '10', price: 69900, cost: 35000, stock: 32, color: 'Rosa', season: 'Invierno' },
  { name: 'Camisa Niña Flores', sku: 'NIA-CAM-001', category: 'CAMISAS', gender: 'Niña', size: '10', price: 49900, cost: 25000, stock: 30, color: 'Floral', season: 'Primavera' },
  { name: 'Falda Plisada Niña', sku: 'NIA-FAL-001', category: 'FALDA', gender: 'Niña', size: '10', price: 44900, cost: 22000, stock: 35, color: 'Azul', season: 'Todo el año' },
  { name: 'Jeans Niña Skinny', sku: 'NIA-JEA-001', category: 'JEANS TERMINADOS', gender: 'Niña', size: '10', price: 74900, cost: 37000, stock: 40, color: 'Azul', season: 'Todo el año' },
  { name: 'Jeans Niña Skinny', sku: 'NIA-JEA-002', category: 'JEANS TERMINADOS', gender: 'Niña', size: '12', price: 74900, cost: 37000, stock: 38, color: 'Azul', season: 'Todo el año' },
  { name: 'Pantalón Niña Rosa', sku: 'NIA-PAN-001', category: 'PANTALONES', gender: 'Niña', size: '10', price: 54900, cost: 27000, stock: 35, color: 'Rosa', season: 'Todo el año' },
  { name: 'Cárdigan Niña Lila', sku: 'NIA-TER-001', category: 'TERCERAS PIEZAS', gender: 'Niña', size: '10', price: 59900, cost: 30000, stock: 28, color: 'Lila', season: 'Otoño' },
  { name: 'T-Shirt Niña Mariposa', sku: 'NIA-TSH-001', category: 'TSHIRT TERMINADA', gender: 'Niña', size: '10', price: 29900, cost: 15000, stock: 65, color: 'Rosa', season: 'Todo el año' },
  { name: 'T-Shirt Niña Gato', sku: 'NIA-TSH-002', category: 'TSHIRT TERMINADA', gender: 'Niña', size: '8', price: 29900, cost: 15000, stock: 70, color: 'Blanco', season: 'Todo el año' },
  { name: 'Vestido Niña Princesa', sku: 'NIA-VES-001', category: 'VESTIDOS', gender: 'Niña', size: '10', price: 79900, cost: 40000, stock: 25, color: 'Rosa', season: 'Primavera' },
  { name: 'Vestido Niña Casual', sku: 'NIA-VES-002', category: 'VESTIDOS', gender: 'Niña', size: '12', price: 69900, cost: 35000, stock: 28, color: 'Azul', season: 'Verano' },
];

const branches = ['Bogotá Centro', 'Medellín Norte', 'Cali Sur', 'Barranquilla', 'Cartagena', 'Bucaramanga'];
const paymentMethods = ['Efectivo', 'Tarjeta', 'Transferencia', 'Mixto'];

// Generar ventas realistas de los últimos 90 días
const generateSales = async (products) => {
  const sales = [];
  const today = new Date();
  
  // Generar entre 200-300 ventas
  for (let i = 0; i < 250; i++) {
    // Fecha aleatoria en los últimos 90 días
    const daysAgo = Math.floor(Math.random() * 90);
    const saleDate = new Date(today);
    saleDate.setDate(saleDate.getDate() - daysAgo);
    
    // Seleccionar sucursal aleatoria
    const branch = branches[Math.floor(Math.random() * branches.length)];
    
    // Seleccionar 1-4 productos aleatorios
    const itemCount = Math.floor(Math.random() * 4) + 1;
    const selectedProducts = [];
    
    for (let j = 0; j < itemCount; j++) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 unidades
      
      selectedProducts.push({
        product: randomProduct._id,
        sku: randomProduct.sku,
        name: randomProduct.name,
        category: randomProduct.category,
        gender: randomProduct.gender,
        size: randomProduct.size,
        quantity,
        unitPrice: randomProduct.price,
        unitCost: randomProduct.cost,
        subtotal: randomProduct.price * quantity,
        profit: (randomProduct.price - randomProduct.cost) * quantity
      });
    }
    
    const totalAmount = selectedProducts.reduce((sum, item) => sum + item.subtotal, 0);
    const totalCost = selectedProducts.reduce((sum, item) => sum + (item.unitCost * item.quantity), 0);
    const totalProfit = totalAmount - totalCost;
    
    sales.push({
      saleNumber: `VT-${String(i + 1).padStart(4, '0')}`,
      branch,
      items: selectedProducts,
      totalAmount,
      totalCost,
      totalProfit,
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      status: 'Completada',
      saleDate
    });
  }
  
  return sales;
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando seed de la base de datos...\n');
    
    // Limpiar base de datos
    console.log('🗑️  Limpiando base de datos...');
    await Product.deleteMany({});
    await Sale.deleteMany({});
    await User.deleteMany({});
    
    // Crear usuarios
    console.log('👥 Creando usuarios...');
    const users = await User.create([
      {
        name: 'Administrador',
        email: 'admin@retail.com',
        password: 'admin123',
        role: 'admin',
        branch: 'Todas'
      },
      {
        name: 'Gerente Bogotá',
        email: 'gerente@retail.com',
        password: 'gerente123',
        role: 'manager',
        branch: 'Bogotá Centro'
      },
      {
        name: 'Vendedor Medellín',
        email: 'vendedor@retail.com',
        password: 'vendedor123',
        role: 'vendedor',
        branch: 'Medellín Norte'
      }
    ]);
    console.log(`✅ ${users.length} usuarios creados`);
    
    // Crear productos
    console.log('📦 Creando productos...');
    const products = await Product.insertMany(productsData);
    console.log(`✅ ${products.length} productos creados`);
    
    // Generar ventas
    console.log('💰 Generando ventas...');
    const sales = await generateSales(products);
    await Sale.insertMany(sales);
    console.log(`✅ ${sales.length} ventas generadas`);
    
    console.log('\n✨ ¡Base de datos poblada exitosamente!\n');
    console.log('📝 Credenciales de acceso:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 Admin:    admin@retail.com / admin123');
    console.log('👤 Gerente:  gerente@retail.com / gerente123');
    console.log('👤 Vendedor: vendedor@retail.com / vendedor123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en el seed:', error);
    process.exit(1);
  }
};

connectDB().then(() => seedDatabase());


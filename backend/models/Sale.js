import mongoose from 'mongoose';

const saleItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'La cantidad debe ser al menos 1']
  },
  unitPrice: {
    type: Number,
    required: true,
    min: [0, 'El precio no puede ser negativo']
  },
  unitCost: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  profit: {
    type: Number,
    required: true
  }
});

const saleSchema = new mongoose.Schema({
  saleNumber: {
    type: String,
    required: true,
    unique: true
  },
  branch: {
    type: String,
    required: [true, 'Sucursal es requerida'],
    enum: ['Bogotá Centro', 'Medellín Norte', 'Cali Sur', 'Barranquilla', 'Cartagena', 'Bucaramanga']
  },
  items: [saleItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'El monto total no puede ser negativo']
  },
  totalCost: {
    type: Number,
    required: true
  },
  totalProfit: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['Efectivo', 'Tarjeta', 'Transferencia', 'Mixto'],
    default: 'Tarjeta'
  },
  status: {
    type: String,
    enum: ['Completada', 'Cancelada', 'Pendiente', 'Reembolsada'],
    default: 'Completada'
  },
  saleDate: {
    type: Date,
    default: Date.now
  },
  customer: {
    name: String,
    email: String,
    phone: String
  },
  notes: String
}, {
  timestamps: true
});

// Índices para análisis rápido
saleSchema.index({ saleDate: -1 });
saleSchema.index({ branch: 1, saleDate: -1 });
saleSchema.index({ 'items.category': 1 });
saleSchema.index({ status: 1 });

export default mongoose.model('Sale', saleSchema);


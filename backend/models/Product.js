import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingrese el nombre del producto'],
    trim: true,
    maxLength: [200, 'El nombre no puede exceder 200 caracteres']
  },
  sku: {
    type: String,
    required: [true, 'SKU es requerido'],
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Categoría es requerida'],
    enum: [
      'ABRIGO', 'BERMUDA', 'BUZOS', 'BUZO', 'CAMISAS', 'FALDA', 
      'HOGAR', 'JEANS TERMINADOS', 'PANTALONES', 'PIJAMAS', 
      'ROPA INTERIOR', 'TERCERAS PIEZAS', 'TSHIRT', 'TERMINADAS', 
      'VESTIDOS', 'POLOS', 'ROPA DE BAÑO', 'TSHIRT TERMINADA'
    ]
  },
  gender: {
    type: String,
    required: [true, 'Género es requerido'],
    enum: ['Mujer', 'Hombre', 'Niño', 'Niña', 'Unisex']
  },
  size: {
    type: String,
    required: [true, 'Talla es requerida'],
    enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', '4', '6', '8', '10', '12', '14', '16']
  },
  price: {
    type: Number,
    required: [true, 'Precio es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  cost: {
    type: Number,
    required: [true, 'Costo es requerido'],
    min: [0, 'El costo no puede ser negativo']
  },
  stock: {
    type: Number,
    required: [true, 'Stock es requerido'],
    default: 0,
    min: [0, 'El stock no puede ser negativo']
  },
  minStock: {
    type: Number,
    default: 10,
    min: [0, 'El stock mínimo no puede ser negativo']
  },
  color: {
    type: String,
    default: 'Variado'
  },
  brand: {
    type: String,
    default: 'Retail Brand'
  },
  season: {
    type: String,
    enum: ['Primavera', 'Verano', 'Otoño', 'Invierno', 'Todo el año'],
    default: 'Todo el año'
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices para búsquedas rápidas
productSchema.index({ category: 1, gender: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ stock: 1 });

export default mongoose.model('Product', productSchema);


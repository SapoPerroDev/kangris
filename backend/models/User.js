import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingrese el nombre'],
    trim: true,
    maxLength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Por favor ingrese el email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingrese un email válido']
  },
  password: {
    type: String,
    required: [true, 'Por favor ingrese la contraseña'],
    minLength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'vendedor'],
    default: 'vendedor'
  },
  branch: {
    type: String,
    enum: ['Bogotá Centro', 'Medellín Norte', 'Cali Sur', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Todas'],
    default: 'Todas'
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Encriptar contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Comparar contraseñas
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generar JWT
userSchema.methods.getJwtToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET || 'secret_jwt_key',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export default mongoose.model('User', userSchema);


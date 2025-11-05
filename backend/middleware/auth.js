import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Verificar si el usuario está autenticado
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Por favor inicie sesión para acceder a este recurso'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_jwt_key');
    req.user = await User.findById(decoded.id);

    if (!req.user || !req.user.active) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado o inactivo'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};

// Verificar roles autorizados
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Rol ${req.user.role} no tiene permiso para acceder a este recurso`
      });
    }
    next();
  };
};


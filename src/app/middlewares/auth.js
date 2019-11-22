import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // Biblioteca para tranformar função callback em função async await

import authConfig from '../../config/auth';

// Autenticando Token de acesso do Usuario

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  // Salvando Token criptografado
  const [, token] = authHeader.split(' ');

  try {
    // Descriptografando Token
    // Recuperando dados salvos
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // Salvando userId nos requirimetos(req) da aplicação
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};

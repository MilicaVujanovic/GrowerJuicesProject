
// Ako ti treba model, možeš importovati UserModel
// import { UserModel } from '../models/user.model.js';
import jwt from 'jsonwebtoken'; // importuj ceo modul

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  // if (!token) {
  //   return res.status(401).send({ message: 'Invalid token' });
  // }

  try {
    // verify vraća običan JS objekat, nema TypeScript tipova
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');
    req.user = decodedUser; // dodajemo usera u req objekat
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).send({ message: 'Unauthorized' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).send({ message: 'Access denied' });
  }
};

export { isAdmin };
export default authMiddleware;

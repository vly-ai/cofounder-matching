import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

export const verifyUser = (req: NextApiRequest, res: NextApiResponse): string | null => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: 'No authorization header' });
    return null;
  }

  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    return decoded.email;
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
    return null;
  }
};

export default verifyUser;

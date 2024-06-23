import type { NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from '../../../models/User';
import dbConnect from '../../../lib/mongoose';
import { comparePassword, generateToken } from '../../../lib/authUtils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(400).json({ error: 'Invalid email or password' });
        return;
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        res.status(400).json({ error: 'Invalid email or password' });
        return;
      }
      const token = generateToken(user.email);
      res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;

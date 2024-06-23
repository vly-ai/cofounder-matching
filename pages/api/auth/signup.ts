import type { NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from '../../../models/User';
import dbConnect from '../../../lib/mongoose';
import { hashPassword } from '../../../lib/authUtils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  if (req.method === 'POST') {
    try {
      const { email, password, name, bio, businessIdea, skills, location, privacy, notificationsSettings } = req.body;
      const hashedPassword = await hashPassword(password);
      const newUser = await UserModel.create({
        email,
        password: hashedPassword,
        name,
        bio,
        businessIdea,
        skills,
        location,
        privacy,
        notificationsSettings,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;

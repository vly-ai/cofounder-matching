import type { NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from '../../../models/User';
import dbConnect from '../../../lib/mongoose';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  switch (req.method) {
    case 'GET':
      try {
        const users = await UserModel.find({});
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method Not Allowed' });
      break;
  }
};

export default handler;

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import verifySession from '../../../lib/verifySession';
import deleteUserAccount from '../../../lib/deleteUserAccount';
import { signOutUser } from '../../../lib/authUtils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  if (req.method === 'POST') {
    const email = verifySession(req, res);
    if (!email) return;

    try {
      const user = await UserModel.findOne({ email }).select('_id');
      if (!user) {
        throw new Error('User not found');
      }
      await deleteUserAccount(user._id);
      await signOutUser();
      res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;

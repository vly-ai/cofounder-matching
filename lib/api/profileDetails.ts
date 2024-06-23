import dbConnect from '../mongoose';
import { ProfileModel } from '../../models/Profile';
import { verifySession } from '../verifySession';
import { NextApiRequest, NextApiResponse } from 'next';
import { Types } from 'mongoose';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const { profile_id } = req.query;

  if (req.method === 'GET') {
    const email = verifySession(req, res);
    if (!email) return;

    if (!Types.ObjectId.isValid(profile_id as string)) {
      res.status(400).json({ error: 'Invalid profile ID' });
      return;
    }

    try {
      const profile = await ProfileModel.findById(profile_id).populate('user', 'name email');
      if (!profile) {
        res.status(404).json({ error: 'Profile not found' });
        return;
      }
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
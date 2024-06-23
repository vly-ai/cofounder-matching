import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import { MatchInteractionModel } from '../../../models/MatchInteraction';
import verifySession from '../../../lib/verifySession';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    const email = verifySession(req, res);
    if (!email) return;

    const { passedProfileId } = req.body;

    try {
      const user = await UserModel.findOne({ email }).select('_id');
      if (!user) {
        res.status(400).json({ error: 'User not found' });
        return;
      }

      await MatchInteractionModel.create({
        userA: user._id,
        userB: passedProfileId,
        interactionType: 'pass'
      });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;

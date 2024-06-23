import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import { MatchInteractionModel } from '../../../models/MatchInteraction';
import verifySession from '../../../lib/verifySession';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    const email = verifySession(req, res);
    if (!email) return;

    const { likedProfileId } = req.body;

    try {
      const user = await UserModel.findOne({ email }).select('_id');
      if (!user) {
        res.status(400).json({ error: 'User not found' });
        return;
      }

      const newInteraction = await MatchInteractionModel.create({
        userA: user._id,
        userB: likedProfileId,
        interactionType: 'like'
      });

      // Check if there's a mutual like
      const mutualLike = await MatchInteractionModel.findOne({
        userA: likedProfileId,
        userB: user._id,
        interactionType: 'like'
      });

      if (mutualLike) {
        newInteraction.mutualLike = true;
        mutualLike.mutualLike = true;
        await newInteraction.save();
        await mutualLike.save();
      }

      res.status(200).json({ success: true, mutualLike: !!mutualLike });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import sendNotification from '../../../lib/messaging/sendNotification';
import verifySession from '../../../lib/verifySession';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    const email = verifySession(req, res);
    if (!email) return;

    const { recipientId, message, type } = req.body;

    try {
      const notification = await sendNotification(recipientId, message, type);
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import getConversation from '../../../lib/messaging/getConversation';
import verifySession from '../../../lib/verifySession';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'GET') {
    const email = verifySession(req, res);
    if (!email) return;

    try {
      const conversations = await getConversation(email);
      res.status(200).json(conversations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/mongoose';
import getChatHistory from '../../../../lib/messaging/getChatHistory';
import verifySession from '../../../../lib/verifySession';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const { conversation_id } = req.query;
  if (req.method === 'GET') {
    const email = verifySession(req, res);
    if (!email) return;

    try {
      const chatHistory = await getChatHistory(conversation_id as string);
      res.status(200).json(chatHistory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;

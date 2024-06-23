import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import verifySession from '../../../lib/verifySession';
import getRecentActivities from '../../../lib/getRecentActivities';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'GET') {
    const email = verifySession(req, res);
    if (!email) return;

    try {
      const recentActivities = await getRecentActivities(email);
      res.status(200).json(recentActivities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
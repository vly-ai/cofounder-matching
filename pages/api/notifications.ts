import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongoose';
import { NotificationModel } from '../../models/Notification';
import verifySession from '../../lib/verifySession';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();

    if (req.method === 'GET') {
        const email = verifySession(req, res);
        if (!email) return;

        try {
            const notifications = await NotificationModel.find({ recipient: email }).sort({ createdAt: -1 }).limit(10);
            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};

export default handler;
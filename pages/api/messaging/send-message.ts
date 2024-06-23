import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import { MessageModel } from '../../../models/Message';
import verifySession from '../../../lib/verifySession';
import sendNotification from '../../../lib/messaging/sendNotification';
import validateMessageInput from '../../../lib/messaging/validateMessageInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    const email = verifySession(req, res);
    if (!email) return;

    const { recipient, content, conversationId } = req.body;
    const sender = email;

    const validation = validateMessageInput({ sender, recipient, content, conversationId });
    if (!validation.valid) {
      res.status(400).json({ error: validation.message });
      return;
    }

    try {
      const newMessage = await MessageModel.create({
        sender,
        recipient,
        content,
        sentAt: new Date(),
        conversation: conversationId,
      });

      await sendNotification(recipient, 'New message received', 'message');

      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;

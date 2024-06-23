import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../mongoose';
import { MessageModel } from '../../models/Message';
import { ConversationModel } from '../../models/Conversation';
import verifySession from '../verifySession';
import sendNotification from '../messaging/sendNotification';
import { validateMessageInput } from '../messaging/validateMessageInput';

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
      const conversation = await ConversationModel.findById(conversationId);
      if (!conversation) {
        res.status(404).json({ error: 'Conversation not found' });
        return;
      }

      const newMessage = await MessageModel.create({
        sender,
        recipient,
        content,
        sentAt: new Date(),
        conversation: conversationId,
      });

      conversation.messages.push(newMessage._id);
      await conversation.save();

      await sendNotification(recipient, 'You have a new message', 'message');

      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
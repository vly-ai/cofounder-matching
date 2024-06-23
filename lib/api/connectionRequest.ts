import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../mongoose';
import { UserModel } from '../../models/User';
import { verifySession } from '../verifySession';
import sendNotification from '../messaging/sendNotification';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from '../../models/User';

class ConnectionRequest {
  @prop({ ref: () => User })
  sender!: Ref<User>;

  @prop({ ref: () => User })
  recipient!: Ref<User>;

  @prop({ default: Date.now })
  createdAt!: Date;
}

const ConnectionRequestModel = getModelForClass(ConnectionRequest);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    const email = verifySession(req, res);
    if (!email) return;

    const { recipientProfileId } = req.body;

    try {
      const senderUser = await UserModel.findOne({ email }).select('_id');
      if (!senderUser) {
        res.status(400).json({ error: 'User not found' });
        return;
      }

      const newConnectionRequest = await ConnectionRequestModel.create({
        sender: senderUser._id,
        recipient: recipientProfileId
      });

      await sendNotification(recipientProfileId, 'Connection request received', 'match');

      res.status(201).json(newConnectionRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
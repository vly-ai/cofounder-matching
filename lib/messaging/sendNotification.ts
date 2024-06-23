import { NotificationModel } from '../models/Notification';
import { UserModel } from '../models/User';

const sendNotification = async (recipientId: string, message: string, type: 'match' | 'message' | 'like') => {
  try {
    const recipient = await UserModel.findById(recipientId);
    if (!recipient) {
      throw new Error('Recipient not found');
    }

    const newNotification = await NotificationModel.create({
      recipient: recipientId,
      message,
      type,
      read: false
    });

    return newNotification;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default sendNotification;

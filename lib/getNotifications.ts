import { NotificationModel } from '../models/Notification';

const getNotifications = async (userId: string) => {
  try {
    const notifications = await NotificationModel.find({ recipient: userId }).sort({ createdAt: -1 }).limit(10);
    return notifications;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getNotifications;
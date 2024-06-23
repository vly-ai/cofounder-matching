import { ActivityModel } from '../models/Activity';

const getRecentActivities = async (userId: string) => {
  try {
    const activities = await ActivityModel.find({ user: userId }).sort({ createdAt: -1 }).limit(10);
    return activities;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getRecentActivities;
import { UserModel } from '../models/User';
import { ProfileModel } from '../models/Profile';

const getUserProfileSummary = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email }).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    const profile = await ProfileModel.findOne({ user: user._id });
    return { user, profile };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getUserProfileSummary;